import Link from "next/link";
import styles from "@/styles/contactUsPage.module.scss";

import { FaqsSection, Prefooter, Testimonials } from "@/container";
import { CiFacebook } from "react-icons/ci";
import {
  AiFillLinkedin,
  AiOutlineClockCircle,
  AiOutlineInstagram,
  AiOutlinePhone,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import ContactForm from "./ContactForm";

const {
  main,
  contactHeader,
  container,
  left,
  left_title,
  contactus_social,
  box,
  socialMedia,
} = styles;

const socialLinks = [
  {
    social: "facebook",
    link: "/",
    icon: <CiFacebook size={40} />,
  },
  {
    social: "linkedIn",
    link: "/",
    icon: <AiFillLinkedin size={40} />,
  },
  {
    social: "Instagram",
    link: "/",
    icon: <AiOutlineInstagram size={40} />,
  },
];

function Page() {
  return (
    <div className={main}>
      <header className={contactHeader}>
        <div className={`${container} dContainer`}>
          <div className={left}>
            <div className={left_title}>
              <h4 className="topTag">LET’S TALK GROWTH</h4>
              <h1>
                Get the best you <br /> need from the best!
              </h1>
              <p>Questions, feedback, support — we’re here for it all</p>
            </div>

            <div className={contactus_social}>
              <div className={box}>
                <MdEmail size={40} />
                <div>
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:arjunsinghrajawata1@gmail.com">
                      arjunsinghrajawata1@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className={box}>
                <AiOutlinePhone size={40} />
                <div>
                  <h4>Phone Number</h4>
                  <p>
                    <a href="tel:+918433243283">+91 843-324-3283</a>
                  </p>
                </div>
              </div>

              <div className={box}>
                <AiOutlineClockCircle size={40} />
                <div>
                  <h4>Business Hours :</h4>
                  <p>Monday - Sunday : 27x7</p>
                </div>
              </div>
            </div>

            <div className={socialMedia}>
              {socialLinks.map(({ social, link, icon }) => (
                <Link key={social} href={link}>
                  <span>{icon}</span>
                </Link>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </header>

      <Testimonials testimonials={[]} loading={false} />
      <FaqsSection />
      <Prefooter />
    </div>
  );
}

export default Page;
