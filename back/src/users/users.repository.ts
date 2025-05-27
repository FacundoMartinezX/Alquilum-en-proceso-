import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto/signUp.dto";
import { isUUID } from "class-validator";

@Injectable()

export class UserRepository {

  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getUsersRepository() {
    const users = await this.userRepository.find({relations: ['reservas']}); 

    if (users.length === 0) {
      throw new NotFoundException('users not found');
    }
    
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword); 
  }

  async getUserByIdRepository(userId: string) {

    if(!isUUID(userId)) throw new BadRequestException('User ID not valid')

    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['reviews', 'reservas', 'spaceWork'],
      select: {spaceWork: {id: true}, reviews: {id: true}, reservas: {id: true}}
    });

        if(!user) new NotFoundException('user not found')

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {password, ...userWithoutPassword } = user;


        return userWithoutPassword;

    }

    async createUserRepository(user: SignUpDto) {

      const existingUser = await this.userRepository.findOneBy({ email: user.email });
    
      if (existingUser) {
        throw new BadRequestException('El usuario con este correo ya está registrado');
      }


      const newUser = this.userRepository.create(user);
      const savedUser = await this.userRepository.save(newUser); 
    
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    }

    async updateUserRepository(userId: string, updateUser: any) {

    if(!isUUID(userId)) throw new BadRequestException('User ID not valid')


         const { name, email, address } = updateUser

         await this.userRepository.update(userId,{name, email, address})
         const updatedUser = await this.userRepository.findOneBy({ userId });

         if (updatedUser) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = updatedUser;
          return userWithoutPassword;
        }
      
        throw new Error('Error updating user');

    }

    async deleteUserRepository(userId: string) {

    if(!isUUID(userId)) throw new BadRequestException('User ID not valid')


      const user = await this.userRepository.findOneBy({userId})

      if(!user) new NotFoundException('user not found')

      await this.userRepository.remove(user)

      return 'successfully removed'

    }

      async getProfileMeRepository(id: string) {
        const user = await this.userRepository.findOneBy( { userId: id });
        if (user) {
          
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
  }

    }
