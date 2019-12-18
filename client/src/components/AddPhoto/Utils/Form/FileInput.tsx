import React, { forwardRef } from 'react';
import { FormProps } from '../../types';

const FileInput = forwardRef(({ handleFileInput }: FormProps, ref: any) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroupFileAddon01">
          Dodaj zdjęcie
        </span>
      </div>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
          ref={ref}
          onChange={handleFileInput}
        />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          Wybierz plik
        </label>
      </div>
    </div>
  );
});

export default FileInput;
