"use client";

import { axiosInstance } from "@/services/api";
import React from "react";
import { CustomerData } from "../_types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useUserStore } from "@/app/(auth)/_store";
import useGroupStore from "../../groups/store";
import ErrorPage from "@/components/shared/ErrorPage";
import PendingState from "@/components/shared/PendingState";
import GroupDetails from "../../groups/[id]/_components/group-details";

const PayoutReport = () => {
  const params = useParams<{ id: string }>();
  const { user } = useUserStore();
  const { selectedContent } = useGroupStore();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["payout-report"],
    queryFn: () =>
      getMemberPayoutReport({
        CustomerID: params.id,
        GroupID: selectedContent?.GroupNo as string,
        UserID: user?.UserID as string,
      }),
  });

  if (isPending) {
    return <PendingState />;
  }

  if (isError) {
    return (
      <ErrorPage
        error={error}
        message={"Something went wrong. Please try again later."}
        link={`/dashboard/members/${params.id}`}
        button="Back to Member Details"
      />
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Information</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Group Details</h2>
        <p>
          <strong>Group Name:</strong> {data.GroupDetails.GroupName}
        </p>
        <p>
          <strong>Status:</strong> {data?.GroupDetails.Status}
        </p>
        <p>
          <strong>Town:</strong> {data?.GroupDetails.Town || "N/A"}
        </p>
        <p>
          <strong>County:</strong> {data?.GroupDetails.County}
        </p>
        <p>
          <strong>Constituency:</strong> {data?.GroupDetails.Constituency}
        </p>
        <p>
          <strong>Ward:</strong> {data?.GroupDetails.Ward}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p>
          <strong>Customer Number:</strong>{" "}
          {data?.CustomerDetails.CustomerNumber || "N/A"}
        </p>
        <p>
          <strong>Customer Name:</strong> {data?.CustomerDetails.CustomerName}
        </p>
        <p>
          <strong>ID Number:</strong> {data?.CustomerDetails.IDNumber}
        </p>
        <p>
          <strong>Phone Number:</strong> {data?.CustomerDetails.PhoneNumber}
        </p>
        <p>
          <strong>Date Joined:</strong>{" "}
          {new Date(data?.CustomerDetails.DateJoined).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Earnings</h2>
        <p>
          <strong>Savings:</strong> {data?.CustomerEarnings.Savings || "N/A"}
        </p>
        <p>
          <strong>Interest Paid:</strong>{" "}
          {data?.CustomerEarnings.InterestPaid || "N/A"}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Loans</h2>
        <p>
          <strong>STL Balance:</strong> {data?.CustomerLoans.SemiLoanBalance}
        </p>
        <p>
          <strong>STL Interest Balance:</strong>{" "}
          {data?.CustomerLoans.SemiLoanInterestBalance}
        </p>
        <p>
          <strong>Loan Balance:</strong> {data?.CustomerLoans.LoanBalance}
        </p>
        <p>
          <strong>Loan Interest Balance:</strong>{" "}
          {data?.CustomerLoans.LoanInterestBalance}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Payout</h2>
        <p>
          <strong>Actual Payout:</strong> {data?.CustomerPayout.ActualPayout}
        </p>
      </div>
    </div>
  );
};

export default PayoutReport;

interface PayoutReportRequest {
  GroupID: string;
  CustomerID: string;
  UserID: string;
}

const getMemberPayoutReport = async (payload: PayoutReportRequest) => {
  return (
    await axiosInstance.post<CustomerData>("", {
      RequestID: "ZawatiMemberPayoutReport",
      ReportUse: "ExitMember",
      ...payload,
    })
  ).data;
};
