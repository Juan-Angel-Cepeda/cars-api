import { Controller,Get,Param, ParseIntPipe} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly CarsService:CarsService
    ){}

    @Get()
    getAllCars(){
        return this.CarsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id',ParseIntPipe) id:number ){
        console.log({id});
        return this.CarsService.findOneById(id);
    }
}
