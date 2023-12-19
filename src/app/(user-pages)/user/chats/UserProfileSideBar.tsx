"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  FetchUserProfile,
  ToggleSidebar,
  // UpdateSidebarType,
} from "@/redux/slices/userChatAppSlice";
import styles from "@/styles/userChatPage.module.scss";
// import ProfileContact from "./(components)/ProfileContact";
// import ProfileShared from "./(components)/ProfileShared";
// import ProfileStarredMessages from "./(components)/ProfileStarredMessages";
import { AiFillCloseCircle } from "react-icons/ai";

const { userProfileSectionTabs } = styles;

const UserProfileSideBar = ({ open, type }: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{ position: "absolute", top: 0, right: 20 }}
        onClick={() => dispatch(ToggleSidebar())}>
        <AiFillCloseCircle size={35} />
      </div>

      <header className="flex" style={{ flexDirection: "column" }}>
        <Image
          src={"/user.png"}
          alt={"user"}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
        <p>WebTimes</p>
        <p>Always available</p>
      </header>
      <hr style={{ margin: 30, backgroundColor: "var(--primary-color)" }} />

      {/* <div className={userProfileSectionTabs}>
        <div>
          <button onClick={() => dispatch(UpdateSidebarType("CONTACT"))}>
            Contacts
          </button>
          <button onClick={() => dispatch(UpdateSidebarType("SHARED"))}>
            Media
          </button>
          <button onClick={() => dispatch(UpdateSidebarType("STARRED"))}>
            Starred
          </button>
        </div>

        <div>
          {open &&
            (() => {
              switch (type) {
                case "CONTACT":
                  return <ProfileContact />;

                case "STARRED":
                  return <ProfileStarredMessages />;

                case "SHARED":
                  return <ProfileShared />;

                default:
                  break;
              }
            })()}
        </div>
      </div> */}
    </div>
  );
};

export default UserProfileSideBar;
