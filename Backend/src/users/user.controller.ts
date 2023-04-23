import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    dotenv.config();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('listar')
  async findAll() {
    const users = await this.prisma.getClient().user.findMany();
    return users;
  }

  @Post('cadastrar')
  async create(
    @Body()
    data: {
      usuario: string;
      email: string;
      senha: string;
    },
  ) {
    const user = await this.prisma.getClient().user.create({
      data: {
        usuario: data.usuario,
        email: data.email,
        senha: bcrypt.hashSync(data.senha, 8),
      },
    });
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.prisma.getClient().user.findUnique({ where: { id: parseInt(id), } });
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      usuario: string;
      email: string;
      senha: string;
    },
  ) {
    const user = await this.prisma.getClient().user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        usuario: data.usuario,
        email: data.email,
        senha: bcrypt.hashSync(data.senha, 8),
      },
    });
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.prisma.getClient().user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  }
}
