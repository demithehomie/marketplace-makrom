import axios from 'axios';
import { Controller, Post, Body, Get, Delete , Param, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

require('dotenv').config();

const ASAAS_API_KEY = process.env.ASAAS_API_KEY

@Controller('payment-links')

export class PaymentLinksController {

    private readonly assasApiUrl = 'https://www.asaas.com/api/v3';

    constructor() {}

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createPaymentLink(@Body() datapaymentLinks: any): Promise<any> {
        const url = `${this.assasApiUrl}/paymentLinks`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.post(url, datapaymentLinks, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getPaymentLinks() {
        const url = `${this.assasApiUrl}/paymentLinks`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.get(url, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPaymentLink(@Param('id') id: string): Promise<any> {
        const url = `${this.assasApiUrl}/paymentLinks`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.get(url + `/${id}`, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePaymentLink(@Param('id') id: string): Promise<any> {
        const url = `${this.assasApiUrl}/paymentLinks`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.delete(url + `/${id}`, {headers});
        return response.data;
    }

    
    // @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updatePaymentLink(@Param('id') id: string, @Body() datapaymentLinks: any): Promise<any> {
        const url = `${this.assasApiUrl}/paymentLinks`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.post(url + `/${id}`, datapaymentLinks, {headers});
        return response.data;
    }
}
