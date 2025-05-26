import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/users/dto/signUp.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
            private readonly userRepositoryForUser: UserRepository,
            private readonly jwtService: JwtService
) {}

async signup(user: SignUpDto) {
    const existingUser = await this.userRepository.findOne({
        where: {email: user.email}
    });
    if (existingUser) {
        throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepositoryForUser.createUserRepository({
        ...user,
        password: hashedPassword,
    });

    return { message: 'User created successfully', user: { id: newUser.userId, email: newUser.email } };
}

async login(user: LoginDto) {
    const userExisting = await this.userRepository.findOne({
        where: {email: user.email}
    })
    if (!userExisting) {
        throw new UnauthorizedException('Invalid credentials');
    }
    // Valida la contraseña
    const isPasswordValid = await bcrypt.compare(user.password, userExisting.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }


    const payload = {
        id: userExisting.userId,
        email: userExisting.email,
        roles: userExisting.isAdmin === true ? ['admin'] : ['user'],
    }


    const token = this.jwtService.sign(payload)

    

    return { message: 'Login successful', token };
}
        


}
