import { Licencias } from 'src/licencias/entities/licencias.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  usr_id: number;

  @Column({ unique: true })
  usr_rut: string;

  @Column()
  usr_nombre: string;

  @Column()
  usr_apellido: string;

  @Column()
  usr_fnacimiento: Date;

  @Column()
  usr_direccion: string;

  @Column({ unique: true, nullable: true })
  usr_correo: string;

  @Column({ nullable: true })
  usr_telefono: number;

  @Column()
  usr_estado: string;

  @Column({ unique: true, nullable: true })
  usr_foto: string;

  @Column({ unique: true, nullable: true })
  usr_cdi_frente: string;

  @Column({ unique: true, nullable: true })
  usr_cdi_reverso: string;

  @Column({ nullable: true, unique: true })
  lic_id: number;

  @ManyToOne( type => Licencias, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'lic_id', referencedColumnName: 'lic_id' })
  licencias: Licencias

}