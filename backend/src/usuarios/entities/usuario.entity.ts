import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  usr_id: number;

  @Column()
  usr_rut: string;

  @Column()
  usr_nombre: string;

  @Column()
  usr_apellido: string;

  @Column()
  usr_fnacimiento: Date;

  @Column()
  usr_direccion: string;

  @Column()
  usr_estado: string;

  @Column()
  usr_foto: string;

  @Column()
  usr_cdi_frente: string;

  @Column()
  usr_cdi_reverso: string;

  @Column()
  usr_lic_frente: string;

  @Column()
  usr_lic_reverso: string;

}