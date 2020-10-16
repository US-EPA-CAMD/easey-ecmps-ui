import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_BOILER_TYPE' })
@Unique('UQ_UNIT_BOILER_TYPE', ['UNIT_ID', 'UNIT_TYPE_CD', 'BEGIN_DATE'])
export class UnitBoilerType extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  UNIT_BOILER_TYPE_ID: number;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'varchar', length: 7 })
  UNIT_TYPE_CD: string;

  @Column({ type: 'date' })
  BEGIN_DATE: Date;
}
