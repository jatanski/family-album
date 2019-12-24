import React from 'react';

const FileInputContainer = ({ children }: any) => (
	<div className="input-group">
		<div className="custom-file">{children}</div>
	</div>
);

export default FileInputContainer;
