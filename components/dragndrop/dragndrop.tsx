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
} from "@/components/icons/icons";
import "@/components/dragndrop/dragndrop.css";
import { Button, Spacer, Progress } from "@nextui-org/react";

const DragNdrop = ({
  onFilesSelected,
  width,
  height,
}: {
  onFilesSelected: Function;
  width: number | string;
  height: number;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      for (let i = 0; i < newFiles.length; i++) {
        newFiles[i];
        const formData = new FormData();
        formData.append("file", newFiles[i]);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            //alert("File uploaded successfully!");
          } else {
            //alert("Failed to upload file.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
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

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${files.length > 0 ? "upload-box active" : "upload-box"}`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}>
        {files.length == 0 && (
          <>
            <div className="upload-info">
              <div className="flex flex-col text-center items-center mt-4">
                <CloudUploadIcon width={50} height={50} color={"#52525b"} className="opacity-50 ms-5" />
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
                <Spacer y={3} />
                <Button variant="light" color="primary" size="sm" onClick={handleBrowse}>
                  Browse
                </Button>
              </div>
            </div>
          </>
        )}

        {files.length > 0 && (
          <div className="file-list">
            <div className="flex justify-center items-center w-full h-full">
              <table className="table-auto border-separate border-spacing-2">
                {files.map((file, index) => (
                  <>
                    <tr key={index}>
                      <td>{handleFileType(file.type)}</td>
                      <td> {file.name}</td>
                      <td>
                        <DownloadIcon
                          className="cursor-pointer"
                          onClick={() => {
                            handleDownload(file.name);
                          }}
                        />
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
                  </>
                ))}
              </table>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DragNdrop;
