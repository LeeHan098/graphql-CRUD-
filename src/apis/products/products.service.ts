import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocation } from '../productsSaleslocation/entites/productsSaleslocation.entity';
import { ProductTag } from '../productTags/entites/productTags.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const location = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
    //productTags : [전자제품, 영등포, 컴퓨터]
    const tags = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagName = productTags[i].replace('#', '');
      //이미 등록된 태그인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagName },
      });
      if (prevTag) {
        tags.push(prevTag);
      } else {
        const newTag = await this.productTagRepository.save({ name: tagName });
        tags.push(newTag);
      }
    }
    // for문에 await은 비효율적 -> Promise.all을 이용해야 한다.

    const result = await this.productRepository.save({
      ...product,
      productSaleslocation: location, // result 통쨰로 넣기
      productCategory: { id: productCategoryId }, // id만 넣기
      productTags: tags,
    });
    return result;
  }
  async update({ productId, updateProductInput }) {
    return await this.productRepository.save({
      id: productId,
      ...updateProductInput,
    });
  }
  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매완료된 상품입니다');
    }
  }
  async delete({ productId }) {
    // 1. 실제로 삭제 -> 실제 서비스에서는 바로 삭제는 하지 않음
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. soft delete, soft remove -> remove는 id로만 삭제 가능, delete는 다른 조건으로 삭제가능
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
