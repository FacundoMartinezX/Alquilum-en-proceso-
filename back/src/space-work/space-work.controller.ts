import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SpaceWorkService } from './space-work.service';
import { CreateSpaceDto } from './dto/space-work.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('spaceWork')
export class SpaceWorkController {

    constructor( private readonly spaceWorkService: SpaceWorkService,
    ) {}

@Get()
getSpaceWorksController() {
        return this.spaceWorkService.getSpaceWorksService()   
    }

@Get(':id')
getSpaceWorkByIdController(@Param('id') id:string) {
    return this.spaceWorkService.getSpaceWorkByIdService(id)
}

@Post()
@UseGuards(AuthGuard)
creatSpaceWorkController(@Body() spaceWork: CreateSpaceDto) {
    return this.spaceWorkService.createSpaceWorkService(spaceWork)
}

@Put(':id')
@UseGuards(AuthGuard)
updateSpaceWorkController(@Param('id') id: string, @Body() spaceWork: CreateSpaceDto) {

    return this.spaceWorkService.updateSpaceWorkService(id, spaceWork)
}

@Delete(':id') 
@UseGuards(AuthGuard)
deleteSpaceWorkController(@Param('id') id: string) {
    return this.spaceWorkService.deleteSpaceWorkService(id)
}
     
}

