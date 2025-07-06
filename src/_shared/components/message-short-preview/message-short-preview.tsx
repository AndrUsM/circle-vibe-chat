import { Message, getUserFullName } from "@circle-vibe/shared";
import {
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Show,
} from "@circle-vibe/components";

interface MessageShortPreviewProps {
  message: Message;
}

export const MessageShortPreview: ExtendedReactFunctionalComponent<
  MessageShortPreviewProps
> = ({ message }) => {
  const { content, files, sender } = message;
  const senderFullName = getUserFullName(sender?.user);
  const isMessageEmpty = !content && !files?.length;

  return (
    <CenteredVertialLayout
      space="0.15rem"
      className="bg-tertiary rounded-1 p-2"
    >
      <Show.When isTrue={isMessageEmpty}>
        <span className="text-xs text-truncate">Empty message</span>
      </Show.When>

      <Show.Else>
        <Show.When isTrue={Boolean(files?.length)}>
          <span className="text-sm text-truncate">
            {files?.length} {files?.length === 1 ? "file" : "files"}
          </span>
        </Show.When>

        <Show.Else>
          <span className="text-xs text-truncate">{content}</span>
        </Show.Else>

        <Show.When isTrue={Boolean(sender?.user)}>
          <span className="text-sm text-truncate">by {senderFullName}</span>
        </Show.When>
      </Show.Else>
    </CenteredVertialLayout>
  );
};
