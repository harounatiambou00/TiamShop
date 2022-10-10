export type ValuesState = {
  email: string;
  phoneNumber: string;
  recoverWithPhoneNumber: boolean;
};

export type ErrorTypes = {
  emailError: boolean;
  phoneNumberError: boolean;
};

export type PhoneNumberErrorType =
  | "isRequired"
  | "isInvalid"
  | "none"
  | "isIncorrect";

export const phoneNumberErrorMessages = {
  isInvalid: "Un numéro de téléphone doit contenir 8 chiffres.",
  isIncorrect: "Aucun compte n'est enregistré avec ce numéro de téléphone.",
  isRequired: "Vous devez saisir votre numéro de téléphone.",
};

export type EmailErrorType =
  | "isRequired"
  | "isInvalid"
  | "none"
  | "isIncorrect";

export const EmailErrorMessages = {
  isInvalid: "Vous devez founir une adresse email valide.",
  isIncorrect: "Aucun compte n'est enregistré avec cette adresse email.",
  isRequired: "Vous devez saisir votre adresse email",
};
