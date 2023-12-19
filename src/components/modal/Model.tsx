"use client";

import { useEffect } from "react";
import styles from "./modal.module.scss";
import { RiCloseFill } from "react-icons/ri";

const { modal, modalHeader, modalContent, closeButton } = styles;

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: any;
};

const Modal = ({ title, isOpen, onClose, children, style }: Props) => {
  useEffect(() => {
    document.querySelector("body")!.style.overflow = "hidden";

    return () => {
      document.querySelector("body")!.style.overflow = "unset";
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className={modal}>
      <div className={modalContent} style={style}>
        <div className={modalHeader}>
          <h3>{title}</h3>
          <RiCloseFill size={35} className={closeButton} onClick={onClose} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
