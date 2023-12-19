import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { BsArrowRightShort } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";

const {
  footer,
  container,
  footer_logo,
  footer_logo_wrapper,
  footLinks,
  social,
  useful_links,
} = styles;

const Footer = () => {
  return (
    <footer className={footer}>
      <div className={`${container} dContainer`}>
        <div className={footer_logo_wrapper}>
          <Link href="/">
            <div className={footer_logo}>
              <Image src="/logo.svg" alt="logo" width={150} height={130} />
              <span>Web Times</span>
            </div>
          </Link>
        </div>

        <div className={footLinks}>
          <h3>Useful Links</h3>
          <ul className={useful_links}>
            <li>
              <BsArrowRightShort />
              <Link href="">Services</Link>
            </li>
            <li>
              <BsArrowRightShort />
              <Link href="">Projects</Link>
            </li>
            <li>
              <BsArrowRightShort />
              <Link href="">About</Link>
            </li>
            <li>
              <BsArrowRightShort />
              <Link href="">Reviews</Link>
            </li>
            <li>
              <BsArrowRightShort />
              <Link href="">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className={footLinks}>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <a href="mailto:arjunsinghrajawata1@gmail.com">
                <HiMail />
                <span>arjunsinghrajawata1@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+918433243283">
                <IoIosCall />
                <span>8433-243-283</span>
              </a>
            </li>
          </ul>

          <ul className={social}></ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
