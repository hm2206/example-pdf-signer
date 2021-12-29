import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import "react-pdf-signer/src/assets/css/index.css";
import { ViewerLayer } from 'react-pdf-signer';
import './index.css';

interface IHandleFile {
  files: FileList
}

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFile = (e: ChangeEvent, { files }: IHandleFile) => {
    const target: any = e.target;
    if (!files.length) return target.value = null;
    const tmpFile = files[0];
    target.value = null;
    if (tmpFile.type !== 'application/pdf') return;
    setFile(tmpFile);
  }

  return (
    <div className="App">

      <h4>Ejemplo del Firmador PDF para React</h4>
      <br />
      <hr />

      <br />
      <br />

      <input type="file"
        onChange={(e: ChangeEvent) => handleFile(e, e.target as any)}
      />

      {file?.name ?
        <ViewerLayer
          certInfo={{ 
            id: 1,
            serialNumber: "000000005",
            displayTitle: "Hans Medina"
          }}
          file={file}
          onSigner={(data: any) => console.log(data)}
          onClose={() => setFile(undefined)}
        />
        : null
      }
    </div>
  )
}

export default App
