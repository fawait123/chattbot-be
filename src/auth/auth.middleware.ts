import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { jwtConstant } from 'src/constant/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }
  async use(req: any, res: Response, next: () => void) {
    try {
      const headers = req.headers.authorization

      if (!headers) {
        return res.status(401).json({
          status: "access forbidden",
          message: "Kamu tidak diijinkan mengakses data"
        })
      }

      const [_, token] = headers.split(" ")

      if (!token) {
        return res.status(401).json({
          status: "access forbidden",
          message: "Kamu tidak diijinkan mengakses data"
        })
      }

      const user = await this.jwtService.verifyAsync(token, { secret: jwtConstant.secret })

      req.user = user

      next();
    } catch (error) {
      return res.status(401).json({
        status: "access forbidden",
        message: error.message,
      })
    }
  }
}
