import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
    
    constructor( private readonly usersService: UsersService ) {}

@Get()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
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

