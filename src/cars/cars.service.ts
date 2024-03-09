import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid';

import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
    //logica de negocio reutilizable en el servicio
    private cars:Car[] = [
        {
            //utiliza la v4 de uuid
            id:uuid(),
            brand:'Toyota',
            model:'Corolla'
        },
        {
            id:uuid(),
            brand:'Honda',
            model:'Civic'
        },
        {
            id:uuid(),
            brand:'BMW',
            model:'250i'
        },
        {
            id:uuid(),
            brand:'Jeep',
            model:'Cherokee'
        }
    ]

    public findAll(){
        return this.cars;
    }
    
    public findOneById(id:string){
        const car = this.cars.find(car => car.id === id);
        //exception filter
        if(!car) throw new NotFoundException(`Car with id ${id} cannot be found`);
        return car;
    }
}
