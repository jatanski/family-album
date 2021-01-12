import React, { FC } from 'react';
import { FileInputContainerProps } from '../../AddPhoto.types';

const FileInputContainer: FC<FileInputContainerProps> = ({ children }) => (
	<div className="input-group">
		<div className="custom-file">{children}</div>
	</div>
);

export default FileInputContainer;
