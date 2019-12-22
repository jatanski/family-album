import React, { forwardRef, Ref } from 'react';
import { FormProps } from '../../AddPhoto.types';
import FileInputContainer from './AddPhoto.form.fileInputContainer';

const FileInput = forwardRef(({ handleFileInput }: FormProps, ref: Ref<HTMLInputElement>) => (
	<FileInputContainer>
		<input
			type="file"
			className="custom-file-input"
			id="inputGroupFile01"
			aria-describedby="inputGroupFileAddon01"
			ref={ref}
			onChange={handleFileInput}
			multiple
			accept="image/x-png,image/gif,image/jpeg"
		/>
		<label className="custom-file-label" htmlFor="inputGroupFile01">
			Wybierz plik
		</label>
	</FileInputContainer>
));

export default FileInput;
