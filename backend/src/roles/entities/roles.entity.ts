import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
    
  @PrimaryGeneratedColumn()
  rol_id: number;

  @Column({ unique: true })
  rol_nombre: string;

}