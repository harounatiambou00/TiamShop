export type Deliverer = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  completeAddress: string;
  verifiedAt?: Date | null;
  birthDate: Date | null;
  neighborhoodId: number | string;
};
