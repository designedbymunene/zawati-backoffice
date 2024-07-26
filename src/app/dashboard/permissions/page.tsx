"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ChipProps,
  Chip,
} from "@nextui-org/react";

import { useFetchPermissions } from "@/hooks/api/api";
import format from "date-fns/format";

export interface Permissions {
    PermissionID:   string;
    PermissionName: string;
    PermissionCode: string;
    Priority:       string;
    DateCreated:    Date;
    Status:         string;
}

const columns = [
    {
      key: "PermissionID",
      label: "ID",
    },
    {
      key: "PermissionName",
      label: "Permission Name",
    },
    {
      key: "Priority",
      label: "Priority",
    },
    {
      key: "DateCreated",
      label: "Date Created",
    },
    {
        key: "Status",
        label: "Status",
      },
    // {
    //   key: "actions",
    //   label: "Actions",
    // },
  ];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
  };
  
  const priorityColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
  };
  

  const PermissionPage = () => {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const { isPending, isError, data, error } = useFetchPermissions();

    const renderCell = React.useCallback(
        (permission: Permissions, columnKey: React.Key) => {
          const cellValue = permission[columnKey as keyof Permissions];
    
          switch (columnKey) {
            case "PermissionID":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {permission.PermissionID}
                  </p>
                </div>
              );
            case "ProductName":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {permission.PermissionName}
                  </p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {permission.PermissionCode}
                  </p>
                </div>
              );
            case "Priority":
              return (
                <Chip
                className="capitalize"
                color={priorityColorMap[permission.Priority]}
                size="sm"
                variant="flat"
              >
                {permission.Priority === "1" ? "High" : "Normal"}
              </Chip>
                
              );
              case "DateCreated":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize text-default-400">
                  {format(new Date(permission?.DateCreated), "dd MMM YYY")}
                  </p>
                </div>      
              );
            case "Status":
              return (
                <Chip
                className="capitalize"
                color={statusColorMap[permission.Status]}
                size="sm"
                variant="flat"
              >
                {permission.Status === "1" ? "Active" : "Non Active"}
              </Chip>
              );
            // case "actions":
            //   return (
            //     <div className="relative flex gap-2">
            //       <Tooltip content="View permission">
            //         <Tooltip content="Details">
            //           <Link href={`/dashboard/permission/${permission.PermissionID}`}>
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
        },
        []
      );
    
      if (isPending) {
        return <>Pending</>;
      }
    
      if (isError) {
        return <>Error</>;
      }

      return (
        <>
          <Table
            isHeaderSticky
            aria-label="Products table"
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
            <TableBody items={data as Permissions[]}>
              {(item) => (
                <TableRow key={item.PermissionID}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </>
      );
  }

  export default PermissionPage;