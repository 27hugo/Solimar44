import { Autos } from 'src/autos/entities/autos.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne( type => Autos, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'aut_id', referencedColumnName: 'aut_id' })
  autos: Autos

  @ManyToOne( type => Usuarios, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'usr_id', referencedColumnName: 'usr_id' })
  usuarios: Usuarios

}