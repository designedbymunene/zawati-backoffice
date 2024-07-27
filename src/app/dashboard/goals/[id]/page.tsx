"use client";

import { Goal, useFetchAllGoals } from "@/hooks/api/goals-api";
import { statusColorMap } from "@/utils/utils";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import GoalTransactions from "./GoalTransactions";

const columns = [
  {
    key: "GoalName",
    label: "Name",
  },

  {
    key: "Period",
    label: "Goal Period",
  },

  {
    key: "TotalSavings",
    label: "Total Savings",
  },
  {
    key: "DateStarted",
    label: "Date Started",
  },
  {
    key: "Status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const Page = () => {
  const params = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [goalID, setGoalID] = useState<string>("");

  const { isPending, isError, data, error } = useFetchAllGoals(params.id);
  const renderCell = React.useCallback((member: Goal, columnKey: React.Key) => {
    const cellValue = member[columnKey as keyof Goal];

    switch (columnKey) {
      case "GoalName":
        return (
          <User description={member.GoalDescription} name={member.GoalName} />
        );
      case "Period":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{member.Period}</p>
          </div>
        );
      case "TotalSavings":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {member.TotalSavings}
            </p>
          </div>
        );
      case "DateStarted":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{member.DateStarted}</p>
          </div>
        );
      case "Status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[member.Status]}
            size="sm"
            variant="flat"
          >
            {member.Status === "1" ? "active" : "not active"}
          </Chip>
        );
      case "actions":
        return (
          <Tooltip content="View Transactions">
            <Button
              isIconOnly
              variant="bordered"
              aria-label="View"
              onClick={() => {
                setGoalID(member.RowNo);
                setModalOpen(true);
              }}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isPending) {
    return <>Pending</>;
  }

  if (isError) {
    return (
      <>{error.isAxiosError ? error.response?.data?.Message : error.message}</>
    );
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Goals table"

      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data ? (data as Goal[]) : []}>
          {(item) => (
            <TableRow key={item.RowNo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {goalID && (
        <GoalTransactions
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          goal={goalID}
          customer={params.id}
        />
      )}
    </>
  );
};
export default Page;
