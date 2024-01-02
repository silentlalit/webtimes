"use client";

import React from "react";

import styles from "@/styles/projectsPage.module.scss";
import { Button, Rating, SelectTags1, SelectTags2 } from "@/components";
import data from "@/utils/static/static.json";

const { projectsFilters, filterBox, filterBoxWrapper } = styles;

const Filters = ({ filters, setFilters, clearFilters }: any) => {
  const { categoriesList, technologiesList, pricingList } = data;

  const { categories, technologies, pricing, rating } = filters;

  return (
    <div className={projectsFilters}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div>
          <Button title="Clear All" btnType="type3" onClick={clearFilters} />
        </div>

        <p style={{ marginTop: 0 }}>Filters</p>
      </div>
      <div className={filterBox}>
        <h4>Categories {categories.length ? `(${categories.length})` : ""}</h4>
        <div className={filterBoxWrapper}>
          <SelectTags1
            placeholder="Select related Categories"
            isMulti={true}
            isSearchable={true}
            selected={categories}
            options={categoriesList}
            onChange={(options: any) =>
              setFilters((prev: any) => ({
                ...prev,
                categories: options,
              }))
            }
          />
        </div>
      </div>

      <div className={filterBox}>
        <h4>
          Technologies {technologies.length ? `(${technologies.length})` : ""}
        </h4>
        <div className={filterBoxWrapper}>
          <SelectTags1
            placeholder="Select related technologies"
            isMulti={true}
            isSearchable={true}
            selected={technologies}
            options={technologiesList}
            onChange={(options: any) =>
              setFilters((prev: any) => ({ ...prev, technologies: options }))
            }
          />
        </div>
      </div>

      <div className={filterBox}>
        <h4>Pricing {pricing.length ? `(${pricing.length})` : ""}</h4>
        <div className={filterBoxWrapper}>
          <SelectTags2
            placeholder="Pricing Tags"
            isMulti={true}
            options={pricingList}
            selected={pricing}
            onChange={(options: any) =>
              setFilters((prev: any) => ({ ...prev, pricing: options }))
            }
          />
        </div>
      </div>

      <div className={filterBox}>
        <h4>Rating </h4>
        <div className={filterBoxWrapper}>
          <Rating
            value={rating}
            onChange={(e: any) =>
              setFilters((prev: any) => ({ ...prev, rating: e }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
