import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
    constructor(private readonly reserveService: ReserveService) {}

    @Get()
    getReservesController() {
        return this.reserveService.getReservesService();
    }

    @Get(':id')
    getReserveByIdController(@Param('id') id: string) {
        return this.reserveService.getReserveByIdService(id);
    }

    @Post()
    createReserveController(@Body() reserve: any) {
        return this.reserveService.createReserveService(reserve);
    }

    @Put(':id')
    updateReserveController(@Param('id') id: string, @Body() reserve: any) {
        return this.reserveService.updateReserveService(id, reserve);
    }

    @Delete(':id')
    deleteReserveController(@Param('id') id: string) {
        return this.reserveService.deleteReserveService(id);
    }
}