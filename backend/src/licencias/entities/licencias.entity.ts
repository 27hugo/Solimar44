import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Licencias {
    
  @PrimaryGeneratedColumn()
  lic_id: number;

  @Column()
  usr_id: number;

  @Column()
  lic_tipo: string;

  @Column()
  lic_emision: Date;

  @Column()
  lic_vencimiento: Date;

  @ManyToOne( type => Usuarios, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'usr_id', referencedColumnName: 'usr_id' })
  usuarios: Usuarios

}