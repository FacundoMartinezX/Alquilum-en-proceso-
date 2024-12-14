import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()

export class UserRepository {

  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>) {

  }

    getUsersRepository() {
        return this.userRepository.find();
    }

    getUserByIdRepository(userId: string) {
        const user = this.userRepository.findOneBy({id: userId})

        if(!user) return new NotFoundException('user not found')

        return user;

    }

    createUserRepository(user: any) {
      const newUser = {
        id: this.users.length + 1,
        ...user
      }

      this.users.push(newUser)
    
    }

    updateUserRepository(userId: string, user: any) {
         const userI = this.users.findIndex(us => us.id === userId)

        if(userI === -1) {
            return 'user not found'
        }

         this.users[userI] = {...this.users[userI], ...user}

         return 'modified user'
     }

    deleteUserRepository(userId: string) {

      const userIndex = this.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) return { message: 'User not found' };
  
      this.users.splice(userIndex, 1);

      return 'user deleted';
    }

    }
