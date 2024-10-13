"use client";

import StatisticsCard from "@/components/shared/statisticsCard";
import React from "react";
import { ExcelFile, ExcelSheet } from "react-xlsx-wrapper";
import { useGetPerformanceReports } from "./_services.tsx";

const PerformanceReport = () => {
  const { isPending, isSuccess, data, isError, error } =
    useGetPerformanceReports();

  if (isPending)
    return (
      <div className="flex">
        <p>Loading data</p>
      </div>
    );
  if (isError)
    return (
      <div className="flex">
        <p>Error on retrieving</p>
      </div>
    );

  const reportData = [
    {
      ySteps: 1,
      xSteps: 0,
      columns: [
        { title: "Total Groups" },
        { title: " " },
        { title: "Total Customers" },
        { title: " " },
        { title: "Members Paid" },
        { title: " " },
        { title: "Total Registration Fee Paid" },
      ],
      data: [
        [
          data?.Membership?.TotalGroups,
          "",
          data?.Membership?.TotalCustomers,
          "",
          data?.Membership?.MembersPaid,
          "",
          data?.Membership?.TotalRegFeePaid,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Savings Loans" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [
        { title: "Total Savings" },
        { title: "Total Cover" },
        { title: "Total Interest Paid" },
        { title: "Total Register Fee Paid" },
        { title: "Total STL Balance" },
        { title: "Thirty Days NPA" },
        { title: "Thirty Days NPA Balance" },
        { title: "Sixty Days NPA" },
        { title: "Sixty Days NPA Balance" },
        { title: "Ninety Days NPA" },
        { title: "Ninety Days NPA Balance" },
        { title: "Over Ninety Days NPA" },
        { title: "Over Ninety Days NPA Balance" },
      ],
      data: [
        [
          data?.SavingsLoans?.TotalSavings,
          data?.SavingsLoans?.TotalCover,
          data?.SavingsLoans?.TotalInterestPaid,
          data?.SavingsLoans?.TotalRegFeePaid,
          data?.SavingsLoans?.TotalSemiLoanBalance,
          data?.SavingsLoans?.ThirtyDaysNPA,
          data?.SavingsLoans?.ThirtyDaysNPABal,
          data?.SavingsLoans?.SixtyDaysNPA,
          data?.SavingsLoans?.SixtyDaysNPABal,
          data?.SavingsLoans?.NinetyDaysNPA,
          data?.SavingsLoans?.NinetyDaysNPABal,
          data?.SavingsLoans?.OverNinetyDaysNPA,
          data?.SavingsLoans?.OverNinetyDaysNPABal,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Earnings" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [{ title: "Administration Fees" }, { title: "EBIT" }],
      data: [[data?.Earnings?.AdministrationFees, data?.Earnings?.EBIT]],
    },
  ];

  return (
    <div className="flex flex-col justify-center my-4">
      <div className="flex flex-row justify-between align-center">
        <p className="my-4">Membership</p>
        <ExcelFile
          filename={`${data?.Date} Performance Reports`}
          element={
            <button className="h-12 w-full rounded-md bg-green-600 px-3">
              Download Performance Report
            </button>
          }
        >
          <ExcelSheet dataSet={reportData} name="Organization" />
        </ExcelFile>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 mb-2">
        <StatisticsCard
          title={"Total Groups"}
          stats={data?.Membership?.TotalGroups}
        />
        <StatisticsCard
          title={"Total Customers"}
          stats={data?.Membership?.TotalCustomers}
        />
        <StatisticsCard
          title={"Members Paid"}
          stats={data?.Membership?.MembersPaid}
        />
        <StatisticsCard
          title={"Total Registration Fee Paid"}
          stats={data?.Membership?.TotalRegFeePaid}
        />
      </div>
      <p className="my-4">Savings Loans</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 mb-2">
        <StatisticsCard
          title={"Total Savings"}
          stats={data?.SavingsLoans?.TotalSavings}
        />
        <StatisticsCard
          title={"Total Cover"}
          stats={data?.SavingsLoans?.TotalCover}
        />
        <StatisticsCard
          title={"Total Interest Paid"}
          stats={data?.SavingsLoans?.TotalInterestPaid}
        />
        <StatisticsCard
          title={"Total Register Fee Paid"}
          stats={data?.SavingsLoans?.TotalRegFeePaid}
        />
        <StatisticsCard
          title={"Total STL Balance"}
          stats={data?.SavingsLoans?.TotalSemiLoanBalance}
        />
        <StatisticsCard
          title={"Thirty Days NPA"}
          stats={data?.SavingsLoans?.ThirtyDaysNPA}
        />
        <StatisticsCard
          title={"Thirty Days NPA Balance"}
          stats={data?.SavingsLoans?.ThirtyDaysNPABal}
        />{" "}
        <StatisticsCard
          title={"Sixty Days NPA"}
          stats={data?.SavingsLoans?.SixtyDaysNPA}
        />{" "}
        <StatisticsCard
          title={"Sixty Days NPA Balance"}
          stats={data?.SavingsLoans?.SixtyDaysNPABal}
        />{" "}
        <StatisticsCard
          title={"Ninety Days NPA"}
          stats={data?.SavingsLoans?.NinetyDaysNPA}
        />{" "}
        <StatisticsCard
          title={"Ninety Days NPA Balance"}
          stats={data?.SavingsLoans?.NinetyDaysNPABal}
        />
        <StatisticsCard
          title={"Over Ninety Days NPA"}
          stats={data?.SavingsLoans?.OverNinetyDaysNPA}
        />
        <StatisticsCard
          title={"Over Ninety Days NPA Balance"}
          stats={data?.SavingsLoans?.OverNinetyDaysNPABal}
        />
      </div>
      <p className="my-4">Earnings</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 mb-2">
        <StatisticsCard
          title={"Administration Fees"}
          stats={data?.Earnings?.AdministrationFees}
        />
        <StatisticsCard title={"EBIT"} stats={data?.Earnings?.EBIT} />
      </div>
    </div>
  );
};

export default PerformanceReport;
