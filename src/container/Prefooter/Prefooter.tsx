import Link from "next/link";
import { Button } from "../../components";
import styles from "./Prefooter.module.scss";

const { prefooter, container, btnBox } = styles;

function Prefooter() {
  return (
    <section className={prefooter}>
      <div className={`${container} dContainer`}>
        <h2>Be a part of #AWorldOfAwesome</h2>
        <p>
          <strong>Need More Information?</strong> - Let us know if you need more
          information and an EcomHalo solutions consultant will contact you to
          assist you with any questions about our services.
        </p>

        <div className={btnBox}>
          <Link href="/userAuth/signup">
            <Button title="Be a part of team" />
          </Link>

          <Link href="/contact-us">
            <Button
              title="Contact Us"
              btnType="type2"
              style={{ color: "var(--white-color)" }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Prefooter;
