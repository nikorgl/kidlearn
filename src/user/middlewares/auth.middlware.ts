import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../../types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

interface JwtPayload {
  id: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const decode = verify(req.headers.authorization, process.env.JWT_SECRET) as JwtPayload;
        req.user = await this.userService.findById(decode.id);
      } catch {
        req.user = null;
      }
    } else {
      req.user = null;
    }
    next();
  }
}
