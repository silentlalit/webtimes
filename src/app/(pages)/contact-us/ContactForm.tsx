"use client";

import React, { useState } from "react";
import styles from "@/styles/contactUsPage.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactUs } from "@/utils/schema";
import {
  Button,
  CheckboxListSelect,
  DropdownInput,
  PhoneNumberInput,
  TextInput,
  TextareaInput,
} from "@/components";
import toast from "react-hot-toast";
import { instance } from "@/providers/axios";

const { right, right_title, firstLast } = styles;

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  help: "General query about marketing",
  serviceIntrest: [],
  message: "",
};

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(ContactUs),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  const sendMessage = async (data: any) => {
    setLoading(true);

    try {
      const res: any = await instance.post("/contact-us", data);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={right}>
      <div className={right_title}>
        <h3>Let&apos;s make something great together</h3>
        <p>
          Please mail us at{" "}
          <strong>
            <a href="mailto:arjunsinghrajawata1@gmail.com">
              arjunsinghrajawata1@gmail.com
            </a>
          </strong>{" "}
          or fill the form below and we will get back to you as quick as
          possible
        </p>
      </div>

      <form onSubmit={handleSubmit(sendMessage)}>
        <div className={firstLast}>
          <TextInput
            placeholder="First name"
            label="First name"
            control={control}
            name="firstName"
            error={errors.firstName}
          />
          <TextInput
            placeholder="Last name"
            label="Last name"
            control={control}
            name="lastName"
            error={errors.lastName}
          />
        </div>

        <TextInput
          placeholder="Email Address"
          label="Email Address"
          control={control}
          name="email"
          error={errors.email}
          type="email"
        />

        <PhoneNumberInput
          placeholder="Phone Number"
          label="Phone Number"
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber}
        />

        <DropdownInput
          label="What can we help you with?"
          placeholder="What can we help you with?"
          control={control}
          name="help"
          error={errors.help}
          options={[
            {
              id: "1",
              value: "General query about marketing",
            },
            {
              id: "2",
              value: "Would like to hire your agency",
            },
            {
              id: "3",
              value: "Have a question about wentimes",
            },
            {
              id: "4",
              value: "General feedback",
            },
            {
              id: "5",
              value: "I am looking for a Job at wentimes",
            },
            {
              id: "6",
              value: "Other",
            },
          ]}
        />

        <CheckboxListSelect
          label="Service interested in"
          control={control}
          name="serviceIntrest"
          error={errors.serviceIntrest}
          options={[
            {
              id: "1",
              value: "Website Services",
            },
            {
              id: "2",
              value: "Web App services",
            },
            {
              id: "3",
              value: "Create backend services",
            },
            {
              id: "4",
              value: "App development Services",
            },
            {
              id: "5",
              value: "Apis services",
            },
            {
              id: "6",
              value: "UI/UX service",
            },
          ]}
        />

        <TextareaInput
          label="*Please share with us the project details"
          placeholder="Write here..."
          control={control}
          name="message"
          error={errors.message}
        />

        <Button
          type="submit"
          title="Submit"
          wrapperStyle={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
          }}
          loading={loading}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default ContactForm;
