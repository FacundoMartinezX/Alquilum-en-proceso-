import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/users/dto/signUp.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
            private readonly userRepositoryforCreate: UserRepository    
) {}

    async signup(dataUser: SignUpDto) {
        const existingUser = await this.userRepository.findOne({
            where: {email: dataUser.email}
        })

        if(existingUser) throw new Error('Email already exists')

        const user = await this.userRepositoryforCreate.createUserRepository(dataUser);

        if (!user) throw new Error('error');

        
    }  

}
