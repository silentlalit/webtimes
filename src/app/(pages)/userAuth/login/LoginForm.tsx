"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Button, PasswordInput, TextInput } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearErrorMsg, login } from "@/redux/slices/authSlice";

/* schema */
const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Must contain at least 8 characters"),
  })
  .required();

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, isError, msg } = useAppSelector(
    (state: any) => state.authUser
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated) router.back();
    else dispatch(clearErrorMsg());
  }, [isAuthenticated, isDirty, dispatch, router]);

  const loginUser = async (data: any) => {
    try {
      const { payload }: any = await dispatch(login(data));
      toast.success(payload.message);
      router.back();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <TextInput
        control={control}
        placeholder="Email"
        name="email"
        type="email"
        error={errors.email}
      />

      <PasswordInput
        control={control}
        placeholder="Password"
        name="password"
        error={errors.password}
      />
      {isError && <p className="errorStyle">{msg}</p>}

      <Link href="/userAuth/forget-password">
        <p
          style={{
            color: "#0000EE",
            marginTop: 5,
            cursor: "pointer",
            textAlign: "right",
          }}>
          Forget Password
        </p>
      </Link>

      <Button
        type="submit"
        title="Login"
        wrapperStyle={{ marginTop: 15, width: "100%" }}
        style={{ width: "100%" }}
        loading={loading}
        disabled={loading}
      />

      <p>
        Don&apos;t have an account.
        <Link href="/userAuth/signup">
          <span style={{ color: "#0000EE" }}>Sign up</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
