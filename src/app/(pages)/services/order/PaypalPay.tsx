"use client";

import React from "react";
import styles from "@/styles/orderPage.module.scss";

const { paypalPaySection } = styles;

const PaypalPay = ({ order, openPayment, setOpenPayment }: any) => {
  return (
    <div className={paypalPaySection}>
      <header>
        <label htmlFor="paypalPay">
          <input
            type="radio"
            id="paypalPay"
            name="payment"
            value="paypalPay"
            checked={openPayment === "paypalPay"}
            onChange={(e: any) => setOpenPayment(e.target.value)}
          />

          <span>Pay with PayPal</span>
        </label>
      </header>

      {openPayment === "paypalPay" ? (
        <form>
          <input type="text" value="Pay here" />
        </form>
      ) : null}
    </div>
  );
};

export default PaypalPay;
