"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/servicePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearService, getService } from "@/redux/slices/servicesSlice";
import { Button, Loader } from "@/components";
import { Testimonials } from "@/container";
import { LiaClockSolid } from "react-icons/lia";
import { MdLoop, MdOutlineContactSupport } from "react-icons/md";
import { BsArrowRightShort, BsFillLightningFill } from "react-icons/bs";
import ServiceHeader from "./ServiceHeader";
import SideBar from "./SideBar";
import { RootState } from "@/redux/store/store";

const {
  servicePage,
  container,
  serviceHeaderTitle,
  serviceLeftSection,
  serviceRightSection,
  serviceReviews,
  serviceDetails,
  rightSectionTabs,
  prizingDetails,
  recommendedBox,
  activePriceBtn,
} = styles;

const Page = ({ params, searchParams }: any) => {
  const { service, loading } = useAppSelector(
    (state: RootState) => state.service
  );
  const { id } = params;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    service?._id !== id && dispatch(getService(id));

    return () => {
      dispatch(clearService());
    };
  }, [dispatch, id, service?._id]);

  if (loading)
    return (
      <div style={{ width: "100vw", height: "100vh" }} className="flex">
        <Loader />
      </div>
    );

  return (
    <div className={servicePage}>
      <ServiceHeader images={service?.images || []} />

      <div className={`${container} dContainer`}>
        <div className={serviceLeftSection}>
          <div className={serviceHeaderTitle}>
            <h4 className="topTag">{service?.name}</h4>
            <h3>{service?.title}</h3>
          </div>

          <div className={serviceDetails}>
            <h4>Description</h4>
            <p
              dangerouslySetInnerHTML={{ __html: service?.description || "" }}
            />
          </div>

          <div className={serviceReviews}>
            <Testimonials
              breakPoints={{ 1500: { slidesPerView: 1, spaceBetween: 20 } }}
            />
          </div>

          <div className="comparisonContainer"></div>
        </div>

        <div className={serviceRightSection} id="pricingDetails">
          <SidePriceBox
            priceList={service?.priceList || []}
            searchParams={searchParams}
            pathname={pathname}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </div>
      </div>

      {isOpenSidebar ? (
        <SideBar
          service={service}
          searchParams={searchParams}
          setIsOpenSidebar={setIsOpenSidebar}
          style={{
            transform: isOpenSidebar ? "translate(0%)" : "translate(100%)",
            transition: "all 0.3s ease",
          }}
        />
      ) : null}
    </div>
  );
};

export default Page;

const SidePriceBox = ({
  priceList,
  searchParams,
  pathname,
  setIsOpenSidebar,
}: any) => {
  const { pricingIdx = 0 } = searchParams;

  return (
    <div>
      <div className={rightSectionTabs}>
        <Link href={`${pathname}?pricing=Basic&pricingIdx=0`} scroll={false}>
          <button className={pricingIdx == 0 ? activePriceBtn : undefined}>
            Basic
          </button>
        </Link>
        <Link href={`${pathname}?pricing=Standard&pricingIdx=1`} scroll={false}>
          <button className={pricingIdx == 1 ? activePriceBtn : undefined}>
            Standard
          </button>
        </Link>
        <Link href={`${pathname}?pricing=Premium&pricingIdx=2`} scroll={false}>
          <button className={pricingIdx == 2 ? activePriceBtn : undefined}>
            Premium
          </button>
        </Link>
      </div>

      <div className={prizingDetails}>
        <div>
          <h3>{priceList[pricingIdx]?.name}</h3>
          <h3>US${priceList[pricingIdx]?.price}</h3>
        </div>

        <p>{priceList[pricingIdx]?.about}</p>

        <div>
          <span className="flex" style={{ gap: 5 }}>
            <LiaClockSolid size={25} />{" "}
            <span style={{ fontWeight: "bold" }}>
              {priceList[pricingIdx]?.delivery} Days Delivery
            </span>
          </span>
          <span className="flex" style={{ gap: 5 }}>
            <MdLoop size={25} />{" "}
            <span style={{ fontWeight: "bold" }}>
              {priceList[pricingIdx]?.revisions} Revisions
            </span>
          </span>
        </div>

        <Button
          title="Continue"
          icon={<BsArrowRightShort size={20} color="#fff" />}
          wrapperStyle={{ marginTop: 30 }}
          style={{ width: "100%" }}
          onClick={() => setIsOpenSidebar(true)}
        />

        <Link href="/contact-us">
          <Button
            title="Contact me!"
            btnType="type2"
            icon={<MdOutlineContactSupport size={20} />}
            style={{ width: "100%" }}
          />
        </Link>
      </div>

      <div className={recommendedBox}>
        <BsFillLightningFill size={25} />
        <p>
          <span>Highly responsive!</span> <br />
          <span>Known for exceptionally quick replies</span>
        </p>
      </div>
    </div>
  );
};
