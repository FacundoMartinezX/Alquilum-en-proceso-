import { Injectable } from '@nestjs/common';
import { SpaceWorkRepository } from './space-work.repository';
import { CreateSpaceDto } from './dto/space-work.dto';

@Injectable()
export class SpaceWorkService {
    constructor(private readonly spaceWorkRepository: SpaceWorkRepository) {}

    getSpaceWorksService() {
        return this.spaceWorkRepository.getSpaceWorksRepository();
    }

    getSpaceWorkByIdService(id: string) {
        return this.spaceWorkRepository.getSpaceWorkByIdRepository(id);
    }

    createSpaceWorkService(spaceWork: CreateSpaceDto) {
        return this.spaceWorkRepository.createSpaceWorkRepository(spaceWork);
    }

    updateSpaceWorkService(id: string, spaceWork: CreateSpaceDto) {
        return this.spaceWorkRepository.updateSpaceWorkRepository(id, spaceWork);
    }

    deleteSpaceWorkService(id: string) {
        return this.spaceWorkRepository.deleteSpaceWorkRepository(id);
    }
}