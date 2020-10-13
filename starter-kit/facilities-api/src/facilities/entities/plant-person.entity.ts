import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PLANT_PERSON' })
export class PlantPerson extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  FAC_PPL_ID: number;

  @Column({ length: 38, nullable: true })
  FAC_ID: number;

  @Column({ length: 38 })
  PPL_ID: number;

  @Column({ type: 'varchar', length: 7 })
  RESPONSIBILITY_ID: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  PRG_CD: string;
}
