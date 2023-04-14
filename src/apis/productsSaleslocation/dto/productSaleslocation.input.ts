import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entites/productsSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
