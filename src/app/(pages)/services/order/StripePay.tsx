"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import styles from "@/styles/orderPage.module.scss";
import toast from "react-hot-toast";
import { Button, Input, Tooltip } from "@/components";
import { instance } from "@/providers/axios";
import { BsQuestionCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

const { stripePaySection, inputBox, inputElement } = styles;

const StripePay = ({ order, openPayment, setOpenPayment }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { push } = useRouter();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState<string>("");

  const CARD_OPTIONS = {
    style: {
      base: {
        iconStyle: "solid",
        iconColor: "#ff5e69",
        fontWeight: 600,
        color: "#030303",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#e3e1e1",
        },
        padding: "10px",
        innerHeight: 50,
        border: "1px solid #e3e1e1",
      },
      invalid: {
        iconColor: "#c41604",
        color: "#c41604",
      },
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) return;

      const { token, error: tokenError } = await stripe.createToken(
        cardElement
      );

      if (tokenError) {
        toast.error(tokenError.message || "Failed");
        throw new Error(tokenError.message);
      }

      // Send the token to your server for payment processing
      const {
        data: { client_secret },
      } = await instance.post("/payment/process", {
        token: token.id,
        amount: Math.round(order.totalPrice * 100 * 80),
        description: order.service.title,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: order.user.address.fullName,
              address: {
                line1: order.user.address.address,
                country: "IN",
                state: order.user.address.state,
                city: order.user.address.city,
                postal_code: order.user.address.zipCode,
              },
            },
          },
        }
      );

      if (error) {
        console.log(error);
        toast.error(error.message || "");
        setPaymentError(error?.message || "");
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        order.projectName = projectName;
        order.paymentInfo = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          type: "Credit Card",
        };

        await instance.post(`/order/create-order`, order).then((res) => {
          toast.success("Order successful!");
          localStorage.setItem("latestOrder", JSON.stringify({}));
          push("/user/orders");
        });
      }
    } catch (error: any) {
      console.log(error);
      setPaymentError(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={stripePaySection}>
      <header>
        <label htmlFor="stripePay">
          <input
            type="radio"
            id="stripePay"
            name="payment"
            value="stripePay"
            checked={openPayment === "stripePay"}
            onChange={(e: any) => setOpenPayment(e.target.value)}
          />

          <span>Credit & Debit Cards</span>
        </label>
      </header>

      {openPayment === "stripePay" ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div className={inputBox}>
              <Input
                value={projectName}
                label="Project Name"
                placeholder="Enter project name"
                onChange={(e: any) => setProjectName(e.target.value)}
                required
              />
            </div>

            <div className={inputBox}>
              <label>Card Number</label>
              <CardNumberElement
                options={CARD_OPTIONS}
                className={inputElement}
              />
            </div>

            <div
              className="flex"
              style={{
                justifyContent: "space-between",
                gap: 30,
                marginTop: 15,
              }}>
              <div className={inputBox}>
                <label>Card Expiry Date</label>
                <CardExpiryElement
                  options={CARD_OPTIONS}
                  className={inputElement}
                />
              </div>

              <div className={inputBox}>
                <label htmlFor="">
                  <label>
                    Security code
                    <Tooltip text="The three or four digit code on the back or front of your card.">
                      <BsQuestionCircle />
                    </Tooltip>
                  </label>
                </label>
                <CardCvcElement
                  options={CARD_OPTIONS}
                  className={inputElement}
                />
              </div>
            </div>

            {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
          </div>

          <Button
            title="Pay"
            btnType="type2"
            type="submit"
            disabled={!stripe || loading}
            loading={loading}
            wrapperStyle={{ marginTop: 20 }}
          />
        </form>
      ) : null}
    </div>
  );
};

export default StripePay;
