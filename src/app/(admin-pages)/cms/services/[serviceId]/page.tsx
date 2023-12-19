"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  UploadFiles,
  Modal,
  ButtonTag,
  SwitchInput,
  Button,
  Tooltip,
} from "@/components";
import { BiUpload } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";

// redux
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  clearService,
  deleteImage,
  getService,
  updateImage,
  updateImages,
} from "@/redux/slices/servicesSlice";
import Form from "./Form";

function Page({ params }: any) {
  const { push, back } = useRouter();
  const { serviceId } = params;
  const dispatch = useAppDispatch();
  const { service, loading } = useAppSelector((state: any) => state.service);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (serviceId !== "_new") dispatch(getService(serviceId));

    return () => {
      dispatch(clearService());
    };
  }, [serviceId, dispatch]);

  const uploadImagesHandle = async (files: File[]) => {
    const fd = new FormData();
    fd.append("id", serviceId);
    files.forEach((file) => fd.append("files", file));

    const { payload }: any = await dispatch(updateImages(fd));
    return payload;
  };
  const replaceImageHandle = async (filename: string, file: File) => {
    const fd = new FormData();
    fd.append("id", serviceId);
    fd.append("filename", filename);
    fd.append("file", file);

    const { payload }: any = await dispatch(updateImage(fd));
    return payload;
  };
  const deleteImageHandle = async (filename: string) => {
    const data = JSON.stringify({ id: serviceId, filename });

    const { payload }: any = await dispatch(deleteImage(data));
    return payload;
  };

  return (
    <div className="p-3">
      <h2>{serviceId !== "_new" ? "Update Service" : "Create Service"}</h2>
      <hr />

      {loading && serviceId !== "_new" ? (
        <Loader />
      ) : (
        <div className="relative mt-4">
          <ButtonTag
            icon={<RiArrowGoBackFill />}
            text="Back to Services"
            onClick={() => back()}
            btnType="type2"
          />

          {serviceId !== "_new" && (
            <div className="absolute right-0 top-0">
              <Tooltip
                text={"Upload service images"}
                style={{ bottom: "calc(-100%)", top: "unset" }}>
                <Button
                  icon={<BiUpload size={25} />}
                  onClick={() => setIsImageModalOpen(true)}
                />
              </Tooltip>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: 30,
              gap: 20,
            }}>
            <SwitchInput
              checked={!isDisabled}
              onChange={() => setIsDisabled(!isDisabled)}
            />
            <h4>{serviceId === "_new" ? "Create" : "Edit"} Service</h4>
          </div>

          <Form
            push={push}
            serviceId={serviceId}
            service={service}
            isDisabled={isDisabled}
          />
        </div>
      )}

      {isImageModalOpen && (
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          title="Seavice Images">
          <UploadFiles
            images={service?.images}
            uploadImages={uploadImagesHandle}
            deleteImage={deleteImageHandle}
            replaceImage={replaceImageHandle}
          />
        </Modal>
      )}
    </div>
  );
}

export default Page;
