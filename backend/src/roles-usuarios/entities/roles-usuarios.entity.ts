import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolesUsuarios {
    
  @PrimaryGeneratedColumn()
  rus_id: number;

  @Column()
  usr_id: number;

  @Column()
  rol_id: number;

}