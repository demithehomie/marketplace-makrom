import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateClient(email: string, senha: string): Promise<any> {
    const client = await this.authService.validateClient(email, senha);
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }

  async validateProvider(email: string, senha: string): Promise<any> {
    const provider = await this.authService.validateProvider(email, senha);
    if (!provider) {
      throw new UnauthorizedException();
    }
    return provider;
  }
  
}