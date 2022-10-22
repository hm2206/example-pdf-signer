import { ChangeEvent, useState } from "react";
import "react-pdf-signer/src/assets/css/index.css";
import { IEventSigner, ViewerLayer } from "react-pdf-signer";
import axios from "axios";
import "./index.css";

interface IHandleFile {
  files: FileList;
}

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFile = (e: ChangeEvent, { files }: IHandleFile) => {
    const target: any = e.target;
    if (!files.length) return (target.value = null);
    const tmpFile = files[0];
    target.value = null;
    if (tmpFile.type !== "application/pdf") return;
    setFile(tmpFile);
  };

  const signer = (data: IEventSigner | any) => {
    const form = new FormData();
    form.set("file", file as any);
    form.set("visible", data.isVisibled);
    Object.keys(data).forEach((attr) => form.set(attr, data[attr]));
    axios
      .post(`${import.meta.env.VITE_URL}/signers`, form, {
        responseType: "blob",
      })
      .then((res) => {
        const file = new File([res.data], "signer.pdf", {
          type: "application/pdf",
        });

        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.target = "_blank";
        a.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h4>Ejemplo del Firmador PDF para React</h4>
      <br />
      <hr />

      <br />
      <br />

      <input
        type="file"
        onChange={(e: ChangeEvent) => handleFile(e, e.target as any)}
      />

      {file?.name ? (
        <ViewerLayer
          certInfo={{
            id: 1,
            serialNumber: "000000005",
            displayTitle: "Senasa",
            urlImage:
              "http://munichaclacayo.gob.pe/portals/assets/Videos/SENASA/Senasa_Peru.png",
          }}
          file={file}
          onSigner={signer}
          onClose={() => setFile(undefined)}
        />
      ) : null}
    </div>
  );
}

export default App;
