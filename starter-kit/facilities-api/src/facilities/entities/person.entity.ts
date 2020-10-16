import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'PERSON' })
@Unique('UQ_PERSON_LOGIN', ['LOGIN'])
export class Person extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  PPL_ID: number;

  @Column({ type: 'varchar', length: 7 })
  PERSON_TYPE_CD: string;

  @Column({ type: 'varchar', length: 25 })
  LAST_NAME: string;

  @Column({ type: 'varchar', length: 25 })
  FIRST_NAME: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  MIDDLE_INITIAL: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  SUFFIX: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  JOB_TITLE: string;

  @Column({ length: 38, nullable: true })
  COMPANY_ID: number;

  @Column({ length: 38, nullable: true })
  AGENCY_ID: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ADDRESS1: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ADDRESS2: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  CITY: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  STATE_CD: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  ZIP_CODE: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  COUNTRY_CD: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  PROVINCE: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  PHONE_NUMBER: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  EXTENSION: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  FAX_NUMBER: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  CELL_PHONE_NUMBER: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  EMAIL_ADDRESS: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  LOGIN: string;
}
