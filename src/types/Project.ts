import type { User } from "./User";

export interface Project {
  id: number;
  name: string;
  description?: string;
  location?: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdBy: User;
  assignedUsers: User[];
  createdAt: Date;
  updatedAt: Date;
}
