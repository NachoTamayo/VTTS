import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  user_name: string().required("Email is required"),
  password: string().required("Password is required"),
});
