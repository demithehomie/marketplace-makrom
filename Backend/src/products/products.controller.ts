import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly prisma: PrismaService,
      ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('listar')
  async findAll() {
    const products = await this.prisma.getClient().products.findMany();
    return products;
  }
  @Post('cadastrar')
  async create(
    @Body()
    data: {
      name: string;
      description: string;
      price: number;
      quantity: number;
      image: string;
    },
  ) {
    const product = await this.prisma.getClient().products.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
      },
    });
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.prisma.getClient().products.findUnique({ where: { id: parseInt(id), } });
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      name: string;
      description: string;
      price: number;
      quantity: number;
      image: string;
    },
  ) {
    const product = await this.prisma.getClient().products.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
      },
    });
    return product;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.prisma.getClient().products.delete({
      where: {
        id: parseInt(id),
      },
    });
    return product;
  }

}
