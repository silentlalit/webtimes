"use client";

import React, { useEffect, useState } from "react";

import styles from "@/styles/orderPage.module.scss";
import StripePay from "./StripePay";
import PaypalPay from "./PaypalPay";
import OrderDetailsCard from "./OrderDetailsCard";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import InvoiceDetailsCard from "./InvoiceDetailsCard";

const {
  orderPgae,
  container,
  leftside,
  paymentSection,
  paymentContainer,
  rightSide,
} = styles;

const Page = () => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUB_KEY}`);
  const { push } = useRouter();
  const { logggedInUser } = useAppSelector((state) => state.authUser);
  const [order, setOrder] = useState<any>({});
  const [openPayment, setOpenPayment] = useState<string>("");

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder") || "{}");

    if (!latestOrder.serviceId) {
      console.log("push to services");
      push("/services");
    }

    setOrder({
      ...latestOrder,
      user: logggedInUser,
      userId: logggedInUser?._id,
    });
  }, [logggedInUser, push]);

  return (
    <div className={orderPgae}>
      <div className={`${container} dContainer`}>
        <div className={leftside}>
          <InvoiceDetailsCard order={order} user={logggedInUser} />

          <article className={paymentSection}>
            <header>
              <h4>Payment Options</h4>
            </header>

            <div className={paymentContainer}>
              <Elements stripe={stripePromise}>
                <StripePay
                  order={order}
                  openPayment={openPayment}
                  setOpenPayment={setOpenPayment}
                />
              </Elements>

              <PaypalPay
                order={order}
                openPayment={openPayment}
                setOpenPayment={setOpenPayment}
              />
            </div>
          </article>
        </div>

        <div className={rightSide}>
          <OrderDetailsCard order={order} />
        </div>
      </div>
    </div>
  );
};

export default Page;
