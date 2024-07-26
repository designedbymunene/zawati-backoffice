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
  Button,
} from "@nextui-org/react";
import Link from "next/link";

import { EyeIcon } from "lucide-react";
import { GoalMembers, useFetchGoalMembers } from "@/hooks/api/goals-api";
import CreateGoalDrawer from "./_components/CreateGoalDrawer";



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
    key: "actions",
    label: "Actions",
  },
];

const GoalsPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { isPending, isError, data, error } = useFetchGoalMembers();
  const renderCell = React.useCallback(
    (member: GoalMembers, columnKey: React.Key) => {
      const cellValue = member[columnKey as keyof GoalMembers];

      switch (columnKey) {
        case "FirstName":
          return (
            <User
              description={member.DateJoined}
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
                {member.YearOfBirth}
              </p>
            </div>
          );
        case "Gender":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.Gender}</p>
            </div>
          );
        case "actions":
          return (
            <Tooltip content="View Goals">
              <Link href={`/dashboard/goals/${member.CustomerID}`}>
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
        aria-label="Goal Member table"
        topContent={
          <div className="flex flex-row justify-between items-center">
            {/* <Input
              className="w-80"
              placeholder="Search member"
              startContent={<SearchIcon />}
            /> */}
            <div />
            <Button onClick={() => setModalOpen(true)}>Create Goal</Button>
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
        <TableBody items={data as GoalMembers[]}>
          {(item) => (
            <TableRow key={item.CustomerID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CreateGoalDrawer
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};
export default GoalsPage