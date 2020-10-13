import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'UNIT_CAPACITY' })
export class UnitCapacity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  UNIT_CAP_ID: string;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'decimal', precision: 7, scale: 1, nullable: true })
  MAX_HI_CAPACITY: number;
}
