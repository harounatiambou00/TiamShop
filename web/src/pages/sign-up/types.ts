export interface FormGroupInputsTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  neighborhood: number | string;
  completeAddress: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export type PhoneNumberErrorType =
  | "isRequired"
  | "isInvalid"
  | "isAlreadyTaken"
  | "none";

export const phoneNumberErrorMessages = {
  isInvalid: "Un numéro de téléphone doit contenir 8 chiffres.",
  isAlreadyTaken: "Ce numéro est déja utilisé par un autre client.",
  isRequired: "Vous devez renseigner votre numéro de téléphone",
};

export type Errors = {
  emailError: boolean;
  phoneNumberError: boolean;
  passwordError: boolean;
  neighborhoodError: boolean;
};

export type EmailErrorType =
  | "isRequired"
  | "isInvalid"
  | "isAlreadyTaken"
  | "none";

export const EmailErrorMessages = {
  isInvalid: "Vous devez founir une adresse email valide.",
  isAlreadyTaken: "Cette adresse est déja utilisé par un autre client.",
  isRequired: "Vous devez renseigner votre adresse email",
};
