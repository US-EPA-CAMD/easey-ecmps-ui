import { UnitFuel } from './unit-fuel.dto';
import { UnitControlEquipParam } from './unit-ce-param.dto';
import { UnitProgram } from './unit-program.dto';

export class GetUnitsByIdDTO {
    unitId: string; 
    status: string; 
    heatInputCapacity: number; 
    unitFuel: Array<UnitFuel>;
    controlEquipParam: Array<UnitControlEquipParam>;
    programs: Array<UnitProgram>;
    genId: string; 
    arpNameplateCapacity: number; 
    otherNameplateCapacity: number; 
}