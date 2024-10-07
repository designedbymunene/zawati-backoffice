"use client";

import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useParams } from "next/navigation";

import {
  useGetGroupMeetingAttendees,
  useGetGroupMeetings,
} from "@/hooks/api/meetings-api";
import ErrorPage from "@/components/shared/ErrorPage";
import PendingState from "@/components/shared/PendingState";
import { formatFriendlyDate, formatTime } from "@/lib/helper";
import { CalendarCheckIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { closeMeeting } from "@/services/api";
import toast from "react-hot-toast";

const MeetingsPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isError, isPending, error } = useGetGroupMeetingAttendees(
    params.id
  );

  const mutation = useCloseMeetingMutation();

  const renderCell = React.useCallback(
    (item: AttendingMeetingsType, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof AttendingMeetingsType];
      switch (columnKey) {
        case "CustomerNames":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.CustomerNames}
              </p>
            </div>
          );
        case "ScheduledDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {formatFriendlyDate(item.ScheduledDate)}
              </p>
            </div>
          );
        case "JoiningDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {formatTime(item.JoiningDate)}
              </p>
            </div>
          );
        case "EndedAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {formatTime(item.EndedAt)}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  if (isPending) {
    return <PendingState />;
  }

  if (isError) {
    return (
      <ErrorPage
        error={error}
        message={"Something went wrong. Please try again later."}
        link={"/dashboard"}
        button="Back to Dashboard"
      />
    );
  }

  const bottomContent = () => {
    return (
      <div className="flex flex-col gap-4">
        <Button
          color="primary"
          startContent={<CalendarCheckIcon />}
          onClick={() =>
            mutation.mutate({
              meeting_id: params.id,
              attendee_number: data.length.toString(),
            })
          }
          isDisabled={data.length === 0 || mutation.isPending}
          isLoading={mutation.isPending}
        >
          {mutation.isPending ? "Closing Meeting..." : "Close Meeting"}
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Table
        aria-label="Meetings"
        isHeaderSticky
        classNames={{
          wrapper: "min-h-[100px]",
        }}
        bottomContent={bottomContent()}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data as AttendingMeetingsType[]}>
          {(item) => (
            <TableRow key={item.CustomerNames}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const columns = [
  {
    key: "CustomerNames",
    label: "Customer Name",
  },
  {
    key: "ScheduledDate",
    label: "Scheduled Date",
  },
  {
    key: "JoiningDate",
    label: "Joining Time",
  },
  {
    key: "EndedAt",
    label: "Ended At",
  },
];

interface AttendingMeetingsType {
  GroupName: string;
  CustomerNames: string;
  ScheduledDate: string;
  JoiningDate: string;
  EndedAt: string;
}

export default MeetingsPage;

const useCloseMeetingMutation = () =>
  useMutation({
    mutationFn: closeMeeting,
    onSuccess: () => {
      toast.success("Meeting closed successfully");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(errorMessage);
    },
  });
