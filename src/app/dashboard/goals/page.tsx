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
  Spinner,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";

import { EyeIcon } from "lucide-react";
import { GoalMembers, useFetchGoalMembers } from "@/hooks/api/goals-api";

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
  const [page, setPage] = useState(1);

  const { isPending, isError, data, error, isSuccess } = useFetchGoalMembers({
    Offset: String(page - 1),
    Limit: "10",
  });

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

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Goal Member table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={10}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
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
          items={isSuccess ? (data as GoalMembers[]) : isError ? [] : []}
          isLoading={isPending}
          emptyContent={isError ? error.message : "No members found"}
          loadingContent={<Spinner label="Loading ..." />}
        >
          {(item) => (
            <TableRow key={item.CustomerID}>
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
export default GoalsPage;
