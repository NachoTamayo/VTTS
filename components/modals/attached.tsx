import { DocIcon, XLSIcon, ImgIcon, PDFIcon } from "../icons/icons";
import { Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AttachedDocumentProps {
  file: string;
}

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
  }, [file]); // Añadir `file` como dependencia

  // Asegúrate de que el documento esté listo antes de renderizar
  if (!document) {
    return null;
  }

  return (
    <Tooltip content={file} color="primary">
      <div>{document}</div>
    </Tooltip>
  );
};
