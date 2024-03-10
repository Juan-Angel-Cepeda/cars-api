import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto} from './dto';


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

    public create(CreateCarDto:CreateCarDto){
        const car:Car = {
            id:uuid(),
            brand:CreateCarDto.brand,
            model:CreateCarDto.model
        }
        this.cars.push(car);
        return car;
    }

    public update(id:string,updateCarDto:UpdateCarDto){
     
        //aqui se hacen las validaciones de los datos del vehiculo, 
        //con db esta más sencillo
        let carDB = this.findOneById(id);

        if(updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException('Car id is not valid inside body')

        this.cars = this.cars.map( car => {
            
            if (car.id === id){
                carDB = { ...carDB,...updateCarDto, id }
                return   carDB;
            }

            return car
        })

        return carDB;//carro actualizado
    }

    

}
