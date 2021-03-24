import { Licencias } from 'src/licencias/entities/licencias.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuarios {
  
  @PrimaryColumn({ unique: true })
  usr_rut: string;

  @Column()
  usr_nombre: string;

  @Column()
  usr_apellido: string;

  @Column()
  usr_fnacimiento: Date;

  @Column({ nullable: true })
  usr_direccion: string;

  @Column({ unique: true, nullable: true })
  usr_correo: string;

  @Column()
  usr_contrasena: string;

  @Column()
  usr_telefono: string;

  @Column({ default: 'Activo' })
  usr_estado: string;

  @Column({ unique: true, nullable: true })
  usr_foto: string;

  @Column({ unique: true })
  usr_cdi_frente: string;

  @Column({ unique: true })
  usr_cdi_reverso: string;

  @Column({ nullable: true, unique: true })
  lic_id: number;

  @Column({ nullable: true })
  rol_id: number;

  @ManyToOne( type => Licencias, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'lic_id', referencedColumnName: 'lic_id' })
  licencias: Licencias

  @ManyToOne( type => Roles, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'rol_id', referencedColumnName: 'rol_id' })
  roles: Roles


}