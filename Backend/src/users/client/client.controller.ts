import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import * as dotenv from 'dotenv';

@Controller('client')
export class ClientController {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    dotenv.config();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('listar')
  async findAll() {
    const clients = await this.prisma.getClient().client.findMany();
    return clients;
  }

  @Post('cadastrar')
  async create(
    @Body()
    data: {
      nome: string;
      cpf: string;
      telefone: string;
      celular: string;
      nascismento: string;
      endereco: string;
      numero: number;
      bairro: string;
      complemento: string;
      cidade: string;
      estado: string;
      cep: string;
    },
  ) {
    const client = await this.prisma.getClient().client.create({
      data: {
        nome: data.nome,
        cpf: data.cpf,
        telefone: data.telefone,
        celular: data.celular,
        nascismento: data.nascismento,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
      },
    });
    return client;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.prisma.getClient().client.findUnique({ where: { id } });
    return client;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      nome: string;
      cpf: string;
      telefone: string;
      celular: string;
      nascismento: string;
      endereco: string;
      numero: number;
      bairro: string;
      complemento: string;
      cidade: string;
      estado: string;
      cep: string;
    },
  ) {
    const client = await this.prisma.getClient().client.update({
      where: {
        id: id,
      },
      data: {
        nome: data.nome,
        cpf: data.cpf,
        telefone: data.telefone,
        celular: data.celular,
        nascismento: data.nascismento,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
      },
    });
    return client;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const client = await this.prisma.getClient().client.delete({
      where: {
        id: id,
      },
    });
    return client;
  }
}
