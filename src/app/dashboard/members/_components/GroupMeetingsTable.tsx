"use client";

import React from "react";

import {
  Button,
  Chip,
  Spinner,
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { CalendarCheck, CheckCheck, EyeIcon, Trash } from "lucide-react";

import { statusColorMap } from "@/utils/utils";
import { GroupMeeting, GroupMeetingsType, meetings_column } from "../_types";
import { ErrorMessage } from "@/types/users";
import { useCloseGroupMeetings } from "@/hooks/api/meetings-api";
import TopContent from "@/components/shared/TopContent";
import Link from "next/link";
import { splitDateAndTime } from "@/lib/helper";

interface MeetingsTableProps {
  isPending: boolean;
  isError: boolean;
  data: GroupMeeting[] | undefined;
  error: AxiosError<ErrorMessage, unknown> | null;
  topContent?: React.ReactNode;
}

const GroupMeetingsTable: React.FC<MeetingsTableProps> = ({
  isPending,
  isError,
  data,
  error,
  topContent,
}) => {
  const { id } = useParams<{ id: string }>();

  const createCloseMeetingMutation = useCloseGroupMeetings();

  const onHandleSubmit = (id: string) => {
    return createCloseMeetingMutation.mutate(id);
  };

  const renderCell = React.useCallback(
    (meeting: GroupMeetingsType, columnKey: React.Key) => {
      const cellValue = meeting[columnKey as keyof GroupMeetingsType];

      switch (columnKey) {
        case "GroupName":
          return (
            <User description={meeting.MeetingsID} name={meeting.GroupName} />
          );
        case "OfficialAttending":
          return (
            <p className="text-bold text-sm capitalize">
              {meeting.OfficialAttending}
            </p>
          );
        case "ScheduledDate":
          return (
            <p className="text-bold text-sm capitalize">
              {/* {splitDateAndTime(meeting.ScheduledDate).date} */}
              {meeting.ScheduledDate}
            </p>
          );
        case "MeetingStartedAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {splitDateAndTime(meeting.MeetingStartedAt).time}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {splitDateAndTime(meeting.MeetingEndedAt).time}
              </p>
            </div>
          );

        case "Penalizable":
          return (
            <p className="text-bold text-sm capitalize">
              {meeting.Penalizable}
            </p>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[meeting.Status]}
              size="sm"
              variant="flat"
            >
              {meeting.Status === "1" ? "Active" : "Not-Active"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Open Meeting">
                <Link href={`/dashboard/meetings/${meeting.MeetingsID}`}>
                  <Button isIconOnly variant="ghost">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </Tooltip>
              {/* <Tooltip content="Mark as done">
                <Button
                  isIconOnly
                  variant="ghost"
                  onClick={() =>
                    createCloseMeetingMutation.mutate(meeting.MeetingsID)
                  }
                  isLoading={createCloseMeetingMutation.isPending}
                  isDisabled={createCloseMeetingMutation.isPending}
                >
                  <CalendarCheck className="h-4 w-4" />
                </Button>
              </Tooltip> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [createCloseMeetingMutation]
  );

  const refinedData = isError || isPending ? [] : data;

  return (
    <Table
      isHeaderSticky
      aria-label="All Meetings Table"
      topContent={
        <TopContent
          right={topContent}
          left={<p className="text-lg">Pending Meetings</p>}
        />
      }
      classNames={{
        base: "max-h-[620px]",
        table: "min-h-[120px]",
      }}
    >
      <TableHeader columns={meetings_column}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={isPending}
        items={refinedData}
        emptyContent={error?.response?.data?.Message as string}
        loadingContent={<Spinner label="Loading ..." />}
      >
        {(item) => (
          <TableRow key={item.MeetingsID}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GroupMeetingsTable;
