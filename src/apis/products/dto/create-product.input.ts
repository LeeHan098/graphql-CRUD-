import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string;
  @IsNotEmpty()
  @Field(() => String)
  description: string;
  @Min(100)
  @Field(() => Int)
  price: number;

  //InputType이 따로 필요해서
  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}
