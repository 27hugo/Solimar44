import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Autos {
    
  @PrimaryGeneratedColumn()
  aut_id: number;

  @Column()
  aut_patente: string;

  @Column()
  aut_anio: string;

  @Column()
  aut_marca: string;

  @Column()
  aut_observacion: string;

}