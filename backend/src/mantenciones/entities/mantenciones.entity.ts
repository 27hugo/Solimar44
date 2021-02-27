import { Autos } from 'src/autos/entities/autos.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Mantenciones {
    
  @PrimaryGeneratedColumn()
  man_id: number;

  @Column()
  man_fecha: Date;

  @Column()
  man_tipo: string;

  @Column()
  man_lugar: string;

  @Column()
  man_vencimiento: Date;

  @Column()
  aut_id: number;

  @ManyToOne( type => Autos, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: 'aut_id', referencedColumnName: 'aut_id' })
  autos: Autos

}