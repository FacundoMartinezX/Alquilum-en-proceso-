import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/users/dto/signUp.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signup(@Body() user: SignUpDto) {
        return this.authService.signup(user);
    }

    @Post('login')
    async login(@Body() user: LoginDto) {
        return this.authService.login(user);
    }
}
