// "use client";

// import {
//   Modal,
//   ModalContent,
//   ModalBody,
//   ModalHeader,
//   ModalFooter,
//   Button,
//   Card,
//   CardBody,
//   SortDescriptor,
//   Chip,
// } from "@nextui-org/react";
// import React from "react";
// import { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import { toast } from "sonner";
// import { Descriptor, ServiceRequest, RowsProps, RelatedSR } from "@/helpers/interfaces";
// import { TableWrapper } from "@/components/table/Table";
// import { RenderCell } from "@/components/serviceRequest/modals/table/RenderCell";

// const columns = [
//   {
//     name: "table.header.actions",
//     hideHeader: true,
//   },
//   {
//     name: "table.header.id",
//     sortable: false,
//     hideHeader: true,
//     hideColumn: true,
//   },
//   {
//     name: "table.header.type",
//     sortable: true,
//   },
//   {
//     name: "table.header.srNumber",
//     sortable: true,
//   },
//   {
//     name: "table.header.description",
//     sortable: true,
//     width: "w-3/5",
//   },
// ];

// interface viewModalProps {
//   isOpen: boolean;
//   onOpen: () => void;
//   onOpenChange: (open: boolean) => void;
//   onClose: () => void;
//   onSubmit: () => void;
//   onCloseModal: () => void;
//   selectedId?: string;
// }

// export const ViewModal: React.FC<viewModalProps> = (props) => {
//   const t = useTranslations("ServiceRequest");
//   const g = useTranslations("Global");
//   const [rows, setRows] = useState<RowsProps[]>([]);
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "2", direction: "ascending" });
//   const [descriptor, setDescriptor] = useState<Descriptor>({ column: "srType", direction: "asc" });
//   const [ready, setReady] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("/api/v1/versionForecast?versionId=" + props.selectedId);

//       setReady(true);
//     } catch (error) {
//       console.error("Error fetching service request", error);
//     }
//   };

//   const handleClick = (id: string, option: string) => {
//     if (option === "add") {
//     }
//   };

//   const sortSRs = (serviceRequests: RowsProps[] = rows, column: keyof RowsProps) => {
//     const sortArray = [...serviceRequests].sort((a: RowsProps, b: RowsProps) => {
//       if (descriptor.direction === "asc") {
//         if (a[column] !== undefined && b[column] !== undefined && a[column] > b[column]) return 1;
//         else if (b[column] !== undefined && a[column] !== undefined && b[column] > a[column]) return -1;
//         return 0;
//       } else {
//         if (a[column] !== undefined && b[column] !== undefined && a[column] < b[column]) return 1;
//         else if (b[column] !== undefined && a[column] !== undefined && b[column] < a[column]) return -1;
//         return 0;
//       }
//     });

//     setRows(sortArray);
//   };

//   const handleSortChange = (sortDescriptor: SortDescriptor) => {
//     const column =
//       sortDescriptor.column === "2" ? "srType" : sortDescriptor.column === "3" ? "srNumber" : "description";
//     const direction = sortDescriptor.direction === "ascending" ? "asc" : "desc";
//     setDescriptor({ column, direction });
//   };

//   return (
//     <Modal
//       size="5xl"
//       isOpen={props.isOpen}
//       onOpenChange={props.onOpenChange}
//       onClose={props.onCloseModal}
//       isDismissable={false}>
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//             <ModalBody>
//               <Card shadow="sm" className="min-h-14 max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
//                 <CardBody>
//                   <div className="w-full h-full overflow-auto">
//                     <div className="flex gap-2 flex-wrap">
//                       {relatedSRs.map((related, index) => (
//                         <Chip key={index} onClose={() => handleClose(related)} variant="flat">
//                           {related.srNumber2}
//                         </Chip>
//                       ))}
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>

//               <div className="overflow-scroll max-h-96">
//                 {ready ? (
//                   <TableWrapper
//                     isHeaderSticky={true}
//                     rows={rows}
//                     columns={columns}
//                     onClick={handleClick}
//                     onSortChange={handleSortChange}
//                     sortDescriptorProp={sortDescriptor}
//                     multiLanguage="ServiceRequest"
//                     RenderCell={RenderCell}
//                   />
//                 ) : null}
//               </div>
//             </ModalBody>
//             <ModalFooter>
//               <Button size="sm" color="danger" variant="flat" onPress={onClose}>
//                 {g("cancel")}
//               </Button>
//               <Button
//                 size="sm"
//                 color="primary"
//                 onClick={() => {
//                   handleAssociate();
//                   onClose();
//                 }}>
//                 {t("table.actions.associate")}
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };
