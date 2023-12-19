"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

import styles from "@/styles/profilePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Loader, Modal, ProfileIcon, Tooltip } from "@/components";
import { getAllOrders } from "@/redux/slices/orderSlice";
import { useSocket } from "@/providers/socketIo";
import { FetchDirectConversations } from "@/redux/slices/conversationSlice";
import toast from "react-hot-toast";
import { IoIosRefresh } from "react-icons/io";

const {
  profile,
  header,
  left,
  right,
  activeChatsSection,
  activeChatsContainer,
  activeOrdersSection,
  activeOrdersContainer,
  orderBox,
} = styles;

const Page = () => {
  const { logggedInUser }: any = useAppSelector((state) => state.authUser);
  const { loading: ordersLoading, orders }: any = useAppSelector(
    (state) => state.order
  );
  const {
    direct_chat: { conversations },
  } = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();

  const { _id: userId = "", name = "", email = "" } = logggedInUser || "";
  const { socket, isConnected } = useSocket();
  const [isOpenDialong, setIsOpenDialong] = useState(false);
  const [refreshChats, setRefreshChats] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false);

  const breakPoints = {
    300: {
      slidesPerView: 1,
      spaceBetween: 0,
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
      spaceBetween: 20,
    },
  };

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, [userId, refreshOrders, dispatch]);

  useEffect(() => {
    console.log("{ user_id }", userId);
    userId &&
      socket?.emit(
        "get_conversations_list",
        { user_id: userId },
        (data: any) => {
          dispatch(FetchDirectConversations({ conversations: data }));
        }
      );
  }, [socket, userId, refreshChats, dispatch]);

  const AddNewChat = (
    orderId: string,
    name: string,
    userId: string,
    adminId: string
  ) => {
    socket.emit(
      "add_conversation",
      { name, to: adminId, from: userId, orderId: orderId },
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
        </div>

        <div className={right}>
          <Link href="/user/edit-profile">
            <Button title="Edit profile" icon={<FiEdit2 size={20} />} />
          </Link>
          <Button
            title="Help & Settings"
            icon={<LuSettings size={20} />}
            btnType="type2"
          />
        </div>
      </header>

      {/* Active Chats ------------------ */}
      <div className={activeChatsSection}>
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <Tooltip text={"Refresh Chats"} style={{ left: 50 }}>
            <IoIosRefresh
              size={20}
              color="var(--black-color)"
              style={{ marginRight: 20, cursor: "pointer" }}
              onClick={() => setRefreshChats(!refreshChats)}
            />
          </Tooltip>
          <h3>Active Chats about orders</h3>
        </div>

        <div className={activeChatsContainer}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "Var(--exLightGray-color)",
              border: "1px solid var(--secondary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setIsOpenDialong(true)}>
            <GoPlus size={30} color="var(--white-color)" />
          </div>

          {isConnected ? (
            conversations?.map((conv: any) => (
              <Link
                key={conv.id}
                href={{
                  pathname: "/user/chats",
                  query: { room_id: conv.id },
                }}>
                <div key={conv.id} style={{ cursor: "pointer" }}>
                  <ProfileIcon name={conv.chat_name} img={conv.img} />
                </div>
              </Link>
            ))
          ) : (
            <p>Please wait, connecting....</p>
          )}
        </div>
      </div>

      {/* Orders going on -------------- */}
      <div className={activeOrdersSection}>
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <Tooltip text={"Refresh Orders"} style={{ left: 50 }}>
            <IoIosRefresh
              size={20}
              color="var(--black-color)"
              style={{ marginRight: 20, cursor: "pointer" }}
              onClick={() => setRefreshOrders(!refreshOrders)}
            />
          </Tooltip>
          <h3> On going Orders.</h3>
        </div>

        {ordersLoading ? (
          <Loader />
        ) : orders.length ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
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
                      src={`/upload/services/${service?.thumbnail}`}
                      sizes="250px"
                      fill
                      alt={service.name}
                    />
                  </Link>

                  <Link href={`/user/orders/${_id}`}>
                    <header>
                      <Image
                        src={user.avatar}
                        width={50}
                        height={50}
                        alt={name}
                      />
                      <h4>{projectName || user.name}</h4>
                    </header>
                  </Link>

                  <div>
                    <p>TYPE: {orderDetails.type}</p>
                    <p>{orderDetails.name}</p>
                  </div>
                  <div>
                    <p>PRICE: {totalPrice}</p>
                    <p>{orderDetails.delivery} days</p>
                  </div>
                  <p>Ordered: {createdAt}</p>
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
            {orders?.map(({ _id, projectName, service }: any) => (
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
                      userId,
                      `${process.env.NEXT_PUBLIC_ADMIN_ID}`
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
