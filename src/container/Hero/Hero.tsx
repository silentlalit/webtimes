import Image from "next/image";
import Button from "../../components/Button/Button";
import styles from "./Hero.module.scss";
import Link from "next/link";

const { hero, container, text, image } = styles;

const Hero = () => {
  return (
    <header className={hero}>
      <div className={`dContainer ${container}`}>
        <div className={text}>
          <h1 data-aos="fade-right">
            Hi! I’m Arjun. I help in{" "}
            <span className="underline decoration-secondary-color bg-secondary-color">
              Start, Build & Grow
            </span>{" "}
            your {""}
            <span className="font-bold t-color">Business.</span>
          </h1>

          <p data-aos="fade-up">
            I’m a Software Engineer, a product designer/developer based in
            India. I create user-friendly interfaces for fast-growing startups.
          </p>

          <Link href={"/contact-us"} data-aos="fade-up">
            <Button title="Book a Call" wrapperStyle={{ marginTop: "30px" }} />
          </Link>
        </div>

        <div data-aos="fade-left">
          <Image
            src={"/profile.png"}
            className={image}
            width={400}
            height={500}
            priority={true}
            alt={"profile"}
            object-fit="contain"
          />

          <div className="card"></div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
