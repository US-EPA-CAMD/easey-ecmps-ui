import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MPFilter {
  // TODO: status validation pipe
  @IsOptional()
  @ApiPropertyOptional()
  status: string;

  @IsOptional()
  @ApiPropertyOptional()
  limit: number;

  @IsOptional()
  @ApiPropertyOptional()
  offset: number;
}
