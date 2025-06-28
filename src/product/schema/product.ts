import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Product, CreateProductRequest } from '@/shared/types/proto/product';

@ObjectType()
export class ProductSchema implements Product {
  @Field()
  id: string;

  @Field()
  productName: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateProductInput implements CreateProductRequest {
  @Field()
  @IsString()
  productName: string;

  @Field()
  @IsNumber()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
