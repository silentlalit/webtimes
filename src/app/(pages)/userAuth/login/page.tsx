"use client";

import { useEffect } from "react";
import { Button, PasswordInput, TextInput } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearErrorMsg, login } from "@/redux/slices/authSlice";
import styles from "@/styles/userLoginSignup.module.scss";

// import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const { main, container } = styles;

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

const Page = () => {
  const { push } = useRouter();
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
    if (isAuthenticated) push("/");
    else dispatch(clearErrorMsg());
  }, [isAuthenticated, isDirty, dispatch, push]);

  const loginUser = async (data: any) => {
    const { payload }: any = await dispatch(login(data));

    if (payload.success) {
      toast.success(payload.message);
      push("/");
    } else toast.error(payload.error);
  };

  return (
    <main className={main}>
      <div className={container}>
        <div style={{ textAlign: "center" }}>
          <h1>
            Sign in to <Link href="/">Webtimes</Link>
          </h1>
          <p>Welcome Back! Please enter your login details</p>
        </div>

        <br />
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

        <br />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 5,
          }}>
          <span style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          <span>Or Sign in with Google</span>
          <span style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
        </div>
        <br />

        {/* <div>
                    {session?.user ? (
                        <Button
                            title="Log Out"
                            style={{ backgroundImage: 'unset', color: 'var(--black-color)', width: '100%' }}
                            onClick={signOut}
                        />
                    ) : (
                        <>
                            {providers && Object.values(providers).map((provider: any) => (
                                <Button
                                    title="Sign In with Google"
                                    loading={false}
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    style={{ width: '100%' }}
                                />
                            ))}
                        </>
                    )}
                </div> */}
      </div>
    </main>
  );
};

export default Page;
