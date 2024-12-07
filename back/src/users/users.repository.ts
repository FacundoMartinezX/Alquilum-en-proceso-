import { Injectable } from "@nestjs/common";

@Injectable()

export class UserRepository {

    private users = [
        { id: 'a', name: 'User One', email: 'user1@example.com' },
        { id: 'b', name: 'User Two', email: 'user2@example.com' },
      ]

    getUsersRepository() {
        return this.users;
    }

    getUserByIdRepository(userId: string) {
        const user = this.users.find( us => us.id === userId)

        if(!user) return 'user not found'

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
