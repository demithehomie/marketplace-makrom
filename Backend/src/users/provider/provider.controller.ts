import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthService } from 'src/common/auth/auth.service';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('provider')
export class ProviderController {
       constructor(
        private readonly prisma: PrismaService,
        private authService: AuthService
    ) {}

    
    @UseGuards(JwtAuthGuard)
    @Get('listar')
    async findAll() {
        const providers = await this.prisma.getClient().provider.findMany();
        return providers;
    }
    
    @Post('cadastrar')
    async create(
        @Body() 
            data: { 
                usuario: string,
                senha: string,
                nome: string,
                razao_social: string,
                cnpj: string,
                email: string,
                telefone: number,
                celular: number,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: number,
            }) 
        {
        const client = await this.prisma.getClient().provider.create({
            data: {
                usuario: data.usuario,
                senha: bcrypt.hashSync(data.senha, 8),
                nome: data.nome,
                razao_social: data.razao_social,
                cnpj: data.cnpj,
                email: data.email,
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
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const client = await this.prisma.getClient().provider.findUnique({ where: { id: parseInt(id, 10) } });
        return client;
    }
    
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        const client = await this.prisma.getClient().provider.findUnique({ where: { email } });
        return client ;
    }
    
    @Put(':id')
    async update(@Param('id') id: string, 
        @Body() 
            data: { 
                usuario: string,
                senha: string,
                nome: string,
                razao_social: string,
                cnpj: string,
                email: string,
                telefone: number,
                celular: number,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: number,
            })
        {
        const client = await this.prisma.getClient().provider.update({
            where: {
            id: parseInt(id),
            },
            data: {
                usuario: data.usuario,
                senha: bcrypt.hashSync(data.senha, 8),
                nome: data.nome,
                razao_social: data.razao_social,
                cnpj: data.cnpj,
                email: data.email,
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

    @Delete(':id')
        async delete(@Param('id') id: string) {
        const client = await this.prisma.getClient().provider.delete({
            where: {
            id: parseInt(id),
            },
        });
        return client;
    }
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
        async login(@Request() req) {
        return this.authService.login(req.client);    
    }
}
