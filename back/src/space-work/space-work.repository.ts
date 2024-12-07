import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()

export class SpaceWorkRepository {

    spaceWorks = [
        {
            id: '1',
            name: 'Coworking Central',
            location: 'Buenos Aires, Argentina',
            pricePerHour: 10,
            description: 'Espacio moderno con internet de alta velocidad y sala de reuniones.',
            capacity: 50,
            amenities: ['Wi-Fi', 'Café gratis', 'Sala de reuniones', 'Estacionamiento'],
        },
        {
            id: '2',
            name: 'WorkSpot Palermo',
            location: 'Palermo, Buenos Aires',
            pricePerHour: 15,
            description: 'Espacio premium con áreas de relajación y vistas increíbles.',
            capacity: 30,
            amenities: ['Wi-Fi', 'Área de relax', 'Terraza', 'Café gourmet'],
        },
        {
            id: '3',
            name: 'The Productivity Hub',
            location: 'Córdoba, Argentina',
            pricePerHour: 12,
            description: 'Diseñado para la productividad, con cabinas privadas y escritorios compartidos.',
            capacity: 40,
            amenities: ['Wi-Fi', 'Cabinas privadas', 'Impresora', 'Zona de juegos'],
        }]    

        getSpaceWorksRepository() {
            return this.spaceWorks;
        }

        getSpaceWorkByIdRepository(id: string) {
            const spaceWork = this.spaceWorks.find((sw) => sw.id === id);
            if (!spaceWork) {
                throw new NotFoundException('SpaceWork not found');
            }
            return spaceWork;
        }

        createSpaceWorkRepository(spaceWork: any) {
            const newSpaceWork = { id: Date.now().toString(), ...spaceWork };
            this.spaceWorks.push(newSpaceWork);
            return newSpaceWork;
        }

        updateSpaceWorkRepository(id: string, updateData: any) {
            const index = this.spaceWorks.findIndex((sw) => sw.id === id);
            if (index === -1) {
                throw new NotFoundException('SpaceWork not found');
            }
            this.spaceWorks[index] = { ...this.spaceWorks[index], ...updateData };
            return this.spaceWorks[index];
        }
    
        
        deleteSpaceWorkRepository(id: string) {
            const index = this.spaceWorks.findIndex((sw) => sw.id === id);
            if (index === -1) {
                throw new NotFoundException('SpaceWork not found');
            }
            const [deletedSpaceWork] = this.spaceWorks.splice(index, 1);
            return deletedSpaceWork;
        }

    
}