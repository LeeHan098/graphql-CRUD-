import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, In, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  number: number;

  @Field(() => String)
  @Column()
  writer: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  contents: string;
}
