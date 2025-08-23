import {
  ExtendedReactFunctionalComponent,
  Show,
  Tooltip,
} from "@circle-vibe/components";
import { MessageFile, MessageFileEntityType } from "@circle-vibe/shared";
import { openFileForPreview } from "@features/messages";

import "./file-preview.scss";

interface FilePreviewProps {
  messageFile: MessageFile;
}

export const FilePreview: ExtendedReactFunctionalComponent<
  FilePreviewProps
> = ({ messageFile }) => {
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
              onClick={() => openFileForPreview(messageFile)}
            />
          </Tooltip>
        </section>
      </>);
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

  if (entityType == MessageFileEntityType.FILE) {
    return (
      <>
        <Show.When isTrue={Boolean(fileName)}>
          <div className="italic text-sm text-center">{fileName}</div>
        </Show.When>

        <section className="px-1 pb-1 pt-1 relative">
          <iframe src={url} className="block max-w-full file-preview-documents rounded-2" />
        </section>
      </>
    );
  }

  return null;
};
