"use client";

import React, { useState } from "react";
import { ButtonTag } from "@/components";
import styles from "@/styles/catAndTech.module.scss";
import { useAppSelector } from "@/redux/hook";
import DataTable from "./DataTable";

const { catAndTechPage, btnTitleBox } = styles;

const CatAndTech = () => {
  const { technologiesList, categoriesList } = useAppSelector(
    (state: any) => state.staticData
  );
  const [isTech, setIsTech] = useState<boolean>(true);

  return (
    <div className={catAndTechPage}>
      <div className={btnTitleBox}>
        <ButtonTag
          text="Technologies"
          disabled={isTech}
          onClick={() => setIsTech(true)}
        />
        <ButtonTag
          text="Categories"
          disabled={!isTech}
          onClick={() => setIsTech(false)}
        />
      </div>

      {isTech ? (
        <DataTable
          title="Technologies"
          list={technologiesList}
          name="technologiesList"
        />
      ) : (
        <DataTable
          title="Categories"
          list={categoriesList}
          name="categoriesList"
        />
      )}
    </div>
  );
};

export default CatAndTech;
