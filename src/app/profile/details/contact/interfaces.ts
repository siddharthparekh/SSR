import { Access } from '../../interfaces/profile-mode';

export interface ContactData {
  address: string;
  phone: string|null;
  email: string|null;
  access: Access;
}
