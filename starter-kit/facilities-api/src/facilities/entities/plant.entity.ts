import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'PLANT' })
@Unique('UQ_PLANT_NAME_STATE', ['FACILITY_NAME', 'STATE'])
export class Unit extends BaseEntity {
  @PrimaryColumn({ length: 38})
  FAC_ID: number;

  @Column({ length: 6 ,nullable: true})
  ORIS_CODE: number;

  @Column({ type: 'varchar', length: 4000 })
  FACILITY_NAME: string;

  @Column({ type: 'varchar', length: 4000 ,nullable: true})
  DESCRIPTION: string;

  @Column({ type: 'varchar', length: 2 })
  STATE: string;
  
  @Column({ type: 'varchar', length: 8 ,nullable: true})
  COUNTY: string;

  @Column({ length: 4 ,nullable: true})
  SIC_CODE: number;

  @Column({ length: 2 ,nullable: true})
  EPA_REGION: number;

  @Column({ length: 5 ,nullable: true})
  NERC_REGION: string;

  @Column({ length: 10,nullable: true })
  AIRSID: string;

  @Column({ length: 12,nullable: true })
  FINDSID: string;

  @Column({ length: 15 ,nullable: true})
  STATEID: string;

  @Column({ type: 'decimal', precision: 7, scale: 4, nullable: true })
  LATITUDE: number;

  @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true })
  LONGITUDE: number;
  
  @Column({ length: 12 ,nullable: true})
  FRS_ID: string;

  @Column({ length: 6 ,nullable: true})
  PAYEE_ID: number;

  @Column({ type: 'date', nullable: true })
  PERMIT_EXP_DATE: Date;

  @Column({ length: 200 ,nullable: true})
  LATLON_SOURCE: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  TRIBAL_LAND_CD: string;

  @Column({ length: 38 ,nullable: true})
  PAYEFIRST_ECMPS_RPT_PERIOD_ID: number;

  
}
