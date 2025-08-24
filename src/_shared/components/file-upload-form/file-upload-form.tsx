import React, {
	ChangeEvent,
	useCallback,
	useRef
} from 'react';
import classNames from "classnames";

import {
	ConversationBucketNameEnum,
	UploadFileOutputDto,
	UploadImageOutputDto,
	UploadVideoOutputDto,
} from '@circle-vibe/shared';
import {
	CenteredVertialLayout,
	FormControl,
	FormControlError,
	Icon,
	Input,
	Label,
	Show,
	StackLayout,
	Tooltip,
	useIcons,
} from "@circle-vibe/components";

import { useSendFile } from "@api/messages";
import { useConfirmation } from "@shared/hooks";
import { useNotification } from "@core/hooks";
import { FileUploadImagePreview } from "@shared/components";
import { composeFileUrl } from "@core/utils";

type ComposedFileUploadResponse = UploadFileOutputDto | UploadImageOutputDto | UploadVideoOutputDto;

export enum FileUploadFormFileType {
	FILE = 'file',
	IMAGE = 'image',
	VIDEO = 'video',
	AUDIO = 'audio',
}

interface FileUploadFormProps {
	label: string;
	url: string | null;
	type?: FileUploadFormFileType,
	bucket: ConversationBucketNameEnum;
	disabled?: boolean;
	isRequired?: boolean;
	afterUpload: (fileUrls: ComposedFileUploadResponse) => void;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
	bucket, label, type = FileUploadFormFileType.FILE, url, disabled = false, isRequired = false, afterUpload
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { cilCloudUpload } = useIcons();
	const { uploadImage } = useSendFile();
	const notification = useNotification();
	const confirmation = useConfirmation();
	
	const afterUploadAction = useCallback(async (file: File) => {
		await confirmation("Are you sure you want to upload image?");
		
		try {
			const response = await uploadImage(file, bucket);
			
			notification({
				type: 'success', content: "Avatar successfully uploaded",
			});
			
			if (!response) {
				return;
			}
			
			afterUpload(response);
		} catch
		{
			notification({
				type: "error", content: "An error occurred while uploading image",
			});
		}
	}, []);
	
	return (<StackLayout>
		<Label isRequired={isRequired}>{label}</Label>
		
		<FormControl className={classNames("w-full rounded-2 border-dark border-dashed border-1 py-5 ", {
			"element_state-disabled": disabled,
		})}>
			<Input ref={fileInputRef} type="file" hidden={true} onChange={(event: ChangeEvent<HTMLInputElement>) => {
				const file = event?.currentTarget?.files?.length ? event?.currentTarget?.files[0] : null;
				
				if (file) {
					afterUploadAction(file);
				}
			}}/>
			
			<Show.When isTrue={!url}>
				<CenteredVertialLayout justifyContent="center" className="element_effect-hover cursor-pointer" onClick={() => {
					fileInputRef?.current?.click();
				}}>
					<Tooltip title="Choose File">
						<Icon name={cilCloudUpload} size={50} color="var(--cv-dark)"/>
					</Tooltip>
				</CenteredVertialLayout>
			</Show.When>
			
			<Show.When isTrue={Boolean(url) && type === FileUploadFormFileType.IMAGE}>
				<FileUploadImagePreview url={composeFileUrl(String(url), bucket)}/>
			</Show.When>
			
			<Show.When isTrue={Boolean(url) && type !== FileUploadFormFileType.IMAGE}>
				<a target="_blank" rel="noreferrer" href={composeFileUrl(String(url), bucket)}>
					<StackLayout>
						<span>Link to uploaded file</span>
						<span>{url}</span>
					</StackLayout>
				</a>
			</Show.When>
			
			<Show.When isTrue={isRequired}>
				<FormControlError/>
			</Show.When>
		</FormControl>
	</StackLayout>)
}