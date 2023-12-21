import React from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import styles from "@/styles/orderPage.module.scss";
import { AiTwotoneUnlock } from "react-icons/ai";

const { rightSideContainer, pricingDetails, extrasWrapper } = styles;

const OrderDetailsCard = ({ order }: any) => {
  const { service, orderDetails, extras, totalPrice } = order;

  return (
    <div className={rightSideContainer}>
      <header>
        <Image
          src={`/upload/services/${service?.thumbnail}`}
          width={50}
          height={50}
          alt={`${service?.name}`}
        />
        <h4>{service?.title}</h4>
      </header>

      <div className={pricingDetails}>
        <div className="flex">
          <h5>{orderDetails?.name}</h5>
          <h5>US${orderDetails?.price}</h5>
        </div>

        <ul>
          <li className="flex">
            <span>
              <TiTick size={25} color="var(--black-color)" />
            </span>
            <span>{orderDetails?.type}</span>
          </li>
          <li className="flex">
            <span>
              <TiTick size={25} color="var(--black-color)" />
            </span>
            <span>{orderDetails?.about}</span>
          </li>
          <li className="flex">
            <span>
              <TiTick size={25} color="var(--black-color)" />
            </span>
            <span>{orderDetails?.revisions} revisions</span>
          </li>
          <li className="flex">
            <span>
              <TiTick size={25} color="var(--black-color)" />
            </span>
            <span>{orderDetails?.delivery} days delivery</span>
          </li>
        </ul>

        <ul className={extrasWrapper}>
          {extras?.map((ex: any, idx: number) => (
            <li className="flex" key={idx}>
              <div className="flex">
                <span>
                  <TiTick size={25} color="var(--black-color)" />
                </span>
                <span>{ex?.name}</span>
              </div>
              <h6>US${ex?.price}</h6>
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <div className="flex">
          <h6>You&apos;ll Pay</h6>
          <h6>US${totalPrice}</h6>
        </div>

        <div>
          <p>
            You will be charged US${totalPrice}. The order total is an
            estimation and does not include additional fees your bank may apply.
          </p>
          <p className="flex">
            <AiTwotoneUnlock />
            <span>SSL Secure Payment</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrderDetailsCard;
