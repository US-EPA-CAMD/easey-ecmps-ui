import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'UNIT_CONTROL' })
export class UnitControl extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  CTL_ID: string;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'varchar', length: 7 })
  CONTROL_CD: string;

  @Column({ type: 'varchar', length: 7 })
  CE_PARAM: string;
}
