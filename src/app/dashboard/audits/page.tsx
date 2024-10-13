"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

import { useFetchAuditTrails, useFetchRoles } from "@/hooks/api/api";
import format from "date-fns/format";

export interface Audit {
  TrailID: string;
  UserName: string;
  PermissionCode: string;
  ActivityDescription: string;
  Remarks: string;
  LoginIP: string;
  TaskValue: string;
  DateCreated: Date;
  DateUpdated: Date;
}

const columns = [
  {
    key: "TrailID",
    label: "ID",
  },
  {
    key: "UserName",
    label: "User Name",
  },
  {
    key: "ActivityDescription",
    label: "Activity Description",
  },
  {
    key: "TaskValue",
    label: "Task",
  },
  {
    key: "DateCreated",
    label: "Date Created",
  },
  // {
  //   key: "actions",
  //   label: "Actions",
  // },
];

const RolePage = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const { isPending, isError, data, error, isSuccess } = useFetchAuditTrails();

  const renderCell = React.useCallback((audit: Audit, columnKey: React.Key) => {
    const cellValue = audit[columnKey as keyof Audit];

    switch (columnKey) {
      case "TrailID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {audit.TrailID}
            </p>
          </div>
        );
      case "UserName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{audit.UserName}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {audit.LoginIP}
            </p>
          </div>
        );
      case "ActivityDescription":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{audit.Remarks}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {audit.ActivityDescription}
            </p>
          </div>
        );
      case "TaskValue":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {audit.TaskValue}
            </p>
          </div>
        );
      case "DateCreated":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {format(new Date(audit?.DateCreated), "dd MMM YYY")}
            </p>
          </div>
        );
      // case "actions":
      //   return (
      //     <div className="relative flex gap-2">
      //       <Tooltip content="View audit">
      //         <Tooltip content="Details">
      //           <Link href={`/dashboard/audit/${audit.TrailID}`}>
      //             <Button isIconOnly variant="bordered" aria-label="View">
      //               <EyeIcon className="h-4 w-4" />
      //             </Button>
      //           </Link>
      //         </Tooltip>
      //       </Tooltip>
      //     </div>
      //   );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Role table"
        // topContent={
        //   <div className="flex flex-row justify-between items-center">
        //     <Input
        //       className="w-80"
        //       placeholder="Search product"
        //       startContent={<SearchIcon />}
        //     />
        //     <div />
        //     <Button onClick={() => setModalOpen(true)}>Create Permission</Button>
        //   </div>
        // }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={isSuccess ? (data as Audit[]) : isError ? [] : []}
          isLoading={isPending}
          emptyContent={isError ? error.message : "No Audits found"}
          loadingContent={<Spinner label="Loading ..." />}
        >
          {(item) => (
            <TableRow key={item.TrailID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default RolePage;
