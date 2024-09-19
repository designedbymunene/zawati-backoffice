"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {
  PiggyBankIcon,
  User2Icon,
  BanknoteIcon,
  ShieldCheck,
  GoalIcon,
} from "lucide-react";

import StatisticsCard from "@/components/shared/statisticsCard";
import PersonalInfo from "./_components/PersonalInfo";
import { useParams } from "next/navigation";
import { useGetTotalLoans } from "@/hooks/api/loans-api";
import { useGetSavings } from "@/hooks/api/savings-api";
import { thousandSeparator } from "@/lib/helper";
import PesaChamaInfo from "./_components/PesaChamaInfo";
import MemberLoans from "./_components/MemberLoans";
import MemberSavings from "./_components/MemberSavings";
import MemberSecurity from "./_components/MemberSecurity";
import MemberGoals from "./_components/MemberGoals";

const MemberProfile = () => {
  const params = useParams<{ id: string }>();

  const { data: totalLoans, isPending: isLoansPending } = useGetTotalLoans(
    params.id
  );

  const { data: totalSavings, isPending: isSavingsPending } = useGetSavings({
    RequestID: "TotalSavings",
    CustomerID: params.id,
  });

  return (
    <section>
      <div className="grid gap-6 mb-5 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color="green"
          icon={<BanknoteIcon />}
          stats={
            isLoansPending
              ? "Loading"
              : totalLoans && totalLoans.length > 0
              ? thousandSeparator(Number(totalLoans[0]?.TotalApplied))
              : "No data"
          }
          title="Total Loans"
        />
        <StatisticsCard
          color="green"
          icon={<PiggyBankIcon />}
          stats={
            isSavingsPending
              ? "Loading"
              : totalSavings && totalSavings.length > 0
              ? thousandSeparator(Number(totalSavings[0]?.TotalPaid))
              : "No data"
          }
          title="Total Savings"
        />
        {/* <StatisticsCard
          color="green"
          icon={<LandmarkIcon />}
          stats={2000}
          title=" - - "
        /> */}
        {/* <StatisticsCard
          color="blue"
          icon={<Users2Icon />}
          stats={3}
          title="Total Groups"
        /> */}
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
            key="general-details"
            title={
              <div className="flex items-center space-x-2">
                <User2Icon />
                <span>General Details</span>
              </div>
            }
          >
            <PersonalInfo />
            <PesaChamaInfo />
          </Tab>
          <Tab
            key="savings-details"
            title={
              <div className="flex items-center space-x-2">
                <PiggyBankIcon />
                <span>Savings Details</span>
              </div>
            }
          >
            <MemberSavings />
          </Tab>
          <Tab
            key="loans-details"
            title={
              <div className="flex items-center space-x-2">
                <BanknoteIcon />
                <span>Loan Details</span>
              </div>
            }
          >
            <MemberLoans />
          </Tab>
          <Tab
            key="goals-details"
            title={
              <div className="flex items-center space-x-2">
                <GoalIcon />
                <span>Goal Details</span>
              </div>
            }
          >
            <MemberGoals />
          </Tab>
          <Tab
            key="security-details"
            title={
              <div className="flex items-center space-x-2">
                <ShieldCheck />
                <span>Security Details</span>
              </div>
            }
          >
            <MemberSecurity />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default MemberProfile;
