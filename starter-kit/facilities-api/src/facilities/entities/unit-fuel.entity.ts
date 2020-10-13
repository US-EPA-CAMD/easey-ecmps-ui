import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_FUEL' })
@Unique('UQ_UNIT_FUEL', ['UNIT_ID', 'FUEL_TYPE', 'BEGIN_DATE'])
export class UnitFuel extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  UF_ID: string;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'varchar', length: 7 })
  FUEL_TYPE: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  INDICATOR_CD: string;
  
  @Column({ type: 'date' })
  BEGIN_DATE: Date;
}
