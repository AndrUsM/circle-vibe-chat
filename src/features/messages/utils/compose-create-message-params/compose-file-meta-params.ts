import { getEntityType } from "./compose-entity-type-params";
import { getFileType } from "./get-file-type";

export const composeFileMetaInputDto = (file: File, description: string) => ({
    fileName: file.name,
    description,
    type: getFileType(file),
    fileType: file.type,
    entityType: getEntityType(file)
})