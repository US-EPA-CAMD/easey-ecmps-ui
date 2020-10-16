import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UnitsFilter {
  // TODO: status validation pipe
  @IsOptional()
  @ApiPropertyOptional()
  status: string;
}
