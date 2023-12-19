import React from "react";
import styles from "@/styles/pricingPage.module.scss";

const { main, pricingHeader, container, pricing } = styles;

function Page() {
  return (
    <div className={main}>
      <div className={pricingHeader}>
        <div className={`${container} dContainer`}>
          <h4 className="topTag">PRICING</h4>
          <h1>A platform that grows with you.</h1>
          <p>
            Build unique customer interactions across mobile and web through
            channels like email, push, in-app, and SMS. Get started for free, no
            credit card required.
          </p>
        </div>
      </div>

      <section className={pricing}>
        <div className={`${container} dContainer`}></div>
      </section>
    </div>
  );
}

export default Page;
