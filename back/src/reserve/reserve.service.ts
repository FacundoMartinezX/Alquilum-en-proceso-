import { Injectable } from '@nestjs/common';
import { ReserveRepository } from './reserve.repository';

@Injectable()
export class ReserveService {
    constructor(private readonly reserveRepository: ReserveRepository) {}

    getReservesService() {
        return this.reserveRepository.getReservesRepository();
    }

    getReserveByIdService(id: string) {
        return this.reserveRepository.getReserveByIdRepository(id);
    }

    createReserveService(reserve: any) {
        return this.reserveRepository.createReserveRepository(reserve);
    }

    updateReserveService(id: string, reserve: any) {
        return this.reserveRepository.updateReserveRepository(id, reserve);
    }

    deleteReserveService(id: string) {
        return this.reserveRepository.deleteReserveRepository(id);
    }
}