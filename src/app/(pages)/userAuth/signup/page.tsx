"use client";

import React, { useEffect } from "react";
import styles from "@/styles/userLoginSignup.module.scss";
import { Button, PasswordInput, TextInput } from "@/components";
import { UserSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearErrorMsg, signUp } from "@/redux/slices/authSlice";

const { main, container } = styles;

const Page = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, isError, msg } = useAppSelector(
    (state) => state.authUser
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(UserSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const signupUser = async (data: any) => {
    const { payload } = await dispatch(signUp(data));

    if (payload.success) {
      push("/");
      toast.success(payload.message);
    } else {
      toast.error(payload.error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) push("/");
    else dispatch(clearErrorMsg());
  }, [isAuthenticated, dispatch, push]);

  return (
    <main className={main}>
      <div className={container}>
        <div style={{ textAlign: "center" }}>
          <h1>
            Sign up to{" "}
            <Link href="/" className="link">
              Webtimes
            </Link>
          </h1>
          <p>Welcome Back! Please enter your signup details</p>
        </div>

        <br />

        <TextInput
          control={control}
          name="name"
          placeholder="Name"
          error={errors.name}
        />

        <TextInput
          control={control}
          name="username"
          placeholder="Username"
          error={errors.username}
        />

        <TextInput
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email}
          type="email"
        />

        <PasswordInput
          control={control}
          name="password"
          placeholder="Password"
          error={errors.password}
        />

        <PasswordInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />
        {isError && <p className="errorStyle">{msg}</p>}

        <Button
          type="submit"
          title="Signup"
          wrapperStyle={{ marginTop: 25 }}
          style={{ width: "100%" }}
          onClick={handleSubmit(signupUser)}
          loading={loading}
          disabled={loading}
        />

        <p>
          Already have an account?{" "}
          <Link href="/userAuth/login">
            <span style={{ color: "#0000EE" }}>Sign In</span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
