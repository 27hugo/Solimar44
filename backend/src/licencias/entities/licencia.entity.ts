import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Licencia {
    
  @PrimaryGeneratedColumn()
  lic_id: number;

  @Column()
  usr_id: number;

  @Column()
  lic_tipo: string;

  @Column()
  lic_emision: Date;

  @Column()
  lic_vencimiento: Date;
}