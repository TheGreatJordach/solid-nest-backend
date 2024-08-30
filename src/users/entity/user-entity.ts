import { Column, PrimaryGeneratedColumn } from "typeorm";
import { DateRegistry } from "../../embedded/date-registry.embedded";

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;

  @Column(() => DateRegistry, { prefix: false })
  registry: DateRegistry;
}
