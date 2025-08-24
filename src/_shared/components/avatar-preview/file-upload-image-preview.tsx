import React from 'react';

import './file-upload-image-preview.scss';

interface AvatarPreviewProps {
	url?: string;
}

export const FileUploadImagePreview: React.FC<AvatarPreviewProps> = ({
	url,
}) => {
	return (
		<img src={url} alt="file-upload-image-preview" className="file-upload-image-preview border-1 border-solid border-dark shadow-md" />
	)
}