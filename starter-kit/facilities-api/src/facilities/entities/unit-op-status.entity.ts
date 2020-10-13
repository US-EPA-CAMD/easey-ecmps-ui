import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_OP_STATUS' })
@Unique('UQ_UNIT_OP_STATUS', ['UNIT_ID', 'OP_STATUS_CD', 'BEGIN_DATE'])
export class UnitOpStatus extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  UNIT_OP_STATUS_ID: number;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'varchar', length: 7 })
  OP_STATUS_CD: string;

  @Column({ type: 'date' })
  BEGIN_DATE: Date;
}
