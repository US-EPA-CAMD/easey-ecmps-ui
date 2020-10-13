import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT' })
@Unique('UQ_UNIT', ['FAC_ID', 'UNITID'])
export class Unit extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  UNIT_ID: number;

  @Column({ length: 38 })
  FAC_ID: number;

  @Column({ type: 'varchar', length: 6 })
  UNITID: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  UNIT_DESCRIPTION: string;

  @Column({ type: 'date', nullable: true })
  COMM_OP_DATE: Date;

  @Column({ length: 38, nullable: true })
  BOILER_SEQUENCE_NUMBER: number;
}
