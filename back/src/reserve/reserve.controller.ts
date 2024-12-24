import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReservationDto } from './dto/reserve.dto';

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
    createReserveController(@Body() reserve: CreateReservationDto) {
        return this.reserveService.createReserveService(reserve);
    }

    @Put('cancel/:id')
    cancellReserveController(@Param('id') id: string) {
        return this.reserveService.cancelReservationService(id);
    }
}