import { Injectable, NotFoundException } from '@nestjs/common';
import { DivisionsRepository } from './divisions.repository';
import { CreateDivisionDto } from './dtos/createDivision.dto';
import { UpdateDivisionDto } from './dtos/updateDivision.dto';
import { Division } from './division.entity';
import { Pagination } from './interfaces/pagination.interface';

@Injectable()
export class DivisionsService {
    constructor(private readonly divisionsRepository: DivisionsRepository) {}

    async createDivision(divisionDto: CreateDivisionDto): Promise<Division> {
        const { upperDivisionId, ...rest } = divisionDto;
        const upperDivision = upperDivisionId
        ? await this.divisionsRepository.findDivisionById(upperDivisionId)
        : null;

        if (upperDivisionId && !upperDivision) {
            console.log("Upper Division: ", upperDivision);
            throw new NotFoundException('Upper division not found');
        }
        
        const division = { ...rest, upperDivision };
        return await this.divisionsRepository.createDivision(division);
    }

    async findDivisions(page: number, limit: number): Promise<Pagination<Division>> {
        const [results, total] = await this.divisionsRepository.findAndCount({
            relations: { upperDivision: true },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { 
            results: results, 
            total: total, 
            page: page, 
            limit: limit 
        };
    }

    async findDivisionById(id: number): Promise<Division> {
        const division = await this.divisionsRepository.findDivisionById(id);
        if (!division) throw new NotFoundException('Division not found');
        return division;
    }

    async updateDivision(id: number, divisionDto: UpdateDivisionDto): Promise<Division> {
        const division = await this.findDivisionById(id);
        const { upperDivisionId, ...rest } = divisionDto;
        if (upperDivisionId) {
            const upperDivision = await this.divisionsRepository.findDivisionById(upperDivisionId);
            if (!upperDivision) throw new NotFoundException('Upper division not found');
            division.upperDivision = upperDivision;
        }
        Object.assign(division, rest);
        await this.divisionsRepository.updateDivision(id, division);
        return division;
    }

    async deleteDivision(id: number): Promise<void> {
        const division = await this.findDivisionById(id);
        if (!division) throw new NotFoundException('Division not found');
        await this.divisionsRepository.deleteDivision(id);
    }

    async findSubdivisions(upperId: number): Promise<Division[]> {
        return await this.divisionsRepository.findSubdivisions(upperId);
    }
}
