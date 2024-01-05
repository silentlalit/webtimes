import React from "react";

// React Icons
import {
  MdOutlineRealEstateAgent,
  MdOutlineBuildCircle,
  MdOutlinePrecisionManufacturing,
  MdOutlineFireTruck,
  MdOutlineSecurity,
} from "react-icons/md";
import { VscLaw } from "react-icons/vsc";
import { CiMedicalCase } from "react-icons/ci";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoIosFitness } from "react-icons/io";
import { GiLifeBar, GiSteampunkGoggles } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { SiHandshake } from "react-icons/si";
import { FaGraduationCap } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { PiMediumLogoDuotone } from "react-icons/pi";
import { LiaOilCanSolid } from "react-icons/lia";
import { LuShirt } from "react-icons/lu";

import styles from "./serviceIndustries.module.scss";

const { container, serveIndustry, serveIndustry_wrapper, serveIndustry_box } =
  styles;

const industries = [
  {
    Icon: MdOutlineRealEstateAgent,
    label: "Real Estate",
  },
  {
    Icon: VscLaw,
    label: "Law Firm",
  },
  {
    Icon: MdOutlineBuildCircle,
    label: "Construction",
  },
  {
    Icon: CiMedicalCase,
    label: "Medical",
  },
  {
    Icon: MdOutlinePrecisionManufacturing,
    label: "Menufacturing",
  },
  {
    Icon: IoRestaurantOutline,
    label: "Restaurants",
  },
  {
    Icon: MdOutlineFireTruck,
    label: "Transportation",
  },
  {
    Icon: PiMediumLogoDuotone,
    label: "Beauty",
  },
  {
    Icon: MdOutlineSecurity,
    label: "Security",
  },
  {
    Icon: IoIosFitness,
    label: "Fitness",
  },
  {
    Icon: GiLifeBar,
    label: "Non Profit",
  },
  {
    Icon: LiaOilCanSolid,
    label: "Oil & Gas",
  },
  {
    Icon: LuShirt,
    label: "Apparel",
  },
  {
    Icon: TbReportMoney,
    label: "Finance",
  },
  {
    Icon: GiSteampunkGoggles,
    label: "Entertainment",
  },
  {
    Icon: SiHandshake,
    label: "Consulting",
  },
  {
    Icon: FaGraduationCap,
    label: "Education",
  },
  {
    Icon: FiMoreHorizontal,
    label: "And many more...",
  },
];

const ServiceIndustries = () => {
  return (
    <section className={serveIndustry} data-aos="fade-down">
      <div className={`${container} dContainer`}>
        <h2>Which Industries Do We Serve?</h2>
        <p>
          We have been fortunate enough to create websites for hundreds of
          business owners over the last five years with clients throughout the
          world.
        </p>

        <div className={serveIndustry_wrapper}>
          {industries.map(({ Icon, label }, idx) => (
            <div key={idx + label} className={serveIndustry_box}>
              <Icon size={50} color="#ff8a56" />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIndustries;
