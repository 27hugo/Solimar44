import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
    
  @PrimaryGeneratedColumn()
  rol_id: number;

  @Column()
  rol_nombre: string;

}