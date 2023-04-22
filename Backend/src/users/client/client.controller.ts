import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthService } from 'src/common/auth/auth.service';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';
import * as dotenv from 'dotenv';

@Controller('client')

export class ClientController {
    
    constructor(
        private readonly prisma: PrismaService,
        private authService: AuthService,
    ) {
        dotenv.config();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('listar')
    async findAll() {
        const clients = await this.prisma.getClient().client.findMany();
        return clients;
    }
    
    @Post('cadastrar')
    async create(
        @Body() 
            data: { 
                usuario: string,
                senha: string,
                nome: string,
                cpf: string,
                email: string,
                telefone: number,
                celular: number,
                nascismento: number,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: number,
                twoFactorSecret: string,
                twoFactorEnabled: boolean,
                verified: boolean,
            }) 
        {
        const client = await this.prisma.getClient().client.create({
            data: {
                usuario: data.usuario,
                senha: bcrypt.hashSync(data.senha, 8),
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
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
                twoFactorSecret: data.twoFactorSecret,
                twoFactorEnabled: data.twoFactorEnabled,
                verified: data.verified,

            },
        });
        return client;
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const client = await this.prisma.getClient().client.findUnique({ where: { id: parseInt(id, 10) } });
        return client;
    }
    
    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        const client = await this.prisma.getClient().client.findUnique({ where: { email } });
        return client ;
    }
    
    @Put(':id')
    async update(@Param('id') id: string, 
        @Body() 
            data: { 
                usuario: string,
                senha: string,
                nome: string,
                cpf: string,
                email: string,
                telefone: number,
                celular: number,
                nascismento: number,
                endereco: string,
                numero: number,
                bairro: string,
                complemento: string,
                cidade: string,
                estado: string,
                cep: number,
                twoFactorSecret: string,
                twoFactorEnabled: boolean,
                verified: boolean,
            })
        {
        const client = await this.prisma.getClient().client.update({
            where: {
            id: parseInt(id),
            },
            data: {
                usuario: data.usuario,
                senha: bcrypt.hashSync(data.senha, 8),
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
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
                twoFactorSecret: data.twoFactorSecret,
                twoFactorEnabled: data.twoFactorEnabled,
                verified: data.verified,
            },
        });
        return client;
    }

    @Delete(':id')
        async delete(@Param('id') id: string) {
        const client = await this.prisma.getClient().client.delete({
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
