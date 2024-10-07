"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {
  AppWindowIcon,
  CalendarIcon,
  FileSpreadsheet,
  FileStack,
  LandmarkIcon,
  PiggyBankIcon,
  Table2Icon,
  Users2Icon,
  UsersIcon,
} from "lucide-react";
import StatisticsCard from "@/components/shared/statisticsCard";
import GroupMembersPage from "./_components/GroupMembers";
import GroupLeads from "./_components/GroupLeads";
import GroupInformation from "./_components/GroupInformation";
import GroupMeetings from "./_components/GroupMeetings";
import { useGetGroupMembers } from "@/hooks/api/groups-api";
import { useParams } from "next/navigation";
import EOYGroupReport from "./_components/EOYGroupReport";
import { useUserStore } from "@/app/(auth)/_store";
import ReportsTable from "./_components/ReportsTable";
import { useGetGroupMeetings } from "@/hooks/api/meetings-api";
import { parseISO, differenceInDays, format } from "date-fns";
import ScheduleLoanTable from "./_components/ScheduleLoanTable";

export interface GroupMeetingType {
  MeetingsID: string;
  GroupName: string;
  ScheduledDate: string;
  OfficialAttending: string;
  MeetingStartedAt: string;
  MeetingEndedAt: string;
  NoOfAttendees: string;
  Penalizable: string;
  Status: string;
  OfficialComments: string;
}

function getClosestMeeting(meetings: GroupMeetingType[]) {
  const today = new Date();

  return (
    meetings &&
    meetings.reduce((closest: GroupMeetingType, current: GroupMeetingType) => {
      const currentDate = parseISO(current.ScheduledDate);
      const closestDate = parseISO(closest.ScheduledDate);

      const diffCurrent = Math.abs(differenceInDays(currentDate, today));
      const diffClosest = Math.abs(differenceInDays(closestDate, today));

      return diffCurrent < diffClosest ? current : closest;
    })
  );
}

const ViewGroup = () => {
  const params = useParams();
  const { user } = useUserStore();
  const { data, isPending, isSuccess } = useGetGroupMembers(
    params.id as string
  );

  const nextMeeting = useGetGroupMeetings({
    GroupID: params.id as string,
    UserID: user.UserID as string,
  });

  const closestMeeting = getClosestMeeting(
    nextMeeting.isPending
      ? [
          {
            MeetingsID: "",
            GroupName: "",
            ScheduledDate: "",
            OfficialAttending: "",
            MeetingStartedAt: "",
            MeetingEndedAt: "",
            NoOfAttendees: "",
            Penalizable: "",
            Status: "",
            OfficialComments: "",
          },
        ]
      : (nextMeeting?.data as GroupMeetingType[])
  );

  const formatted_day = nextMeeting.isSuccess
    ? format(new Date(closestMeeting.ScheduledDate), "d MMM yyyy")
    : " - - ";

  return (
    <section>
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color="green"
          icon={<Users2Icon />}
          stats={isPending ? "Loading" : data?.length}
          title="Total Members"
        />
        {/* <StatisticsCard
          color="green"
          icon={<PiggyBankIcon />}
          stats={"90,000"}
          title="Total Savings"
        />
        <StatisticsCard
          color="green"
          icon={<LandmarkIcon />}
          stats={"20,000"}
          title="Total Loans "
        /> */}
        <StatisticsCard
          color="green"
          icon={<CalendarIcon />}
          type={"Date"}
          stats={formatted_day}
          title="Next Meeting"
        />
      </div>

      {/* Tabs */}

      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-green-500",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-green-500",
          }}
        >
          <Tab
            key="1"
            title={
              <div className="flex items-center space-x-2">
                <AppWindowIcon />
                <span>Group Information</span>
              </div>
            }
          >
            <GroupInformation />
          </Tab>

          <Tab
            key="2"
            title={
              <div className="flex items-center space-x-2">
                <UsersIcon />
                <span>Group Leads</span>
              </div>
            }
          >
            <GroupLeads />
          </Tab>
          <Tab
            key="3"
            title={
              <div className="flex items-center space-x-2">
                <CalendarIcon />
                <span>Group Meetings</span>
              </div>
            }
          >
            <GroupMeetings />
          </Tab>

          <Tab
            key="4"
            title={
              <div className="flex items-center space-x-2">
                <Table2Icon />
                <span>Group Members</span>
              </div>
            }
          >
            <GroupMembersPage />
          </Tab>
          <Tab
            key="5"
            title={
              <div className="flex items-center space-x-2">
                <Table2Icon />
                <span>Schedule Loan</span>
              </div>
            }
          >
            <ScheduleLoanTable />
          </Tab>
          <Tab
            key="6"
            title={
              <div className="flex items-center space-x-2">
                <FileStack />
                <span>Group Reports</span>
              </div>
            }
          >
            <ReportsTable />
          </Tab>
          {user?.Role === "Admin" && (
            <Tab
              key="7"
              title={
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet />
                  <span>EOY Group Reports</span>
                </div>
              }
            >
              <EOYGroupReport />
            </Tab>
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default ViewGroup;
