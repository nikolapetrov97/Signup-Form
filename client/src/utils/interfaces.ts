export interface ISignupFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  checkbox?: boolean;
}

export interface ITableAccountRow {
  name: string;
  email: string;
  date: Date;
}
