import React, { useEffect, useState, useRef } from "react";
import {
  DeleteIcon,
  CloudUploadIcon,
  DocIcon,
  XLSIcon,
  ImgIcon,
  TxtIcon,
  PDFIcon,
  DownloadIcon,
  FileUnknownIcon,
  AlertCircleIcon,
} from "@/components/icons/Icons_temp";
import "@/components/dragndrop/DragAndDrop.css";
import { Button, Spacer, Progress, Tooltip } from "@nextui-org/react";
import { toast } from "sonner";

const DragNdrop = ({
  onFilesSelected,
  width,
  height,
  fileName,
  srNumber,
}: {
  onFilesSelected: Function;
  width: number | string;
  height: number;
  fileName?: string;
  srNumber?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFailed, setIsFailed] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    console.log(srNumber);

    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      for (let i = 0; i < newFiles.length; i++) {
        newFiles[i];
        const formData = new FormData();
        formData.append("file", newFiles[i]);
        formData.append("srNumber", srNumber ?? "");

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            //alert("File uploaded successfully!");
            setIsFailed(false);
            onFilesSelected(newFiles[i]);
          } else {
            toast.error("Error uploading file", { duration: 3000, position: "top-right" });
          }
        } catch (error) {
          toast.error("Error uploading file", { duration: 3000, position: "top-right" });
          alert("Error uploading file.");
        }
      }
    }

    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDownload = async (file: string) => {
    const response = await fetch(`/documents/${srNumber}/${file}`);
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

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleGetFile = async (fileName: string) => {
    // Realizar la solicitud HTTP para obtener el archivo
    const response = await fetch("/documents/" + srNumber + "/" + fileName);

    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      setIsFailed(true);
      toast.error("Error downloading file", { duration: 3000, position: "top-right" });
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear un objeto File a partir del Blob
    const file = new File([blob], fileName, {
      type: blob.type,
    });

    return file;
  };

  const handleFileType = (file: string) => {
    if (file == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return <DocIcon />;
    else if (file.includes("jpg") || file.includes("jpeg") || file.includes("png")) return <ImgIcon />;
    else if (file == "application/pdf") return <PDFIcon />;
    else if (file == "text/plain") return <TxtIcon />;
    else if (file == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return <XLSIcon />;
    else return <FileUnknownIcon />;
  };
  useEffect(() => {
    console.log(fileName);
    if (fileName != undefined && fileName != "") {
      if (fileName.includes("/")) fileName = fileName.split("/")[1];
      handleGetFile(fileName).then((file) => {
        setFiles((prevFiles) => [file]);
        onFilesSelected(file);
      });
    } else {
      setFiles([]);
    }
  }, []);

  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${files.length > 0 ? "upload-box active" : "upload-box"}`}
        onDrop={handleDrop}
        onClick={handleBrowse}
        onDragOver={(event) => event.preventDefault()}>
        {files.length == 0 && (
          <>
            <div className="upload-info">
              <div className="flex flex-col text-center items-center mt-4">
                <CloudUploadIcon
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    opacity: 0.05,
                  }}
                />
                <div style={{ zIndex: 10 }}>
                  <p className="text-xs" style={{ color: "#52525b" }}>
                    Drag and drop your files here
                  </p>
                  <p className="text-xs" style={{ color: "#52525b" }}>
                    Limit 1.5MB per file. Supported files: .pdf, .docx, .jpg, .png, .txt, .xlsx
                  </p>
                  <input
                    type="file"
                    hidden
                    id="browse"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.jpg,.png,.txt,.xlsx"
                  />
                  {/* <Spacer y={3} />
                  <Button variant="light" color="primary" size="sm" onClick={handleBrowse}>
                    Browse
                  </Button> */}
                </div>
              </div>
            </div>
          </>
        )}

        {files.length > 0 && (
          <div className="file-list">
            <div className="flex justify-center items-center w-full h-full">
              <table className="table-auto border-separate border-spacing-2">
                {files.map((file, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{handleFileType(file.type)}</td>
                      <td> {file.name}</td>
                      <td>
                        {isFailed ? (
                          <Tooltip content="File not found. Download unavailable" color="danger">
                            <div>
                              <AlertCircleIcon />
                            </div>
                          </Tooltip>
                        ) : (
                          <DownloadIcon
                            className="cursor-pointer"
                            onClick={() => {
                              handleDownload(file.name);
                            }}
                          />
                        )}
                      </td>
                      <td className="file-actions">
                        <DeleteIcon onClick={() => handleRemoveFile(index)} />
                      </td>
                    </tr>
                    <tr>
                      <td></td>

                      <td>
                        <Progress color="warning" size="sm" value={(file.size / 1500000) * 100} />
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        )}
        {/* 
        {files.length > 0 && (
          <div className="success-file">
            <p>{files.length} file(s) selected</p>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default DragNdrop;
