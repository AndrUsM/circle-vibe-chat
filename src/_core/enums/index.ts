import { User } from "@circle-vibe/shared";
import { MessageStatus } from "./message-status.enum";
import { MessageType } from "./message-type.enum";

export * from "./message-status.enum";

export enum FileType {
  MP4 = 'video/mp4',
  OGG = 'video/ogg',
  WEBM = 'video/webm',
  AVI = 'video/avi',
  // extends to documents
}

export enum ChatType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export interface FileModel {
  id: number;
  fileName: string;
  url: string;
  type: FileType
  description?: string;
}

export interface MessageModel {
  id: number;
  content: string;
  images: FileModel[];
  videos: FileModel[];
  files: FileModel[];
  status: MessageStatus;
  chatId: number;
  receiverId: number;
  sender: User;
  createdDate: string;
  updatedDate: string;
  messageType: MessageType;
  theads: MessageModel[];
}

export interface ChatModel {
  _id: string;
  users: User[],
  name: string;
  readableName: string;
  type: ChatType;
  isGroupChat: boolean;
  createdAt: string;
  updatedAt: string;
  hasUnreadMessages: boolean;
  empty: boolean;
  messagesCount: number;
  lastMessage: MessageModel | null;
}