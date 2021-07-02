import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body) {
        const usuario = await this.authService.validateUser(body.usr_rut, body.usr_contrasena);
        return await this.authService.login(usuario);
      }
}
