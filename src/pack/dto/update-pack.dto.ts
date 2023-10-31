import { PartialType } from '@nestjs/swagger';
import { CreatePackDto } from 'src/pack/dto/create-pack.dto';

export class UpdatePackDto extends PartialType(CreatePackDto) {}
