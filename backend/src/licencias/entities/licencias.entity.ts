import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Licencias {
    
  @PrimaryGeneratedColumn()
  lic_id: number;

  @Column()
  lic_emision: Date;

  @Column()
  lic_vencimiento: Date;

  @Column()
  lic_frente: string;

  @Column()
  lic_reverso: string;

  

}