"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

import styles from "@/styles/profilePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Loader, Modal, Tooltip } from "@/components";
import { getAllOrders } from "@/redux/slices/orderSlice";
import { useSocket } from "@/providers/socketIo";
import toast from "react-hot-toast";
import { IoIosRefresh } from "react-icons/io";
import ActiveChats from "./ActiveChats";

const {
  profile,
  header,
  left,
  right,
  activeChatsSection,
  activeOrdersSection,
  activeOrdersContainer,
  orderBox,
} = styles;

const Page = () => {
  const { logggedInUser: { _id: userId = "", name = "", email = "", role = "user" } }: any = useAppSelector((state) => state.authUser);
  const { loading: ordersLoading, orders }: any = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();

  const { socket, isConnected } = useSocket();
  const [isOpenDialong, setIsOpenDialong] = useState<boolean>(false);
  const [refreshOrders, setRefreshOrders] = useState<boolean>(false);


  const breakPoints = {
    300: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [userId, refreshOrders, dispatch]);

  const AddNewChat = (
    orderId: string,
    orderName: string,
    orderImg: string = '',
    userId: string,
    adminId: string
  ) => {
    socket.emit(
      "add_conversation",
      { orderName, orderImg, to: adminId, from: userId, orderId: orderId },
      ({ exist, chat }: any) => {
        exist
          ? toast.success(
              `Chat already exist for ${chat.name} and id: ${chat._id}`
            )
          : toast.success(
              `Chat has been create for ${name} and id: ${orderId}`
            );
      }
    );

    isOpenDialong && setIsOpenDialong(false);
  };

  return (
    <div className={profile}>
      {/* Header ------------------ */}
      <header className={header}>
        <div className={left}>
          <h2>WebTimes Member</h2>
          <h3>Welcome! {name || "user"}</h3>
          <p>{email || "email****@gmail.com"}</p>
          {role === "admin" && <p><Link className="link" href={`/cms?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`}>Go to Admin Portel</Link></p>}
        </div>

        <div className={right}>
          <Link href="/user/edit-profile">
            <Button title="Edit profile" icon={<FiEdit2 size={20} />} />
          </Link>
          <Link href="/user/user-settings">
            <Button
              title="Help & Settings"
              icon={<LuSettings size={20} />}
              btnType="type2"
            />
          </Link>
        </div>
      </header>

      {/* Active Chats ------------------ */}
      <div className={activeChatsSection}>
        <ActiveChats socket={socket} isConnected={isConnected} userId={userId} dispatch={dispatch} setIsOpenDialong={setIsOpenDialong} />
      </div>

      {/* Orders going on -------------- */}
      <div className={activeOrdersSection}>
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <Tooltip text={"Refresh Orders"} style={{ left: 50 }}>
            <IoIosRefresh
              size={20}
              color="var(--black-color)"
              style={{ marginRight: 20, cursor: "pointer", transition: "all 0.2s ease" }}
              onClick={() => setRefreshOrders(!refreshOrders)}
              onMouseDownCapture={(e:any) => e.target.style.transform = "rotate(90deg)"}
              onMouseUpCapture={(e:any) => e.target.style.transform = "rotate(0deg)"}
            />
          </Tooltip>
          <h3> On going Orders.</h3>
        </div>

        {ordersLoading ? (
          <Loader />
        ) : orders.length ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode]}
            breakpoints={breakPoints}
            className={activeOrdersContainer}>
            {orders?.map(
              ({
                _id,
                projectName,
                service,
                user,
                orderDetails,
                totalPrice,
                createdAt,
              }: any) => (
                <SwiperSlide className={orderBox} key={String(_id)}>
                  <Link href={`/user/orders/${_id}`}>
                    <Image
                      src={service.image ? `/upload/services/${service?.image}` : '/project-demo.jpg'}
                      sizes="250px"
                      fill
                      alt={service.name}
                    />
                  </Link>

                  <article>
                    <Link href={`/user/orders/${_id}`}>
                      <header className="flex">
                        <Image
                          src={user.avatar}
                          width={50}
                          height={50}
                          alt={name}
                        />
                        <h4>{projectName || user.name}</h4>
                      </header>
                    </Link>

                    <div className="flex">
                      <p>TYPE: {orderDetails.type}</p>
                      <p>{orderDetails.name}</p>
                    </div>
                    <div className="flex">
                      <p>PRICE: {totalPrice}</p>
                      <p>{orderDetails.delivery} days</p>
                    </div>
                    <p>Ordered: {createdAt}</p>
                  </article>
                </SwiperSlide>
              )
            )}
          </Swiper>
        ) : (
          <p>No current order available</p>
        )}
      </div>

      {isOpenDialong && (
        <Modal
          title={"Select a order you want to talk"}
          isOpen={isOpenDialong}
          onClose={() => setIsOpenDialong(false)}>
          <div>
            {orders.length ? (
              orders.map(({ _id, projectName, service }: any) => (
                <div
                  key={_id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid var(--lightGray-color)",
                    borderRadius: 8,
                    padding: "10px",
                    margin: "10px 0",
                  }}>
                  <div>
                    <h4>{projectName}</h4>
                    <h6>{service.name}</h6>
                  </div>
                  <Button
                    title="Select"
                    btnType="type3"
                    onClick={() =>
                      AddNewChat(
                        _id,
                        projectName,
                        service.image,
                        userId,
                        `${process.env.NEXT_PUBLIC_ADMIN_ID}`
                      )
                    }
                  />
                </div>
              ))
            ) : (
              <>
                <p>
                  No active order is present to start the conversation about
                  related projects
                </p>
                <p>Please Contact us to start project with us.</p>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
