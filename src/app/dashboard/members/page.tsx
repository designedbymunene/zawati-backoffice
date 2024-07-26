"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  User,
  Input,
  Button,
} from "@nextui-org/react";
import { EyeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useFetchAllMembers } from "@/hooks/api/members-api";
import AddMembersDrawer from "./_components/AddMembersDrawer";

interface Members {
  CustomerID: string;
  FirstName: string;
  OtherNames: string;
  DateOfBirth: string;
  Gender: string;
  Address: string;
  IDNumber: string;
  PhoneNumber: string;
  WorkSector: string;
  DateCreated: Date;
  County: string;
  SubCounty: string;
}

const columns = [
  {
    key: "FirstName",
    label: "Name",
  },

  {
    key: "PhoneNumber",
    label: "Phone Number",
  },
  {
    key: "IDNumber",
    label: "ID Number",
  },
  {
    key: "DateOfBirth",
    label: "Date of birth",
  },
  {
    key: "Gender",
    label: "Gender",
  },
  {
    key: "County",
    label: "County",
  },
  {
    key: "SubCounty",
    label: "SubCounty",
  },

  {
    key: "actions",
    label: "Actions",
  },
];

const MembersPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { isPending, isError, data, error } = useFetchAllMembers();

  const renderCell = React.useCallback(
    (member: Members, columnKey: React.Key) => {
      const cellValue = member[columnKey as keyof Members];

      switch (columnKey) {
        case "FirstName":
          return (
            <User
              description={member.WorkSector}
              name={member.FirstName + " " + member.OtherNames}
            />
          );
        case "PhoneNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {member.PhoneNumber}
              </p>
            </div>
          );
        case "IDNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.IDNumber}</p>
            </div>
          );
        case "DateOfBirth":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {member.DateOfBirth}
              </p>
            </div>
          );
        case "Gender":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.Gender}</p>
            </div>
          );
        case "County":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.County}</p>
            </div>
          );
        case "SubCounty":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.SubCounty}</p>
            </div>
          );
        // case "status":
        //   return (
        //     <Chip
        //       className="capitalize"
        //       color={statusColorMap[member.status]}
        //       size="sm"
        //       variant="flat"
        //     >
        //       {cellValue === 1 ? "active" : "not active"}
        //     </Chip>
        //   );
        case "actions":
          return (
            <Tooltip content="View member">
              <Link href={`/dashboard/members/${member.CustomerID}`}>
                <Button isIconOnly variant="bordered" aria-label="View">
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </Link>
            </Tooltip>
          );
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
        aria-label="Group table"
        topContent={
          <div className="flex flex-row justify-between items-center">
            {/* <Input
              className="w-80"
              placeholder="Search member"
              startContent={<SearchIcon />}
            /> */}
            <div />
            <Button onClick={() => setModalOpen(true)}>Create Member</Button>
          </div>
        }
        // bottomContent={
        //   <div className="flex w-full justify-center">
        //     <Pagination
        //       isCompact
        //       showControls
        //       showShadow
        //       color="secondary"
        //       page={page}
        //       total={pages}
        //       onChange={(page) => setPage(page)}
        //     />
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
        <TableBody items={data as Members[]}>
          {(item) => (
            <TableRow key={item.CustomerID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddMembersDrawer
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default MembersPage;
