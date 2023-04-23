import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('provider')
export class ProviderController {
       constructor(
        private readonly prisma: PrismaService,
    ) {}

    
    
  @UseGuards(AuthGuard('jwt'))
    @Get('listar')
    async findAll() {
        const providers = await this.prisma.getClient().provider.findMany();
        return providers;
    }
    
    @Post('cadastrar')
    async create(
        @Body() 
            data: { 
                nome: string,
                razao_social: string,
                cnpj: string,
                telefone: string,
                celular: string,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: string,
            }) 
        {
        const client = await this.prisma.getClient().provider.create({
            data: {
                nome: data.nome,
                razao_social: data.razao_social,
                cnpj: data.cnpj,
                telefone: data.telefone,
                celular: data.celular,
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
        const client = await this.prisma.getClient().provider.findUnique({ where: { id } });
        return client;
    }
    
    @UseGuards(AuthGuard('jwt'))    
    @Put(':id')
    async update(@Param('id') id: string, 
        @Body() 
            data: { 
                nome: string,
                razao_social: string,
                cnpj: string,
                telefone: string,
                celular: string,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: string,
            })
        {
        const client = await this.prisma.getClient().provider.update({
            where: {
            id: id,
            },
            data: {
                nome: data.nome,
                razao_social: data.razao_social,
                cnpj: data.cnpj,
                telefone: data.telefone,
                celular: data.celular,
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
        const client = await this.prisma.getClient().provider.delete({
            where: {
            id: id,
            },
        });
        return client;
    }
}
