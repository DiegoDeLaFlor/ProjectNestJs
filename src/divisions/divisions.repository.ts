import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Division } from './division.entity';

@Injectable()
export class DivisionsRepository extends Repository<Division> {

    constructor(private readonly dataSource: DataSource) {
        super(Division, dataSource.createEntityManager());
    }

    async createDivision(division: Partial<Division>): Promise<Division> {
        return await this.save(division);
    }

    async findDivisions(): Promise<Division[]> {
        return await this.find({ relations: ['upperDivision'] });
    }

    async findDivisionById(id: number): Promise<Division | null> {
        return await this.findOne({ 
            where: { id }, 
            relations: ['subDivisions', 'upperDivision'] 
        });
    }
    
    async updateDivision(id: number, updateData: Partial<Division>): Promise<void> {
        await this.save(updateData);
    }
    
    async deleteDivision(id: number): Promise<void> {
        await this.delete(id);
    }

    async findSubdivisions(upperId: number): Promise<Division[]> {
        return await this.find({
            where: { upperDivision: { id: upperId } },
        });
    }
}