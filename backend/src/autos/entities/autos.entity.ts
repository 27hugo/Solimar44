import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Autos {
    
  @PrimaryGeneratedColumn()
  aut_id: number;

  @Column({ unique: true })
  aut_patente: string;

  @Column()
  aut_anio: string;

  @Column()
  aut_marca: string;

  @Column({ nullable: true })
  aut_observacion: string;

}