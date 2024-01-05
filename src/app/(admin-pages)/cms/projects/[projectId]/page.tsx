"use client";

import { useEffect, useState } from "react";
import { Loader, ButtonTag, Modal, UploadFiles } from "@/components";
import { useRouter } from "next/navigation";
import { BiUpload } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";

// redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  clearProject,
  deleteImage,
  getProject,
  updateImage,
  updateImages,
} from "@/redux/slices/projectsSlice";
import Form from "./Form";

function Page({ params }: any) {
  const { push, back } = useRouter();
  const { projectId } = params;
  const { project, loading } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (projectId !== "_new") dispatch(getProject(projectId));

    return () => {
      dispatch(clearProject());
    };
  }, [projectId, dispatch]);

  const uploadImagesHandle = async (files: File[]) => {
    const fd = new FormData();
    fd.append("id", projectId);
    files.forEach((file) => fd.append("files", file));

    const { payload }: any = await dispatch(updateImages(fd));
    return payload;
  };
  const replaceImageHandle = async (filename: string, file: File) => {
    const fd = new FormData();
    fd.append("id", projectId);
    fd.append("filename", filename);
    fd.append("file", file);

    const { payload }: any = await dispatch(updateImage(fd));
    return payload;
  };
  const deleteImageHandle = async (filename: string) => {
    const data = JSON.stringify({ id: projectId, filename });

    const { payload }: any = await dispatch(deleteImage(data));
    return payload;
  };

  return (
    <div className="cms_editService py-4">
      <h2>{projectId !== "_new" ? "Update Service" : "Create Service"}</h2>
      <hr />

      {projectId !== "_new" && loading ? (
        <Loader />
      ) : (
        <div>
          <ButtonTag
            icon={<RiArrowGoBackFill />}
            text="Back to Projects"
            onClick={() => back()}
            btnType="type2"
          />
          
          {projectId !== "_new" && (
            <ButtonTag
              icon={<BiUpload />}
              text="Upload Project Images"
              onClick={() => setIsImageModalOpen(true)}
            />
          )}

          <Form push={push} projectId={projectId} project={project} />
        </div>
      )}

      {isImageModalOpen && (
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          title="Seavice Images">
          <UploadFiles
            images={project?.images}
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
