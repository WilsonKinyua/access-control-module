import type { User } from "./User";

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
}
