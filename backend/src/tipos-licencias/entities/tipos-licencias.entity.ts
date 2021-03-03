import { Licencias } from 'src/licencias/entities/licencias.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class TiposLicencias {
    
  @PrimaryGeneratedColumn()
  tipo_id: number;

  @Column()
  lic_id: number;

  @Column()
  lic_nombre: string;

  @ManyToOne( type => Licencias, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'lic_id', referencedColumnName: 'lic_id' })
  licencias: Licencias

}