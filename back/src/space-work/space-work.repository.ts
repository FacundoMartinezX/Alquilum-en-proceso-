import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpaceWork } from "./entities/spaceWork.entity";
import { Repository } from "typeorm";
import { CreateSpaceDto } from "./dto/space-work.dto";

@Injectable()

export class SpaceWorkRepository {
   
    constructor(@InjectRepository(SpaceWork) private readonly spaceWorkRepository: Repository<SpaceWork>) {}

        async getSpaceWorksRepository() {
            const spacesWork =  await this.spaceWorkRepository.find();

            if (spacesWork.length === 0) {
                throw new NotFoundException('No spaces work found');
              }

            return spacesWork;
        }

        async getSpaceWorkByIdRepository(id: string) {
            const spaceWork = await this.spaceWorkRepository.findOne({
                where: {id},
                relations: ['disponibility', 'owner', 'reservas', 'review']
            });
            if (!spaceWork) {
                throw new NotFoundException('SpaceWork not found');
            }
            return spaceWork;
        }

        async createSpaceWorkRepository(spaceWork: CreateSpaceDto) {


            const newSpaceWork = this.spaceWorkRepository.create(spaceWork);
            
            const savedSpaceWork = await this.spaceWorkRepository.save(newSpaceWork);

            return savedSpaceWork;
        }

        async updateSpaceWorkRepository(id: string, updateData: CreateSpaceDto) {

            const {titulo, descripcion, ubicacion, precioPorDia, capacidad, servicios, fotos} = updateData;
            
            const spaceWork = await this.spaceWorkRepository.findOneBy({id})
            
            if (!spaceWork) {
                throw new NotFoundException('SpaceWork not found');

            }

            await this.spaceWorkRepository.update(id, {titulo, descripcion, ubicacion, precioPorDia, capacidad, servicios, fotos})
            
            return 'update successfully'
        }
    
        
        async deleteSpaceWorkRepository(id: string) {
            const spaceWork = await this.spaceWorkRepository.findOneBy({id})
            
            await this.spaceWorkRepository.remove(spaceWork)

            return 'removed successfully'
        }

    
}