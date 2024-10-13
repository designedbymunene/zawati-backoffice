"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  ChipProps,
  Input,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useParams } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";
import {
  GroupMeetingsType,
  useCreateGroupMeeting,
  useGetGroupMeetings,
  useStartGroupMeeting,
} from "@/hooks/api/meetings-api";
import { useUserStore } from "@/app/(auth)/_store";
import { CalendarCheckIcon, EyeIcon } from "lucide-react";

const columns = [
  {
    key: "GroupName",
    label: "Group Name",
  },
  {
    key: "OfficialAttending",
    label: "Official Attending",
  },
  {
    key: "MeetingStartedAt",
    label: "Time",
  },
  {
    key: "NoOfAttendees",
    label: "Number Of Attendees",
  },
  {
    key: "Penalizable",
    label: "Penalizable",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

export interface ICreateGroupMeeting {
  RequestID: string;
  GroupID: string;
  ScheduledDate: string;
  Start: string;
  End: string;
  UserID: string;
}

const GroupMeetings = () => {
  const params = useParams<{ id: string }>();
  const { user } = useUserStore();

  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const { isPending, data, isError, isSuccess } = useGetGroupMeetings({
    GroupID: params.id as string,
    UserID: user?.UserID as string,
  });
  const { mutate, isPending: isCreatePending } = useCreateGroupMeeting();
  const startMeeting = useStartGroupMeeting();
  const filterPassedTime = (time: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const onSubmit = () => {
    const data = {
      RequestID: "CreateGroupMeeting",
      GroupID: params.id,
      ScheduledDate: format(startDate as Date, "yyyy-MM-dd"),
      Start: format(startTime as Date, "hh:mm:ss"),
      End: format(endTime as Date, "hh:mm:ss"),
      UserID: user?.UserID as string,
    };

    mutate(data);
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
        case "MeetingStartedAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {meeting.MeetingStartedAt}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {meeting.MeetingEndedAt}
              </p>
            </div>
          );
        case "NoOfAttendees":
          return (
            <p className="text-bold text-sm capitalize">
              {meeting.NoOfAttendees}
            </p>
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
              <Tooltip content="Start Meeting">
                <Button
                  onClick={() => startMeeting.mutate(meeting.MeetingsID)}
                  isIconOnly
                  variant="ghost"
                >
                  <CalendarCheckIcon className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <section className="flex-1">
      <Accordion variant="bordered">
        <AccordionItem key="1" aria-label="Set Meetings" title="Set Meetings">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              withPortal
              dateFormat="MMMM d, yyyy"
              customInput={
                <Input label={"Schedule Date"} variant="bordered" size="lg" />
              }
            />
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              withPortal
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
              customInput={
                <Input label={"Set Add Time"} variant="bordered" size="lg" />
              }
            />
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              withPortal
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
              customInput={
                <Input label={"Set End Time"} variant="bordered" size="lg" />
              }
            />
          </div>
          <Button
            isLoading={isCreatePending}
            isDisabled={isCreatePending}
            onClick={onSubmit}
            className="my-5 justify-self-end"
          >
            Save Meetings
          </Button>
        </AccordionItem>
      </Accordion>
      {isPending && <>Loading</>}
      {isSuccess && (
        <Table
          isHeaderSticky
          aria-label="Meetings Table"
          className="mt-10"
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
            items={data as GroupMeetingsType[]}
            isLoading={isPending}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item) => (
              <TableRow key={item.MeetingsID}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {isError && <>No Group Meetings found</>}
    </section>
  );
};

export default GroupMeetings;
