import { BaseEntity, Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'UNIT_OWNER' })
@Unique('UQ_UNIT_OWNER_COMP_OWN_DATE', [
  'UNIT_ID',
  'COMP_ID',
  'OWNER_TYPE_CD',
  'BEGIN_DATE',
])
export class UnitOwner extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  UNIT_OWNER_ID: number;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ length: 38 })
  COMP_ID: number;

  @Column({ type: 'varchar', length: 7 })
  OWNER_TYPE_CD: string;

  @Column({ type: 'date' })
  BEGIN_DATE: Date;
}
