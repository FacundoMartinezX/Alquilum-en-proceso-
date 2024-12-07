import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor( private readonly usersService: UsersService ) {}

@Get()
getUsersController() {
        return this.usersService.getUsersService()   
    }

@Get(':id')
getUserByIdController(@Param('id') userId:string) {
    return this.usersService.getUserByIdService(userId)
}

@Post()
createUserController(@Body() user: any) {
    return this.usersService.createUserService(user)
}

@Put(':id')
updateUserController(@Param('id') userId: string, @Body() user: any) {

    return this.usersService.updateUserService(userId, user)
}

@Delete(':id') 
deleteUserController(@Param('id') userId: string) {
    return this.usersService.deleteUserService(userId)
}
}

