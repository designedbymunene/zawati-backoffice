"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useFetchUsers } from "@/hooks/api/api";

export interface User {
    UsedID: string
    UserName: string
    UserPassword: string
    RoleID: string
    UserRole: string
    DateCreated: string
    Status: string
    DetailsID: string
    NoOfAttempts: string
    ChangePassword: string
  };
  
const columns = [
    {
      key: "UsedID",
      label: "ID",
    },
    {
      key: "UserName",
      label: "User Name",
    },
    // {
    //   key: "DetailsID",
    //   label: "Details ID",
    // },
    {
      key: "NoOfAttempts",
      label: "Login Attempts",
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    // },
  ];

  const UserPage = () => {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const { isPending, isError, data, error } = useFetchUsers();

    const renderCell = React.useCallback(
        (role: User, columnKey: React.Key) => {
          const cellValue = role[columnKey as keyof User];
    
          switch (columnKey) {
            case "UsedID":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {role.UsedID}
                  </p>
                </div>
              );
            case "UserName":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {role.UserName}
                  </p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {role.UserRole}
                  </p>
                </div>
              );
              // case "DetailsID":
              // return (
              //   <div className="flex flex-col">
              //     <p className="text-bold text-sm capitalize text-default-400">
              //       {role.DetailsID}
              //     </p>
              //   </div>
              // );
            case "NoOfAttempts":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize text-default-400">
                   {role.NoOfAttempts}
                  </p>
                </div>
              );
            // case "actions":
            //   return (
            //     <div className="relative flex gap-2">
            //       <Tooltip content="View role">
            //         <Tooltip content="Details">
            //           <Link href={`/dashboard/role/${role.UsedID}`}>
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
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={data as User[]}>
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

  export default UserPage;