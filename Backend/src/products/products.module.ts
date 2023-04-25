import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthModule } from 'src/common/auth/auth.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  controllers: [
    ProductsController
  ],
  providers: [
    PrismaService
  ],
  exports: [ ]
})

export class ProductsModule {}