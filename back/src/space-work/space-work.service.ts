import { Injectable } from '@nestjs/common';
import { SpaceWorkRepository } from './space-work.repository';

@Injectable()
export class SpaceWorkService {
    constructor(private readonly spaceWorkRepository: SpaceWorkRepository) {}

    getSpaceWorksService() {
        return this.spaceWorkRepository.getSpaceWorksRepository();
    }

    getSpaceWorkByIdService(id: string) {
        return this.spaceWorkRepository.getSpaceWorkByIdRepository(id);
    }

    createSpaceWorkService(spaceWork: any) {
        return this.spaceWorkRepository.createSpaceWorkRepository(spaceWork);
    }

    updateSpaceWorkService(id: string, spaceWork: any) {
        return this.spaceWorkRepository.updateSpaceWorkRepository(id, spaceWork);
    }

    deleteSpaceWorkService(id: string) {
        return this.spaceWorkRepository.deleteSpaceWorkRepository(id);
    }
}