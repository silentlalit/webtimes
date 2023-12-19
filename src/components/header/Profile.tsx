"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PiSignOutDuotone } from "react-icons/pi";
import { MdOutlineContactSupport } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

import { logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { User } from "@/utils/interface";
import styles from "./header.module.scss";
import Link from "next/link";

const { profileMenu, imageEdit, manageAccBtn, btns, btns_btn } = styles;

type Props = {
  user: User;
  loading: boolean;
  setOpenProfile: any;
};

const Profile = ({ user, loading, setOpenProfile }: Props) => {
  const { name, email, avatar = "/user.png" } = user || "";
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const signOut = async () => {
    const { payload } = await dispatch(logout());

    if (payload.success) {
      push("/");
      toast.success(payload.message);
    } else toast.error(payload.error);
  };

  return (
    <div
      className={profileMenu}
      tabIndex={1}
      onBlur={() => setOpenProfile(false)}>
      <p>{email}</p>

      <div className={imageEdit}>
        <Image src={`${avatar}`} width={80} height={80} alt={email} />
        <span>
          <FiEdit2 size={15} />
        </span>
      </div>

      <h4>{`Hi, ${name}`}</h4>

      <Link href="/user/profile">
        <div className={manageAccBtn}>
          <span>Manage your web account.</span>
        </div>
      </Link>

      <div className={btns}>
        <Link href="/contact-us">
          <div className={btns_btn} style={{ borderRadius: "30px 0 0 30px" }}>
            <MdOutlineContactSupport size={25} />
            <span>Have question ?</span>
          </div>
        </Link>

        <div
          className={btns_btn}
          onClick={signOut}
          style={
            loading
              ? { opacity: 0.3, pointerEvents: "none" }
              : { borderRadius: "0 30px 30px 0" }
          }>
          <PiSignOutDuotone size={25} />
          <span>Sign out</span>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Profile;
