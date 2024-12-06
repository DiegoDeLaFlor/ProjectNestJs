import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { Division } from './division.entity';
import { CreateDivisionDto } from './dtos/createDivision.dto';
import { UpdateDivisionDto } from './dtos/updateDivision.dto';

@Controller('divisions')
export class DivisionsController {
    constructor(private readonly divisionsService: DivisionsService) {}

    @Post()
    async createDivision(@Body() divisionDto: CreateDivisionDto): Promise<Division> {
        return await this.divisionsService.createDivision(divisionDto);
    }

    @Get()
    async findDivisions(): Promise<Division[]> {
        return await this.divisionsService.findDivisions();
    }

    @Get(':id')
    async findDivisionById(@Param('id', ParseIntPipe) id: number): Promise<Division> {
        return await this.divisionsService.findDivisionById(id);
    }
    
    @Patch(':id')
    async updateDivision(
        @Param('id', ParseIntPipe) id: number,
        @Body() divisionDto: UpdateDivisionDto
    ): Promise<Division> {
        return await this.divisionsService.updateDivision(id, divisionDto);
    }

    @Delete(':id')
    async deleteDivision(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.divisionsService.deleteDivision(id);
    }

    @Get(':id/subdivisions')
    async findSubdivisions(@Param('id', ParseIntPipe) id: number): Promise<Division[]> {
        return await this.divisionsService.findSubdivisions(id);
    }
}
