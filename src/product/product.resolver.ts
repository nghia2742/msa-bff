import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PRODUCT_SERVICE_NAME, ProductServiceClient } from '@/shared/types/proto/product';
import { CreateProductInput, ProductSchema } from './schema/product';

@Resolver(() => ProductSchema)
export class ProductResolver {
  private productService: ProductServiceClient;

  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc
  ) { }

  onModuleInit() {
    this.productService = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Query(() => [ProductSchema], { name: 'products' })
  async getAllProducts(): Promise<ProductSchema[]> {
    const result = await lastValueFrom(this.productService.getAllProducts({}));
    return result.products;
  }

  @Mutation(() => ProductSchema, { name: 'createProduct' })
  async createProduct(@Args('productInput') productInput: CreateProductInput): Promise<ProductSchema> {
    const result = await lastValueFrom(this.productService.createProduct(productInput));
    return result;
  }
}
