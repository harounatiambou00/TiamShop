export type Client = {
  userId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CompleteAddress: string;
  VerifiedAt?: Date | null;
  BirthDate: Date;
  NeighborhoodId: number | string;
};
