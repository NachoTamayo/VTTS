import { DocIcon, XLSIcon, ImgIcon, PDFIcon, DownloadIcon } from "../../icons/Icons";
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
      setDocument(<DocIcon width={36} height={36} />);
    } else if (file.includes(".xls")) {
      setDocument(<XLSIcon width={36} height={36} />);
    } else if (file.includes(".pdf")) {
      setDocument(<PDFIcon width={36} height={36} />);
    } else {
      setDocument(<ImgIcon width={36} height={36} />);
    }
  }, [file]);

  if (!document) {
    return null;
  }

  return (
    <div className="flex">
      {document}
      <Spacer />
      <div className="flex items-center">
        <p className="text-sm">{file}</p>

        <Spacer x={8} />
        {
          <DownloadIcon
            className="cursor-pointer"
            onClick={() => {
              handleDownload(file);
            }}
          />
        }
      </div>
    </div>
  );
};
