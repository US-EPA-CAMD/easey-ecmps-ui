import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  Get,
  Param,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { FacilitiesService } from './facilities.service';

@ApiTags('Facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieved all Facilities',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getFacilities(): string {
    // TODO: will need a query param (state, limit, offset) and DTO
    return this.facilitiesService.getFacilities();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Retrieved Facilitiy By ID',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityById(@Param('id', ParseIntPipe) id: number): string {
    return this.facilitiesService.getFacilityById(id);
  }

  @Get('/:id/contacts')
  @ApiOkResponse({
    description: 'Retrieved contact data of the specified facility.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityContact(@Param('id', ParseIntPipe) id: number): string {
    return this.facilitiesService.getFacilityContact(id);
  }

  @Get('/:id/units')
  @ApiOkResponse({
    description: 'Retrieved all units within specified facility.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityUnits(@Param('id', ParseIntPipe) id: number): string {
    // TODO: will need a query param (status) and DTO
    return this.facilitiesService.getFacilityUnits(id);
  }

  @Get('/:id/unit/:unitId')
  @ApiOkResponse({
    description: 'Retrieved unit data of the specified unit.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID or unit ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'Unit with the specified facility and unit ID was not found.',
  })
  getFacilityUnitById(
    @Param('id', ParseIntPipe) id: number,
    @Param('unitId', ParseIntPipe) unitId: number
  ): string {
    return this.facilitiesService.getFacilityUnitById(id, unitId);
  }

  @Get('/:id/monitoring-plans')
  @ApiOkResponse({
    description: 'Retrieved all monitoring plans of the specified facility.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityMonitoringPlan(@Param('id', ParseIntPipe) id: number): string {
    // TODO: will need a query param (status, limit, offest) and DTO
    return this.facilitiesService.getFacilityMonitoringPlan(id);
  }
}
