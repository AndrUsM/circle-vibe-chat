import { Message, getUserFullName } from "@circle-vibe/shared";
import {
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  Show,
  StackLayout,
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
    <ClusterLayout
      space="0.5rem"
      alignItems="start"
      className="bg-tertiary rounded-1 text-sm w-full flex-wrap"
    >
      <Show.When isTrue={isMessageEmpty}>
        <span className="text-xs text-truncate">Empty message</span>
      </Show.When>

      <Show.Else>
        <StackLayout space="0.25rem" className="w-full">
          <Show.When isTrue={Boolean(files?.length)}>
            <span className="text-sm truncate white-space-nowrap">
              {files?.length} {files?.length === 1 ? "file" : "files"} {content?.length ? 'with text message' : ''}
            </span>
          </Show.When>

          <Show.Else>
            <span className="block truncate line-clamp line-clamp-1 italic">
              {content}
            </span>
          </Show.Else>
        </StackLayout>

        <Show.When isTrue={Boolean(sender?.user)}>
          <span className="truncate white-space-nowrap font-semibold">
            - {senderFullName}
          </span>
        </Show.When>
      </Show.Else>
    </ClusterLayout>
  );
};
