import { Roles } from 'src/roles/entities/roles.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolesUsuarios {

  @PrimaryGeneratedColumn()
  rus_id: number;

  @Column()
  usr_rut: string;

  @Column()
  rol_id: number;

  @Column()
  rus_permisos: string;

  @ManyToOne( type => Roles, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'rol_id', referencedColumnName: 'rol_id' })
  roles: Roles

  @ManyToOne( type => Usuarios, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'usr_rut', referencedColumnName: 'usr_rut' })
  usuarios: Usuarios

}