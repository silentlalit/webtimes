"use client";

import { useEffect } from "react";
import styles from "@/styles/userLoginSignup.module.scss";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// REXUX
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearErrorMsg, verifyUser } from "@/redux/slices/authSlice";
import Link from "next/link";

const { main, container } = styles;

const Page = ({ params }: any) => {
  const { push } = useRouter();
  const { token } = params;

  const dispatch = useAppDispatch();
  const { isAuthenticated, isError, msg } = useAppSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      const { payload } = await dispatch(verifyUser(token));

      if (payload.success) {
        push("/");
        toast.success(payload.message);
      } else {
        toast.error(payload.error);
      }
    };

    if (token?.length) verifyEmail(token);
  }, [token, dispatch, push]);

  useEffect(() => {
    if (isAuthenticated) push("/");
    else dispatch(clearErrorMsg());
  }, [isAuthenticated, dispatch, push]);

  return (
    <main className={main}>
      <div className={container}>
        {isError ? (
          <div style={{ textAlign: "center", maxWidth: "100%" }}>
            <h2>{msg}</h2>
            {msg === "User already exists" && (
              <Link href="/userAuth/login" className="link">
                <p>Go to Login</p>
              </Link>
            )}
          </div>
        ) : isAuthenticated ? (
          <div style={{ textAlign: "center" }}>
            <h2>Verification is Successful</h2>
            <p>Your account has been created.</p>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Verifying the email</h2>
            <p>Please wait for a while.</p>
          </div>
        )}

        {/* <br />
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 5 }}>
                    <span style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                    <span>Or Sign in with Google</span>
                    <span style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                </div>
                <br /> */}
      </div>
    </main>
  );
};

export default Page;
