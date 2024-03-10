import { Body, Controller,Delete,Get,Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
//@UsePipes( ValidationPipe )
export class CarsController {

    constructor(
        private readonly CarsService:CarsService
    ){}
    //CRUD
    //Create Read Update Delete
    @Get()
    getAllCars(){
        return this.CarsService.findAll();
    };

    @Get('/:id')
    getCarById( @Param('id',ParseUUIDPipe) id:string ){
        return this.CarsService.findOneById(id);
    };

    @Post()
    //@UsePipes( ValidationPipe )
    createCar(@Body() createCarDto: CreateCarDto){
        return createCarDto;
    };

    @Patch('/:id')
    updateCar( 
        @Param('id',ParseUUIDPipe) id:string,
        @Body() body: any ){
        return {id,body};
    };

    @Delete('/:id')
    deleteCar(@Param('id',ParseUUIDPipe) id:string){
        return{
            method: 'delete',
            id:id
        }
    }

}
