import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'divisions'})
export class Division {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:45, unique: true})
    name: string;

    @ManyToOne(() => Division, (division) => division.subDivisions, {
        nullable: true, onDelete: 'SET NULL'})
    upperDivision: Division;
    
    @OneToMany(() => Division, (division) => division.upperDivision)
    subDivisions: Division[];

    @Column('int')
    level: number;

    @Column('int')
    collaborators: number;

    @Column({ nullable: true })
    ambassadorName: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}