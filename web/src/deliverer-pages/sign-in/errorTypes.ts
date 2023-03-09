export type ErrorTypes = {
  emailError: boolean;
  phoneNumberError: boolean;
  passwordError: boolean;
};

export type PhoneNumberErrorType =
  | "isRequired"
  | "isInvalid"
  | "none"
  | "isIncorrect";

export const phoneNumberErrorMessages = {
  isInvalid: "Un numéro de téléphone doit contenir 8 chiffres.",
  isIncorrect:
    "Aucun compte livreur n'est enregistré avec ce numéro de téléphone.",
  isRequired: "Vous devez saisir votre numéro de téléphone.",
};

export type EmailErrorType =
  | "isRequired"
  | "isInvalid"
  | "none"
  | "isIncorrect";

export const EmailErrorMessages = {
  isInvalid: "Vous devez founir une adresse email valide.",
  isIncorrect:
    "Aucun compte livreur n'est enregistré avec cette adresse email.",
  isRequired: "Vous devez saisir votre adresse email",
};

export type PasswordErrorType =
  | "isRequired"
  | "isInvalid"
  | "none"
  | "isIncorrect";

export const PasswordErrorMessages = {
  isInvalid: "Un mot de passes doit contenir au moins 8 caractères.",
  isIncorrect: "Mot de passe incorrect",
  isRequired: "Vous dever saisir votre mot de passe.",
};
