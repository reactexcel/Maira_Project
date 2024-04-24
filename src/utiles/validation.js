import * as yup from "yup";

export const loginValidateSchema = yup.object({
  emailAddress: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidateSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  lastName: yup
    .string()
    .min(3, "LastName must be atleast 3 characters")
    .optional("LastName is Required"),
    emailAddress: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirm_Password: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match")
    .required("Confirm Password is required"),
});

export const resetValidateSchema = yup.object({
  emailAddress: yup.string().email("Email must valid").required("Email is Required"),
});

export const resetPasswordValidateSchema = yup.object({
  newPassword: yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required"),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref("newPassword")], "Password doesn't match")
  .required("Confirm Password is required"),
});

export const RegisterDetails = [
  { label: "First Name", id: "firstName", type: "text" },
  { label: "Last Name", id: "lastName", type: "text" },
  { label: "Email", id: "emailAddress", type: "email" },
  { label: "Password", id: "password", type: "password" },
  { label: "Confirm Password", id: "confirm_Password", type: "password" },
];
export const LoginDetails = [
  { label: "Email", id: "emailAddress", type: "text" },
  { label: "Password", id: "password", type: "password" },
];

export const ResetDetails = [
  { label: "Email", id: "emailAddress", type: "text" },
];

export const ResetPasswordDetails = [
  { label: "Password", id: "newPassword", type: "password" },
  { label: "Confirm Password", id: "confirmPassword", type: "password" },
];