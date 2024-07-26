"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {
  AppWindowIcon,
  CalendarIcon,
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

const ViewGroup = () => {
  const params = useParams();
  const { data, isPending, isSuccess } = useGetGroupMembers(
    params.id as string
  );

  return (
    <section>
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color="green"
          icon={<Users2Icon />}
          stats={isPending ? "Loading" : data?.length}
          title="Total Members"
        />
        <StatisticsCard
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
        />
        <StatisticsCard
          color="blue"
          icon={<CalendarIcon />}
          stats={"12th Jun 2023"}
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
        </Tabs>
      </div>
    </section>
  );
};

export default ViewGroup;
