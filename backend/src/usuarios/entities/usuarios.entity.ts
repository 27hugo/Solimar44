import { Licencias } from 'src/licencias/entities/licencias.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

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
  usr_correo: string;

  @Column()
  usr_telefono: number;

  @Column()
  usr_estado: string;

  @Column()
  usr_foto: string;

  @Column()
  usr_cdi_frente: string;

  @Column()
  usr_cdi_reverso: string;

  @Column({ nullable: true })
  lic_id: number;

  @ManyToOne( type => Licencias, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'lic_id', referencedColumnName: 'lic_id' })
  licencias: Licencias

}