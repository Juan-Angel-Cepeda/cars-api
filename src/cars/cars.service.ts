import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    //logica de negocio reutilizable en el servicio
    private cars = [
        {
            id:1,
            brand:'Toyota',
            model:'Corolla'
        },
        {
            id:2,
            brand:'Honda',
            model:'Civic'
        },
        {
            id:3,
            brand:'BMW',
            model:'250i'
        },
        {
            id:4,
            brand:'Jeep',
            model:'Cherokee'
        }
    ]

    public findAll(){
        return this.cars;
    }
    
    public findOneById(id:number){
        const car = this.cars.find(car => car.id === id);
        if(!car) throw new NotFoundException(`Car with id ${id} cannot be found`);
        return car;
    }
}
