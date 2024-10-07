"use client";

import React, { Fragment } from "react";
import { useParams } from "next/navigation";

import { ExcelFile, ExcelSheet } from "react-xlsx-wrapper";
import {
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  Table,
} from "@nextui-org/react";
import { useUserStore } from "@/app/(auth)/_store";
import TopContent from "@/components/shared/TopContent";
import { axiosInstance } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const EOYGroupReport = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserStore();

  const {
    isPending,
    isError,
    error,
    isSuccess,
    data: reportData,
  } = useGetEOYGroupReports({
    GroupID: id,
    UserID: user?.UserID as string,
  });

  const refinedData: EOYDetail[] =
    isError || isPending ? [] : reportData.Details;

  const excel_data = [
    {
      ySteps: 1,
      xSteps: 1,
      columns: [
        { title: "Group Name" },
        { title: " " },
        { title: "Town" },
        { title: " " },
        { title: "County" },
        { title: " " },
        { title: "Constituency" },
        { title: " " },
        { title: "Ward" },
      ],
      data: [
        [
          reportData?.GroupName as string,
          "" as string,
          reportData?.Town as string,
          "" as string,
          reportData?.County as string,
          "" as string,
          reportData?.Ward as string,
        ],
      ],
    },
    {
      ySteps: 5,
      xSteps: 0,
      columns: [
        {
          title: "Member Number",
        },
        {
          title: "Member Name",
        },
        {
          title: "ID Number",
        },
        {
          title: "Phone Number",
        },
        {
          title: "Date Joined",
        },
        {
          title: "Total Savings",
        },
        {
          title: "Total Interest Repayments",
        },
        {
          title: "Semi-Loan Balance",
        },
        {
          title: "Semi-Loan Interest Balance",
        },
        {
          title: "Loan Interest Balance",
        },
        {
          title: "Actual Payout",
        },
      ],
      data: [
        ...refinedData.map((report) => [
          report.CustomerNo,
          `${report.FirstName}  ${report.OtherNames}`,
          report.IDNumber,
          report.phone_number,
          report.DateJoined,
          Number(report.TotalSavings).toLocaleString(),
          Number(report.TotalInterestRepayments).toLocaleString(),
          Number(report.SemiLoanBalance).toLocaleString(),
          Number(report.SemiLoanInterestBalance).toLocaleString(),
          Number(report.LoanInterestBalance).toLocaleString(),
          Number(report.ActualPayout).toLocaleString(),
        ]),
      ],
    },
  ];

  const renderCell = React.useCallback(
    (report: EOYDetail, columnKey: React.Key) => {
      const cellValue = report[columnKey as keyof EOYDetail];

      switch (columnKey) {
        case "FirstName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {`${report.FirstName} ${report.OtherNames}`}
              </p>
            </div>
          );
        case "IDNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {report.IDNumber}
              </p>
            </div>
          );

        case "phone_number":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {report.phone_number}
              </p>
            </div>
          );
        case "TotalSavings":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.TotalSavings).toLocaleString()}
              </p>
            </div>
          );
        case "TotalInterestRepayments":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.TotalInterestRepayments).toLocaleString()}
              </p>
            </div>
          );
        case "SemiLoanBalance":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.SemiLoanBalance).toLocaleString()}
              </p>
            </div>
          );
        case "SemiLoanInterestBalance":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.SemiLoanInterestBalance).toLocaleString()}
              </p>
            </div>
          );
        case "LoanInterestBalance":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.LoanInterestBalance).toLocaleString()}
              </p>
            </div>
          );
        case "ActualPayout":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {Number(report.ActualPayout).toLocaleString()}
              </p>
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  const group_name = reportData?.GroupName;

  const DownloadButton = () => {
    if (isSuccess) {
      return (
        <ExcelFile
          filename={`Group ${reportData?.GroupName} ~ End Of Year Reports`}
          element={
            <button className="h-12 w-full rounded-md bg-green-600 px-3">
              Download Report
            </button>
          }
        >
          <ExcelSheet dataSet={excel_data} name="Organization" />
        </ExcelFile>
      );
    }
  };

  return (
    <Fragment>
      <Table
        isHeaderSticky
        aria-label="EOY Report table"
        topContent={<TopContent right={DownloadButton()} />}
        classNames={{
          base: "max-h-[620px]",
          table: "min-h-[100px]",
        }}
      >
        <TableHeader columns={EOYGroup_columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isPending}
          items={refinedData}
          emptyContent={error?.response?.data?.Message as string}
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow key={item.CustomerID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default EOYGroupReport;

export interface EOYDetail {
  CustomerID: string;
  CustomerNo: string;
  FirstName: string;
  OtherNames: string;
  IDNumber: string;
  phone_number: string;
  DateJoined: string;
  TotalSavings: number;
  TotalInterestRepayments: number;
  SemiLoanBalance: number;
  SemiLoanInterestBalance: number;
  LoanInterestBalance: number;
  ActualPayout: null;
}

export interface EOYGroup {
  GroupName: string;
  Status: string;
  Town: string;
  County: string;
  Constituency: string;
  Ward: string;
  Details: EOYDetail[];
}

interface QueryEOYGroup {
  GroupID: string;
  UserID: string;
}

export const getEOYGroupReports = async (data: QueryEOYGroup) => {
  return (
    await axiosInstance.post<EOYGroup>("", {
      RequestID: "EOYZawatiPayoutReprt",
      ...data,
    })
  ).data;
};

export function useGetEOYGroupReports(data: QueryEOYGroup) {
  return useQuery({
    queryKey: ["group-reports"],
    queryFn: () => getEOYGroupReports(data),
  });
}

export const EOYGroup_columns = [
  {
    key: "FirstName",
    label: "Member Name",
  },
  {
    key: "IDNumber",
    label: "ID Number",
  },
  {
    key: "phone_number",
    label: "Phone Number",
  },
  {
    key: "TotalSavings",
    label: "Total Savings",
  },
  {
    key: "TotalInterestRepayments",
    label: "Total Interest Repayments",
  },
  {
    key: "SemiLoanBalance",
    label: "Semi-Loan Balance",
  },
  {
    key: "SemiLoanInterestBalance",
    label: "Semi-Loan Interest Balance",
  },
  {
    key: "LoanInterestBalance",
    label: "Loan Interest Balance",
  },
  {
    key: "ActualPayout",
    label: "Actual Payout",
  },
];
