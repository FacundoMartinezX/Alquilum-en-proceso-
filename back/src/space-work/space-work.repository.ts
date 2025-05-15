import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpaceWork } from "./entities/spaceWork.entity";
import { Repository } from "typeorm";
import { CreateSpaceDto } from "./dto/space-work.dto";
import { User } from "src/users/entities/user.entity";
import { isUUID } from "class-validator";
import { Reserve } from "src/reserve/entities/reserve.entity";
@Injectable()

export class SpaceWorkRepository {
   
    constructor(@InjectRepository(SpaceWork) private readonly spaceWorkRepository: Repository<SpaceWork>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Reserve) private readonly reservationRepository: Repository<Reserve>
) {}

        async getSpaceWorksRepository() {
            const spacesWork =  await this.spaceWorkRepository.find({
                relations: ['owner'],
                select: {
                    owner: {
                        userId: true
                    }
                }
            });

            if (spacesWork.length === 0) {
                throw new NotFoundException('No spaces work found');
              }

            return spacesWork;
        }

        async getSpaceWorkByIdRepository(id: string) {

                if(!isUUID(id)) throw new BadRequestException('space work ID not valid')
            

            const spaceWork = await this.spaceWorkRepository.findOne({
                where: {id},
                relations: [ 'owner', 'reservas', 'review', 'review.user'],
                select: {
                    owner: {
                        userId: true,
                        name: true
                    },
                    reservas: {
                        id: true
                    },
                
                }
            });
            if (!spaceWork) {
                throw new NotFoundException('SpaceWork not found');
            }
            return spaceWork;
        }


        async createSpaceWorkRepository(spaceWork: CreateSpaceDto) {

            const existingSpaceWork = await this.spaceWorkRepository.findOne({
                where: {
                  titulo: spaceWork.titulo,
                  ubicacion: spaceWork.ubicacion,
                },
              });
            
              if (existingSpaceWork) {
                throw new BadRequestException('El espacio ya existe con el mismo título y ubicación.');
              }

            const { userId, ...spaceWorkData } = spaceWork;
            const owner = await this.userRepository.findOneBy({userId: userId})

            if (!owner) {
                throw new NotFoundException('There is no owner');
            }

            if (new Date(spaceWork.startDate) > new Date(spaceWork.endDate)) {
                throw new BadRequestException("La fecha de inicio debe ser anterior o igual a la fecha de finalización.");
                }


            const newSpaceWork = this.spaceWorkRepository.create({
                ...spaceWorkData,
                owner
            });
            
            const savedSpaceWork = await this.spaceWorkRepository.save(newSpaceWork);

            const result = await this.spaceWorkRepository.findOne({
                where: {id: savedSpaceWork.id},
                relations: ['owner'],
                select: {
                    owner: {
                        userId: true
                    }
                }
            })

            return result;
        }


        async updateSpaceWorkRepository(id: string, updateData: CreateSpaceDto) {

            if(!isUUID(id)) throw new BadRequestException('space work ID not valid')


            const {titulo, descripcion, ubicacion, precio, capacidad, servicios, fotos} = updateData;

            const spaceWork = await this.spaceWorkRepository.findOneBy({id})
            
            if (!spaceWork) {
                throw new NotFoundException('SpaceWork not found');

            }

            await this.spaceWorkRepository.update(id, {titulo, descripcion, ubicacion , precio, capacidad, servicios, fotos})
            
            return 'update successfully'
        }
    
        
        async deleteSpaceWorkRepository(id: string) {

            if(!isUUID(id)) throw new BadRequestException('space work ID not valid')

            const spaceWork = await this.spaceWorkRepository.findOneBy({id})
            
            await this.spaceWorkRepository.remove(spaceWork)

            return 'removed successfully'
        }

    
}