import { UploadFileOutputDto, UploadImageOutputDto } from "@circle-vibe/shared";
import { fileServerRequest } from "@core/request";

export const useSendFile = () => {
  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);

    const response = await fileServerRequest({
      method: "POST",

      url: "/files/upload",
      data,
    });

    return response.data as UploadFileOutputDto;
  };

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("image", file);

    const response = await fileServerRequest({
      method: "POST",
      url: "/images/upload",
      data,
    });

    return response.data as UploadImageOutputDto;
  };

  return {
    uploadFile,
    uploadImage,
  };
};
