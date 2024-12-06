import { IsInt, IsOptional, IsString, IsNotEmpty, MaxLength , Min } from '@nestjs/class-validator';

export class CreateDivisionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength (45)
    name: string;

    @IsString()
    @IsInt()
    upperDivisionId?: number;
    
    @IsInt()
    @Min(1)
    level: number;

    @IsInt()
    @Min(1)
    collaborators: number;

    @IsOptional()
    @IsString()
    ambassadorName?: string;
}