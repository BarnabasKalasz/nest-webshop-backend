import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return this.userService.getUserById(payload.sub);
  }

  async login(user: any) {
    const payload: JwtPayload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleUser(profile: any): Promise<any> {
    const user = await this.userService.findOrCreateGoogleUser(profile);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
