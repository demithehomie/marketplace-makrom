import axios from 'axios';
import { Controller, Post, Body, Get, Delete , Param, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

require('dotenv').config();

const ASAAS_API_KEY = process.env.ASAAS_API_KEY

@Controller('subscriptions')

export class SubscriptionsController {

    
    private readonly assasApiUrl = 'https://www.asaas.com/api/v3';

    constructor() {}

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createSubscription(@Body() datasubscriptions: any): Promise<any> {
        const url = `${this.assasApiUrl}/subscriptions`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.post(url, datasubscriptions, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getSubscriptions() {
        const url = `${this.assasApiUrl}/subscriptions`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.get(url, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSubscription(@Param('id') id: string): Promise<any> {
        const url = `${this.assasApiUrl}/subscriptions`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.get(url + `/${id}`, {headers});
        return response.data;
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteSubscription(@Param('id') id: string): Promise<any> {
        const url = `${this.assasApiUrl}/subscriptions`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.delete(url + `/${id}`, {headers});
        return response.data;
    }

    
    // @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updateSubscription(@Param('id') id: string, @Body() datasubscriptions: any): Promise<any> {
        const url = `${this.assasApiUrl}/subscriptions`;
        const headers = { access_token: ASAAS_API_KEY, 'Content-Type': 'applications/json'};
        const response = await axios.post(url + `/${id}`, datasubscriptions, {headers});
        return response.data;
    }
}
