"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getOrder } from "@/redux/slices/orderSlice";
import { Button, Loader } from "@/components";
import Image from "next/image";
import styles from "@/styles/userOrderDetailsPage.module.scss";

const {
  orderDetailsPage,
  container,
  serviceCard,
  serviceDetailsContainer,
  serviceDetailsCard,
  cardBoxsWrapper,
  cardBox,
} = styles;

const Page = ({ params }: any) => {
  const { order, loading } = useAppSelector((state: any) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [dispatch, params.id]);

  const {
    projectName,
    service,
    orderDetails,
    createdAt,
    status,
    totalPrice,
    extras,
  }: any = order || {};

  if (loading) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={orderDetailsPage}>
      <div className={`${container} dContainer`}>
        <header>
          <div>
            <h2>{projectName || service?.name}</h2>
            <p>{createdAt}</p>
          </div>

          <Button title={status} btnType="type2" />
        </header>

        <section className={serviceCard}>
          <Image
            src={`/upload/services/${service?.thumbnail}`}
            width={300}
            height={250}
            alt={service?.name}
          />

          <div>
            <h4 className="p-color">{service?.name}</h4>
            <h3>{service?.title}</h3>
            <h4>Total Price: US${totalPrice}</h4>
            <p>Status: {status}</p>
          </div>
        </section>

        <section className={serviceDetailsContainer}>
          <h3>Order Details</h3>
          <hr />

          <div>
            <p>
              <strong>TYPE:</strong> {orderDetails?.type}
            </p>
            <p>
              <b>NAME:</b> {orderDetails?.name}
            </p>
            <p>
              <b>ABOUT:</b> {orderDetails?.about}
            </p>
            <p>
              <b>REVISIONS:</b> max {orderDetails?.revisions} revisions
            </p>
            <p>
              <b>DELIVERY:</b> {orderDetails?.delivery} Days
            </p>
          </div>

          <details className={serviceDetailsCard}>
            <summary>Look at Extras</summary>

            <div className={cardBoxsWrapper}>
              {extras?.map((ex: any, idx: number) => (
                <div key={idx} className={cardBox}>
                  <h4>{ex?.name}</h4>
                  <p>PRICE: US${ex?.price}</p>
                  <p className="p-color">ACTIVE</p>
                </div>
              ))}
            </div>
          </details>
        </section>
      </div>
    </div>
  );
};

export default Page;
