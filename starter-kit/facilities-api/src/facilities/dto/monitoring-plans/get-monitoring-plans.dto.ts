import { MonitoringPlanUnitStackDTO } from './monitoring-plan-unit-stack.dto';
export class GetMonitoringPlansDTO {
  unitStackName: Array<MonitoringPlanUnitStackDTO>;
  status: string;
  beginYear: number;
  beginQuarter: number;
  endYear: number;
  endQuarter: number;
}
