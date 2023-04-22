import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

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
