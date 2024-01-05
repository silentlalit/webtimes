"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import {
  Button,
  TextInput,
  SingleFileSelect,
  SelectMultipleTags,
  TextareaInput,
} from "@/components";
import { ServiceSchema } from "@/utils/schema";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createService, updateService } from "@/redux/slices/servicesSlice";
import styles from "@/styles/adminService.module.scss";

const { priceListContainer, priceListWrapper, priceListBox } = styles;

type ServiceType = {
  name: string;
  title: string;
  description: string;
  technologies: { label: string; value: string }[];
  thumbnail: string | File;
  priceList: {
    type: string;
    name: string;
    price: string;
    about: string;
    revisions: string;
    delivery: string;
  }[];
};

const defaultValues: ServiceType = {
  name: "",
  title: "",
  description: "",
  technologies: [],
  thumbnail: "",
  priceList: [
    {
      type: "Basic",
      name: "SILVER ☆",
      price: "",
      about: "",
      revisions: "",
      delivery: "",
    },
    {
      type: "Standard",
      name: "GOLD ★",
      price: "",
      about: "",
      revisions: "",
      delivery: "",
    },
    {
      type: "Premium",
      name: "DIAMOND ♛",
      price: "",
      about: "",
      revisions: "",
      delivery: "",
    },
  ],
};

const Form = ({ push, serviceId, service, isDisabled }: any) => {
  const { technologiesList } = useAppSelector((state) => state.staticData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceType>({
    resolver: yupResolver(ServiceSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset({
      name: service?.name,
      title: service?.title,
      description: service?.description,
      technologies: service?.technologies,
      thumbnail: service?.thumbnail,
      priceList: service?.priceList,
    });
  }, [service, reset]);

  const { thumbnail, technologies }: any = service || "";

  const saveChanges = async (data: ServiceType) => {
    // setLoading(true);
    const fd = new FormData();
    const { name, title, description, technologies, thumbnail, priceList } =
      data;

    fd.append("name", name);
    fd.append("description", description);
    fd.append("technologies", JSON.stringify(technologies));
    fd.append("thumbnail", thumbnail);
    fd.append("priceList", JSON.stringify(priceList));
    fd.append("title", title);

    if (serviceId === "_new") {
      const { payload }: any = await dispatch(createService(fd));
      if (payload.success) {
        toast.success(payload.message);
        push(`/cms/services?isAdmin=${true}&adminToken=${process.env.NEXT_PUBLIC_ADMIN_ID}`);
        setLoading(false);
      } else {
        toast.success(payload.error);
        setLoading(false);
      }
    } else {
      fd.append("id", serviceId);
      const { payload }: any = await dispatch(updateService(fd));
      if (payload.success) {
        toast.success(payload.message);
        setLoading(false);
      } else {
        toast.success(payload.error);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(saveChanges)}>
      <TextInput
        placeholder="Service name"
        label="Service name"
        control={control}
        name="name"
        error={errors.name}
        disabled={isDisabled}
      />

      <TextareaInput
        placeholder="Service title..."
        label="Service title"
        control={control}
        name="title"
        error={errors.title}
        disabled={isDisabled}
      />

      <TextareaInput
        placeholder="Service description"
        label="Service description"
        control={control}
        name="description"
        error={errors.description}
        disabled={isDisabled}
      />

      <SelectMultipleTags
        placeholder="Select related technologies"
        label="Select related technologies"
        control={control}
        name="technologies"
        error={errors.technologies}
        isMulti={true}
        isSearchable={true}
        selected={technologies}
        options={technologiesList}
        disabled={isDisabled}
      />

      <SingleFileSelect
        label="Select a Service Thumbnail:"
        control={control}
        name="thumbnail"
        error={errors.thumbnail}
        file={thumbnail}
        url="/upload/services/"
        disabled={isDisabled}
      />

      <div className={priceListContainer}>
        <h3>Add Pricing details</h3>

        <div className={priceListWrapper}>
          {[0, 1, 2].map((idx) => (
            <div className={priceListBox} key={idx}>
              <TextInput
                placeholder="PriceList type"
                label="PriceList type"
                control={control}
                name={`priceList[${idx}].type`}
                error={errors.priceList ? errors.priceList[idx]?.type : {}}
                disabled
              />

              <TextInput
                placeholder="PriceList name"
                label="PriceList name"
                control={control}
                name={`priceList[${idx}].name`}
                error={errors.priceList ? errors.priceList[idx]?.name : {}}
                disabled={isDisabled}
              />

              <TextInput
                placeholder="Price"
                label="Price (in $)"
                control={control}
                name={`priceList[${idx}].price`}
                error={errors.priceList ? errors.priceList[idx]?.price : {}}
                disabled={isDisabled}
              />

              <TextareaInput
                placeholder="About"
                label="About"
                control={control}
                name={`priceList[${idx}].about`}
                error={errors.priceList ? errors.priceList[idx]?.about : {}}
                disabled={isDisabled}
              />

              <TextInput
                placeholder="Revisions"
                label="Revisions"
                control={control}
                name={`priceList[${idx}].revisions`}
                error={errors.priceList ? errors.priceList[idx]?.revisions : {}}
                disabled={isDisabled}
              />

              <TextInput
                placeholder="Delivery"
                label="Delivery (in days)"
                control={control}
                name={`priceList[${idx}].delivery`}
                error={errors.priceList ? errors.priceList[idx]?.delivery : {}}
                disabled={isDisabled}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        title="Save Service"
        wrapperStyle={{
          marginTop: 40,
          pointerEvents: loading ? "none" : "all",
        }}
        loading={loading}
        disabled={loading || isDisabled}
      />
    </form>
  );
};

export default Form;
