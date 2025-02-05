import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
    
    constructor( private readonly usersService: UsersService ) {}

@Get()
@UseGuards(AuthGuard)
getUsersController() {
        return this.usersService.getUsersService()   
    }

@Post()
createUserController(@Body() user: SignUpDto) {
    return this.usersService.createUserService(user)
}

@Get(':id')
getUserByIdController(@Param('id') userId:string) {
    return this.usersService.getUserByIdService(userId)
}
@Put(':id')
updateUserController(@Param('id') userId: string, @Body() user: SignUpDto) {

    return this.usersService.updateUserService(userId, user)
}

@Delete(':id') 
deleteUserController(@Param('id') userId: string) {
    return this.usersService.deleteUserService(userId)
}
}

