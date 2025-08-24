import {
  UploadFileOutputDto,
  UploadImageOutputDto,
  UploadVideoOutputDto,
  ConversationBucketNameEnum,
} from "@circle-vibe/shared";
import { fileServerRequest } from "@core/request";

export const useSendFile = () => {
  const uploadFile = async (file: File, bucket: ConversationBucketNameEnum) => {
    const data = new FormData();
    data.append("file", file);

    const response = await fileServerRequest({
      method: "POST",
      url: "/files/upload",
      data,
      params: {
        bucket,
      }
    });

    return response.data as UploadFileOutputDto;
  };

  const uploadImage = async (file: File, bucket: ConversationBucketNameEnum) => {
    const data = new FormData();
    data.append("image", file);

    const response = await fileServerRequest({
      method: "POST",
      url: "/images/upload",
      data,
      params: {
        bucket,
      }
    });

    return response.data as UploadImageOutputDto;
  };

  const uploadVideo = async (file: File, bucket: ConversationBucketNameEnum) => {
    const data = new FormData();
    data.append("video", file);

    const response = await fileServerRequest({
      method: "POST",
      url: "/videos/upload",
      data,
      params: {
        bucket,
      }
    });

    return response.data as UploadVideoOutputDto;
  };

  return {
    uploadFile,
    uploadImage,
    uploadVideo,
  };
};
