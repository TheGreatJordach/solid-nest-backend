import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateRegistry } from "../../embedded/date-registry.embedded";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column(() => DateRegistry, { prefix: false })
  registry: DateRegistry;
}
