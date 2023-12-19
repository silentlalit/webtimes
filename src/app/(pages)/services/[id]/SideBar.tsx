"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "@/styles/servicePage.module.scss";
import { LiaClockSolid } from "react-icons/lia";
import { MdLoop } from "react-icons/md";
import { Button, SwitchInput } from "@/components";
import { useRouter } from "next/navigation";

const { sidebarContainer, sideBar, orderDetails } = styles;

const extras = [
  {
    name: "Extra-fast 2-day delivery",
    price: 80,
  },
  {
    name: "Premium images and content",
    price: 50,
  },
];

const SideBar = ({ service, searchParams, setIsOpenSidebar, style }: any) => {
  const { push } = useRouter();
  const { type, name, price, about, revisions, delivery } =
    service?.priceList[searchParams.pricingIdx || 0] || "";
  const [order, setOrder] = useState<any>({
    serviceId: service?._id,
    service: {
      name: service?.name,
      title: service?.title,
      thumbnail: service?.thumbnail,
    },
    orderDetails: service?.priceList[searchParams.pricingIdx],
    totalPrice: price,
    extras: [],
  });

  const orderHandler = () => {
    localStorage.setItem("latestOrder", JSON.stringify(order));
    push(
      `services/order?id=${service?._id}&pricingIdx=${
        searchParams.pricingIdx || 0
      }`
    );
  };

  return (
    <div className={sidebarContainer}>
      <div className={sideBar} style={style}>
        <header>
          <h4>Order Options</h4>

          <AiOutlineClose size={30} onClick={() => setIsOpenSidebar(false)} />
        </header>

        <div className={orderDetails}>
          <article>
            <div className="flex">
              <h4>{name}</h4>
              <h4>US${price}</h4>
            </div>

            <p>
              <b>{type} :</b> {about}
            </p>

            <div className="flex">
              <p className="flex">
                <LiaClockSolid size={25} />{" "}
                <span style={{ fontWeight: "bold" }}>
                  {delivery} Days Delivery
                </span>
              </p>
              <p className="flex">
                <MdLoop size={25} />{" "}
                <span style={{ fontWeight: "bold" }}>
                  {revisions} Revisions
                </span>
              </p>
            </div>
          </article>

          <h4 style={{ margin: "15px 0" }}>Upgrade your order with extras</h4>

          {extras.map((ex, idx) => (
            <article key={idx}>
              <div className="flex">
                <div>
                  <h4>{ex.name}</h4>
                  <p>US${ex.price}</p>
                </div>

                <SwitchInput
                  onChange={(e: any) =>
                    e.target.checked
                      ? setOrder((prev: any) => ({
                          ...prev,
                          totalPrice: prev.totalPrice + ex.price,
                          extras: [...prev.extras, ex],
                        }))
                      : setOrder((prev: any) => ({
                          ...prev,
                          totalPrice: prev.totalPrice - ex.price,
                          extras: prev.extras.filter(
                            (px: any) => px.name !== ex.name
                          ),
                        }))
                  }
                />
              </div>
            </article>
          ))}
        </div>

        <footer>
          <Button
            style={{ width: "100%", fontWeight: 600 }}
            title={`Continue US$${order?.totalPrice}`}
            btnType="type2"
            onClick={orderHandler}
          />
        </footer>
      </div>
    </div>
  );
};

export default SideBar;
