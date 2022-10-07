export interface State {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  birthDate: Date | null;
  neighborhood: number | string;
  completeAddress: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}
