import { DocIcon, XLSIcon, ImgIcon, PDFIcon, DownloadIcon } from "../icons/icons";
import { useEffect, useState } from "react";
import { Spacer } from "@nextui-org/react";

interface AttachedDocumentProps {
  file: string;
}

const handleDownload = async (file: string) => {
  const response = await fetch(`/documents/${file}`);
  if (response.status === 200) {
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else {
    console.error("Error downloading file");
  }
};

export const AttachedDocument: React.FC<AttachedDocumentProps> = ({ file }) => {
  const [document, setDocument] = useState<JSX.Element | null>(null);
  useEffect(() => {
    if (file.includes(".doc")) {
      setDocument(<DocIcon className="cursor-pointer" />);
    } else if (file.includes(".xls")) {
      setDocument(<XLSIcon className="cursor-pointer" />);
    } else if (file.includes(".pdf")) {
      setDocument(<PDFIcon className="cursor-pointer" />);
    } else {
      setDocument(<ImgIcon className="cursor-pointer" />);
    }
  }, [file]);

  if (!document) {
    return null;
  }

  return (
    <div className="flex">
      {document}
      <Spacer />
      {file} <Spacer x={2} />
      {
        <DownloadIcon
          className="cursor-pointer"
          onClick={() => {
            handleDownload(file);
          }}
        />
      }
    </div>
  );
};
