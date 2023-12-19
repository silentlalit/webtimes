import React from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";

import styles from "./profile.module.scss";

const { profile, profile_image } = styles;

const Profile = ({ name, img, edit }: any) => {
  return (
    <div className={profile}>
      <div className={profile_image}>
        <Image src={img} width={100} height={100} alt={name} />
        {edit && (
          <span onClick={edit}>
            <FiEdit2 size={17} />
          </span>
        )}
      </div>

      <h4>{name}</h4>
    </div>
  );
};

export default Profile;
