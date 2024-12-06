import { PartialType } from '@nestjs/mapped-types';
import { CreateDivisionDto } from './createDivision.dto';

export class UpdateDivisionDto extends PartialType(CreateDivisionDto){}