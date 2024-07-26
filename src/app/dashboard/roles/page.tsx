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
} from "@nextui-org/react";
import { useFetchRoles } from "@/hooks/api/api";
import format from "date-fns/format";

export interface Roles {
    RoleID:      string;
    RoleName:    string;
    RoleCode:    string;
    DateCreated: Date;
    Status:      string;
}


const columns = [
    {
      key: "RoleID",
      label: "ID",
    },
    {
      key: "RoleName",
      label: "Role Name",
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



  const RolePage = () => {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const { isPending, isError, data, error } = useFetchRoles();

    const renderCell = React.useCallback(
        (role: Roles, columnKey: React.Key) => {
          const cellValue = role[columnKey as keyof Roles];
    
          switch (columnKey) {
            case "PermissionID":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {role.RoleID}
                  </p>
                </div>
              );
            case "RoleName":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {role.RoleName}
                  </p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {role.RoleCode}
                  </p>
                </div>
              );
              case "DateCreated":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize text-default-400">
                  {format(new Date(role?.DateCreated), "dd MMM YYY")}
                  </p>
                </div>
              );
            case "Status":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize text-default-400">
                    {statusColorMap[role.Status]}
                  </p>
                </div>
              );
            // case "actions":
            //   return (
            //     <div className="relative flex gap-2">
            //       <Tooltip content="View role">
            //         <Tooltip content="Details">
            //           <Link href={`/dashboard/role/${role.RoleID}`}>
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
            <TableBody items={data as Roles[]}>
              {(item) => (
                <TableRow key={item.RoleID}>
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

  export default RolePage;