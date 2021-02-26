import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mantenciones {
    
  @PrimaryGeneratedColumn()
  man_id: number;

  @Column()
  man_fecha: Date;

  @Column()
  man_tipo: string;

  @Column()
  man_lugar: string;

  @Column()
  man_vencimiento: Date;

  @Column()
  aut_id: number;

}