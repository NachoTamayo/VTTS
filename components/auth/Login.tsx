"use client";

import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
//Cambio de Capitalize a PascalCase
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const initialValues: LoginFormType = {
    user_name: "ITL",
    password: "Nacho369852",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: values.user_name, password: values.password }),
      });

      if (res.ok) {
        await res.json().then((data) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/");
        });
      } else {
        const data = await res.json();
        setError(data.message);
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>

      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/4 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Username"
                type="text"
                value={values.user_name}
                isInvalid={!!errors.user_name && !!touched.user_name}
                errorMessage={errors.user_name}
                onChange={handleChange("user_name")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button onPress={() => handleSubmit()} variant="flat" color="primary">
              {!loading ? "Login" : <Spinner />}
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
