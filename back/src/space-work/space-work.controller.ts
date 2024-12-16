import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SpaceWorkService } from './space-work.service';
import { CreateSpaceDto } from './dto/space-work.dto';

@Controller('spaceWork')
export class SpaceWorkController {

    constructor( private readonly spaceWorkService: SpaceWorkService) {}

@Get()
getSpaceWorksController() {
        return this.spaceWorkService.getSpaceWorksService()   
    }

@Get(':id')
getSpaceWorkByIdController(@Param('id') id:string) {
    return this.spaceWorkService.getSpaceWorkByIdService(id)
}

@Post()
creatSpaceWorkController(@Body() spaceWork: CreateSpaceDto) {
    return this.spaceWorkService.createSpaceWorkService(spaceWork)
}

@Put(':id')
updateSpaceWorkController(@Param('id') id: string, @Body() spaceWork: CreateSpaceDto) {

    return this.spaceWorkService.updateSpaceWorkService(id, spaceWork)
}

@Delete(':id') 
deleteSpaceWorkController(@Param('id') id: string) {
    return this.spaceWorkService.deleteSpaceWorkService(id)
}
     
}
