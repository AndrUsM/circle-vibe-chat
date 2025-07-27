import {
  ExtendedReactFunctionalComponent,
  Show,
  Tooltip,
} from "@circle-vibe/components";
import { MessageFile, MessageFileEntityType } from "@circle-vibe/shared";

import "./file-preview.scss";

interface FilePreviewProps {
  messageFile: MessageFile;
  onClose: VoidFunction;
}

export const FilePreview: ExtendedReactFunctionalComponent<
  FilePreviewProps
> = ({ messageFile, onClose }) => {
  const onOpenFileForPreview = (messageFile: MessageFile) => {
    window.open(messageFile.url, "_blank");
  };

  const { entityType, fileName, url, description } = messageFile;
  if (entityType == MessageFileEntityType.IMAGE) {
    return (
      <>
        <Show.When isTrue={Boolean(fileName)}>
          <div className="italic text-sm text-center">{fileName}</div>
        </Show.When>

        <section className="px-1 pb-1 pt-1 relative">
          <Tooltip title={"Click to open in new tab"}>
            <img
              className="block cursor-pointer max-w-full file-preview-image image-rendering-pixelated rounded-2 mx-auto"
              src={url}
              alt={description}
              onClick={() => onOpenFileForPreview(messageFile)}
            />
          </Tooltip>
        </section>
      </>
    );
  }

  if (entityType == MessageFileEntityType.VIDEO) {
    return (
      <>
        <Show.When isTrue={Boolean(fileName)}>
          <div className="italic text-sm text-center">{fileName}</div>
        </Show.When>
        <section className="px-1 pb-1 pt-1 relative">
          <video
            autoPlay
            muted
            loop
            controlsList="nodownload"
            disablePictureInPicture
            className="block max-w-full file-preview-image rounded-2"
            src={url}
            controls
          />
        </section>
      </>
    );
  }

  return null;
};
