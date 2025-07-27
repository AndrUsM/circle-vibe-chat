import { Button, Icon, Show, StackLayout, Tooltip, useIcons } from "@circle-vibe/components";
import { MessageFileEntityType } from "@circle-vibe/shared";

import "./uploaded-file-preview.scss";

export interface UploadedFilePreviewProps {
  fileSource: string;
  fileName: string;
  entityType: MessageFileEntityType;
  onClear: VoidFunction;
}

export const UploadedFilePreview: React.FC<UploadedFilePreviewProps> = ({
  fileSource,
  entityType,
  fileName,
  onClear,
}) => {
  const { cilX } = useIcons();

  return (
    <div className="relative w-fit">
      <Button
        className="absolute close-button"
        size="small"
        color="secondary"
        onClick={onClear}
      >
        <Icon name={cilX} color="var(--cv-light)" />
      </Button>

      <Show.When isTrue={entityType === MessageFileEntityType.IMAGE}>
        <img className="rounded-2 w-full max-w-40 min-h-16" src={fileSource} />
      </Show.When>

      <Show.When isTrue={entityType === MessageFileEntityType.VIDEO}>
        <video
          muted
          className="rounded-2 w-full max-w-40 min-h-16"
          src={fileSource}
        />
      </Show.When>

      <Show.When isTrue={entityType === MessageFileEntityType.FILE}>
        <Tooltip title={fileName}>
          <div className="italic text-sm text-center file-name-badge truncate white-space-nowrap py-4 pl-4 pr-8 rounded-2">
            {fileName}
          </div>
        </Tooltip>
      </Show.When>
    </div>
  );
};
