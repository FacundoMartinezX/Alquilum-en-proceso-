import { Injectable } from '@nestjs/common';
import { ReserveRepository } from './reserve.repository';
import { CreateReservationDto } from './dto/reserve.dto';

@Injectable()
export class ReserveService {
    constructor(private readonly reserveRepository: ReserveRepository) {}

    getReservesService() {
        return this.reserveRepository.getReservesRepository();
    }

    getReserveByIdService(id: string) {
        return this.reserveRepository.getReserveByIdRepository(id);
    }

    createReserveService(reserve: CreateReservationDto) {
        return this.reserveRepository.createReserveRepository(reserve);
    }

    cancelReservationService(id: string) {
        return this.reserveRepository.cancelReservationRepository(id);
    }
}