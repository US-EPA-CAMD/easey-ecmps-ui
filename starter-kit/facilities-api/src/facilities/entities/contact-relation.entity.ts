import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CONTACT_RELATION' })
export class ContactRelation extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  CNT_REL_ID: number;

  @Column({ length: 38 })
  CNT_ID: number;

  @Column({ length: 38 })
  PPL_ID: number;

  @Column({ type: 'varchar', length: 25 })
  RELATION_TYPE_CD: string;
}
