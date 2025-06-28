import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_SERVICE_NAME } from '@/shared/types/proto/product';
import { ProductResolver } from './product.resolver';

@Module({
  providers: [ProductResolver],
  exports: [ProductResolver],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5000',
          package: 'product_service',
          protoPath: join(__dirname, '../../proto/product.proto'),
        },
      },
    ]),
  ]
})
export class ProductModule { }
