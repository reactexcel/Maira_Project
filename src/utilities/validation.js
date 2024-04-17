import * as yup from "yup";

export const loginValidateSchema = yup.object({
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidateSchema = yup.object({
  firstname: yup
    .string()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  lastname: yup
    .string()
    .min(3, "LastName must be atleast 3 characters")
    .required("LastName is Required"),
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterDetails = [
    { label: "FirstName", id: "firstname", type: "text" },
    { label: "LastName", id: "lastname", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Password", id: "password", type: "password" },
  ];
  export const LoginDetails = [
    { label: "Email", id: "email", type: "text" },
    { label: "Password", id: "password", type: "password" },
  ];