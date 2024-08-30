import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DateRegistry {
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
