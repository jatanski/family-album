import React from 'react';

const FileInputContainer = ({ children }: any) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text" id="inputGroupFileAddon01">
        Dodaj zdjęcie
      </span>
    </div>
    <div className="custom-file">{children}</div>
  </div>
);

export default FileInputContainer;
