import {Conversations} from './conversations';

import { ConversationProvider } from "@features/conversation"

export const ConversationsParent: React.FC = () => {
  return (
    <ConversationProvider>
      <Conversations />
    </ConversationProvider>
  )
}
