import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FacilitiesFilter {
  // TODO: state validation pipe
  @IsOptional()
  @ApiPropertyOptional()
  state: string;

  @IsOptional()
  @ApiPropertyOptional()
  limit: number;

  @IsOptional()
  @ApiPropertyOptional()
  offset: number;
}
