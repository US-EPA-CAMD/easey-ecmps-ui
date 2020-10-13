import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'UNIT_STACK_CONFIGURATION' })
export class UnitStackConfiguration extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  CONFIG_ID: string;

  @Column({ length: 38 })
  UNIT_ID: number;

  @Column({ type: 'varchar', length: 45 })
  STACK_PIPE_ID: string;
}
