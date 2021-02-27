import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuariosAutos {
  @PrimaryGeneratedColumn()
  uas_id: number;

  @Column()
  usr_id: number;

  @Column()
  aut_id: number;

  @Column()
  uas_isduenio: number;

}