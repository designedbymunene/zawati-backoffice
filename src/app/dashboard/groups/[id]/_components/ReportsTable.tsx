"use client";

import React, { Fragment } from "react";
import { useParams } from "next/navigation";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ExcelFile, ExcelSheet } from "react-xlsx-wrapper";
import { Button } from "@nextui-org/react";
import { axiosInstance } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const columnHelper = createColumnHelper<Detail>();

const ReportsTable = () => {
  const { id } = useParams<{ id: string }>();

  const { isPending, isError, data: reportData } = useGetReports(id);

  const refinedData: Detail[] = isError || isPending ? [] : reportData.Details;

  const columns = [
    columnHelper.accessor("CustomerNo", {
      header: "Member Number",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
    }),
    columnHelper.accessor("SavingsBF", {
      header: "Savings BF",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalSavingsBF).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("Savings", {
      header: "Savings",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => <p>{Number(reportData?.TotalSavings).toLocaleString()}</p>,
    }),
    columnHelper.accessor("SavingsCF", {
      header: "Savings CF",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalSavingsCF).toLocaleString()}</p>
      ),
    }),

    columnHelper.accessor("Cover", {
      header: "Cover",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => <p>{Number(reportData?.TotalCover).toLocaleString()}</p>,
    }),
    columnHelper.accessor("STLBalance", {
      header: "Loan Balance",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalSTLBalance).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("STLInterest", {
      header: "Loan Interest",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalSTLInterest).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("STLRepayment", {
      header: "Loan Repayment",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalSTLRepayment).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("LTLBalance", {
      header: "Semi-Loan Balance",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalLTLBalance).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("LTLInterest", {
      header: "Semi-Loan Interest",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalLTLInterest).toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor("LTLRepayment", {
      header: "Total Semi-Loan Repayment",
      cell: (info) => Number(info.renderValue()).toLocaleString(),
      footer: () => (
        <p>{Number(reportData?.TotalLTLRepayment).toLocaleString()}</p>
      ),
    }),
  ];

  const table = useReactTable({
    data: refinedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          title: "Savings BF",
        },
        {
          title: "Savings Today",
        },
        {
          title: "Savings CF",
        },
        {
          title: "Semi-Loan BF",
        },
        {
          title: "Semi-Loan Paid",
        },
        {
          title: "Semi-Loan Interest",
        },
        {
          title: "Semi-Loan CF",
        },
        {
          title: "Cover",
        },
        {
          title: "Loan BF",
        },
        {
          title: "Loan Paid",
        },
        {
          title: "Loan Interest",
        },
        {
          title: "Loan CF",
        },
      ],
      data: [
        ...refinedData.map((report) => [
          Number(report.CustomerNo).toLocaleString(),
          Number(report.SavingsBF).toLocaleString(),
          Number(report.Savings).toLocaleString(),
          Number(report.SavingsCF).toLocaleString(),
          Number(report.LTLBalance).toLocaleString(),
          Number(report.LTLRepayment).toLocaleString(),
          Number(report.LTLInterest).toLocaleString(),
          Number(report.TotalLTLBalance).toLocaleString(),
          Number(report.Cover).toLocaleString(),
          Number(report.STLBalance).toLocaleString(),
          Number(report.STLRepayment).toLocaleString(),
          Number(report.STLInterest).toLocaleString(),
          Number(report.TotalSTLBalance).toLocaleString(),
        ]),
      ],
    },
    {
      columns: [
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
        {
          title: "",
        },
      ],
      data: [
        [
          "",
          Number(reportData?.TotalSavingsBF).toLocaleString(),
          Number(reportData?.TotalSavings).toLocaleString(),
          Number(reportData?.TotalSavingsCF).toLocaleString(),
          Number(reportData?.TotalLTLBalance).toLocaleString(),
          Number(reportData?.TotalLTLRepayment).toLocaleString(),
          Number(reportData?.TotalLTLInterest).toLocaleString(),
          Number(reportData?.TotalLTLBalanceT).toLocaleString(),
          Number(reportData?.TotalCover).toLocaleString(),
          Number(reportData?.TotalSTLBalance).toLocaleString(),
          Number(reportData?.TotalSTLRepayment).toLocaleString(),
          Number(reportData?.TotalSTLInterest).toLocaleString(),
          Number(reportData?.TotalSTLBalanceT).toLocaleString(),
        ],
      ],
    },
    {
      ySteps: 3,
      xSteps: 0,
      columns: [
        { title: "Cash In" },
        { title: " " },
        { title: " " },
        // { title: "Cash Out" },
      ],
      data: [
        ["Banking", Number(reportData?.Banking).toLocaleString(), ""],
        ["Loan", Number(reportData?.TotalSTLRepayment).toLocaleString(), ""],
        [
          "Semi-Loan",
          Number(reportData?.TotalLTLRepayment).toLocaleString(),
          "",
        ],
        ["Savings", Number(reportData?.TotalSavings).toLocaleString(), ""],
      ],
    },
  ];

  return (
    <div className="p-2">
      {isPending ? (
        <p>Loading</p>
      ) : (
        <Fragment>
          <ExcelFile
            filename={`${reportData?.GroupName} Reports`}
            element={
              <button className="h-12 w-full rounded-md bg-orange-600">
                Download Reports
              </button>
            }
          >
            <ExcelSheet dataSet={excel_data} name="Reports" />
          </ExcelFile>
          <div className="h-4" />
          <table className="rounded border-2 w-full ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="w-1/4" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="border-b-2 border-r-2 p-2" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="border-b-2 border-r-2 m-6">
              {table.getRowModel().rows.map((row) => (
                <tr className="w-1/4" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="text-center py-1 border-b-3 border-r-2 align-center"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr className="w-1/4" key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th className="py-2 border-r-2" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </Fragment>
      )}
    </div>
  );
};

export default ReportsTable;

export interface GetReportsRequest {
  GroupID: string;
  StartDate: string;
  EndDate: string;
}

export interface Reports {
  GroupName: string;
  Status: string;
  Town: string;
  County: string;
  Constituency: string;
  Ward: string;
  Banking: string;
  TotalSavingsBF: number;
  TotalSavings: number;
  TotalSavingsCF: number;
  TotalInvestment1: number;
  TotalInvestment2: number;
  TotalCover: number;
  TotalSTLBalance: number;
  TotalSTLInterest: number;
  TotalSTLBalanceT: number;
  TotalSTLRepayment: number;
  TotalLTLBalance: number;
  TotalLTLInterest: number;
  TotalLTLBalanceT: number;
  TotalLTLRepayment: number;
  Details: Detail[];
}

export interface Detail {
  CustomerID: string;
  CustomerNo: string;
  FirstName: string;
  OtherNames: string;
  SavingsBF: string;
  Savings: string;
  SavingsCF: string;
  Investment1: string;
  Investment2: string;
  Cover: string;
  STLBalance: string;
  STLInterest: string;
  TotalSTLBalance: string;
  STLRepayment: number;
  LTLBalance: string;
  LTLInterest: string;
  TotalLTLBalance: string;
  LTLRepayment: number;
}

export const getReports = async (id: string) => {
  return (
    await axiosInstance.post<Reports>("", {
      RequestID: "GetZawatiReport",
      Offset: "0",
      Limit: "100",
      GroupID: id,
      StartDate: "2024-01-01",
      EndDate: "2024-03-31",
    })
  ).data;
};

export function useGetReports(id: string) {
  return useQuery({
    queryKey: ["group-reports"],
    queryFn: () => getReports(id),
  });
}
