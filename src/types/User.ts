import type { Role } from "./Role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  kraPin: string;
  role: Role;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}
