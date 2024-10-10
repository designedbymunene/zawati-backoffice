"use client";

import { useState, useCallback } from "react";
import StatisticsCard from "@/components/shared/statisticsCard";
import { SearchIcon, LoaderIcon } from "lucide-react";
import { useDate } from "@/hooks/useDate";
import { useDebounce } from "@uidotdev/usehooks";
import { useUserStore } from "../(auth)/_store";
import { useGetGroupMeetings } from "@/hooks/api/meetings-api";
import { Input } from "@nextui-org/react";
import GroupMeetingsTable from "./members/_components/GroupMeetingsTable";
import { useGetPerformanceReports } from "./reports/_services.tsx";

export default function DashboardHome() {
  const { user } = useUserStore();

  const { date, time, wish } = useDate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const groupsMeetingsQuery = useGetGroupMeetings({
    GroupName: debouncedSearchTerm,
    UserID: user?.UserID as string,
  });

  const dashboardStatistics = useGetPerformanceReports();

  const topContent = useCallback(() => {
    return (
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
    );
  }, [searchTerm, setSearchTerm]);

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
        {!dashboardStatistics.isPending ? (
          // TODO: STL, MTL, LTL Balances (charts)
          // TODO: Goals - Target and Current (charts)
          <>
            <StatisticsCard
              // icon={<Users2Icon />}
              stats={dashboardStatistics?.data?.Membership?.TotalGroups}
              title="Total Groups"
            />
            <StatisticsCard
              // icon={<LandmarkIcon />}
              stats={dashboardStatistics?.data?.Membership?.TotalCustomers}
              title="Total Members"
            />
            <StatisticsCard
              // icon={<BanknoteIcon />}
              stats={dashboardStatistics?.data?.Membership?.MembersPaid}
              title="Members Paid"
            />
            {/* Admin Section */}
            {user?.Role === "Admin" && (
              <>
                <StatisticsCard
                  // icon={<PiggyBankIcon />}
                  stats={dashboardStatistics?.data?.SavingsLoans?.TotalSavings}
                  title="Total Contributions"
                />

                <StatisticsCard
                  // icon={<Users2Icon />}
                  stats={dashboardStatistics?.data?.SavingsLoans?.TotalCover}
                  title="Total Cover"
                />
                <StatisticsCard
                  // icon={<Users2Icon />}
                  stats={
                    dashboardStatistics?.data?.SavingsLoans?.TotalRegFeePaid
                  }
                  title="Total Registration Fee Paid"
                />
                <StatisticsCard
                  // icon={<Users2Icon />}
                  stats={
                    dashboardStatistics?.data?.SavingsLoans?.TotalLoansPaid
                  }
                  title="Total Loans Paid"
                />
                <StatisticsCard
                  // icon={<Users2Icon />}
                  stats={
                    dashboardStatistics?.data?.SavingsLoans?.TotalInterestPaid
                  }
                  title="Total Interest Paid"
                />
                <StatisticsCard
                  // icon={<Users2Icon />}
                  stats={
                    dashboardStatistics?.data?.SavingsLoans
                      ?.TotalSemiLoanBalance
                  }
                  title="Total Semi Loan Balance"
                />
              </>
            )}
          </>
        ) : (
          <div className="flex">
            <LoaderIcon />
            &nbsp;
            <p>Loading ...</p>
          </div>
        )}
      </div>
      <GroupMeetingsTable
        isError={groupsMeetingsQuery.isError}
        isPending={groupsMeetingsQuery.isPending}
        data={groupsMeetingsQuery.data}
        error={groupsMeetingsQuery.error}
        topContent={topContent()}
      />
    </section>
  );
}
