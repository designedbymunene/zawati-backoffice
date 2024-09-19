"use client";

import { useState, useEffect } from "react";
import StatisticsCard from "@/components/shared/statisticsCard";
import {
  BanknoteIcon,
  PiggyBankIcon,
  LandmarkIcon,
  Users2Icon,
  SearchIcon,
} from "lucide-react";
import { useDate } from "@/hooks/useDate";
import { useDebounce } from "@uidotdev/usehooks";
import { useUserStore } from "../(auth)/_store";
import { useGetGroupMeetings } from "@/hooks/api/meetings-api";
import { Input } from "@nextui-org/react";
import GroupMeetingsTable from "./members/_components/GroupMeetingsTable";

export default function DashboardHome() {
  const { user } = useUserStore();

  const { date, time, wish } = useDate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const groupsMeetingsQuery = useGetGroupMeetings({
    GroupName: debouncedSearchTerm,
    UserID: user?.UserID as string,
  });

  return (
    <section>
      <div className="flex flex-row justify-between items-center mb-5">
        <div>
          <p className="text-3xl font-serif font-bold">
            {wish} {user.UserName} 👋
          </p>
          <p className="text-xl font-sans">{date}</p>
        </div>
      </div>
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color="green"
          icon={<BanknoteIcon />}
          stats={""}
          title="Total Loans"
        />
        <StatisticsCard
          color="green"
          icon={<PiggyBankIcon />}
          stats={100}
          title="Total Savings"
        />
        <StatisticsCard
          color="green"
          icon={<LandmarkIcon />}
          stats={2000}
          title="Total Members"
        />
        <StatisticsCard
          color="blue"
          icon={<Users2Icon />}
          stats={300}
          title="Total Groups"
        />
      </div>
      <GroupMeetingsTable
        isError={groupsMeetingsQuery.isError}
        isPending={groupsMeetingsQuery.isPending}
        data={groupsMeetingsQuery.data}
        error={groupsMeetingsQuery.error}
        topContent={
          <Input
            label="Search"
            isClearable
            value={searchTerm}
            onClear={() => setSearchTerm("")}
            radius="lg"
            className="w-100"
            placeholder="Type to search..."
            startContent={<SearchIcon />}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        }
      />
    </section>
  );
}
