import { useUserStore } from "@/app/(auth)/_store";
import useGroupStore from "@/app/dashboard/groups/store";
import { axiosInstance } from "@/services/api";
import { Button } from "@nextui-org/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { use } from "react";
import toast from "react-hot-toast";
import { ExcelFile, ExcelSheet } from "react-xlsx-wrapper";

const ExitMember = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useUserStore();
  const { selectedContent } = useGroupStore();

  const createMemberPayout = useCreateMemberPayoutReport();
  const createExitMember = useCreateExitMember();

  const handleExitMember = () => {
    const data = {
      GroupID: selectedContent?.GroupCode as string,
      CustomerID: id,
      UserID: user?.UserID as string,
    };
    createExitMember.mutate(data);
  };

  const handleSubmitRequest = () => {
    const data = {
      GroupID: selectedContent?.GroupNo,
      CustomerID: id,
      ReportUse: "ExitMember",
      UserID: user?.UserID as string,
    };
    createMemberPayout.mutate(data);
  };

  const report_data = [
    {
      ySteps: 1,
      xSteps: 0,
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
          createMemberPayout.data?.GroupDetails?.GroupName as string,
          "" as string,
          createMemberPayout.data?.GroupDetails?.Town as string,
          "" as string,
          createMemberPayout.data?.GroupDetails?.County as string,
          "" as string,
          createMemberPayout.data?.GroupDetails?.Ward as string,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Customer Details" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [
        {
          title: "Customer Number",
        },
        {
          title: "Customer Name",
        },
        {
          title: "ID Number",
        },
        {
          title: "Phone Number",
        },
        {
          title: "DateJoined",
        },
      ],
      data: [
        [
          createMemberPayout.data?.CustomerDetails?.CustomerNumber,
          createMemberPayout.data?.CustomerDetails?.CustomerName,
          createMemberPayout.data?.CustomerDetails?.IDNumber,
          createMemberPayout.data?.CustomerDetails?.PhoneNumber,
          createMemberPayout.data?.CustomerDetails?.DateJoined,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Customer Loans" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [
        {
          title: "STL Balance",
        },
        {
          title: "STL Interest Balance",
        },
        {
          title: "Loan Balance",
        },
        {
          title: "Loan Interest Balance",
        },
      ],
      data: [
        [
          createMemberPayout.data?.CustomerLoans?.SemiLoanBalance,
          createMemberPayout.data?.CustomerLoans?.SemiLoanInterestBalance,
          createMemberPayout.data?.CustomerLoans?.LoanBalance,
          createMemberPayout.data?.CustomerLoans?.LoanInterestBalance,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Customer Earnings" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [
        {
          title: "Savings",
        },
        {
          title: "InterestPaid",
        },
      ],
      data: [
        [
          createMemberPayout.data?.CustomerEarnings?.Savings,
          createMemberPayout.data?.CustomerEarnings?.InterestPaid,
        ],
      ],
    },
    {
      ySteps: 2,
      xSteps: 0,
      columns: [{ title: "Customer Payout" }],
      data: [[]],
    },
    {
      ySteps: 0,
      xSteps: 1,
      columns: [
        {
          title: "ActualPayout",
        },
      ],
      data: [[createMemberPayout.data?.CustomerPayout?.ActualPayout]],
    },
  ];

  return (
    <div className="mt-20 ">
      <div className="flex justify-between align-middle mb-10">
        <p className="text-lg ">Exit Member</p>
        <Button
          isDisabled={createMemberPayout.isSuccess}
          isLoading={createMemberPayout.isPending}
          onClick={handleSubmitRequest}
          className="w-26"
        >
          Request Member Payroll
        </Button>
      </div>
      <div className="flex justify-around align-center">
        {createMemberPayout.isSuccess && (
          <ExcelFile
            filename={`${createMemberPayout.data?.CustomerDetails?.CustomerName} Payload Reports`}
            element={
              <button className="h-12 w-full rounded-md bg-orange-600">
                Download Member Payout Report
              </button>
            }
          >
            <ExcelSheet dataSet={report_data} name="Organization" />
          </ExcelFile>
        )}

        {createMemberPayout.isSuccess && (
          <Button
            isLoading={createExitMember.isPending}
            onClick={handleExitMember}
            className="w-26"
          >
            Exit Member
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExitMember;

export interface MemberPayoutQuery {
  GroupID: string | undefined | null;
  CustomerID: string;
  ReportUse: string;
  UserID: string;
}

const createMemberPayoutReport = async (data: MemberPayoutQuery) => {
  return (
    await axiosInstance.post("", {
      RequestID: "ZawatiMemberPayoutReport",
      ...data,
      ReportUse: "ExitMember",
    })
  ).data;
};

export function useCreateMemberPayoutReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberPayoutQuery) => createMemberPayoutReport(data),
    onError: (error) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(errorMessage);
    },
    onSuccess: (data, context) => {
      toast.success(data?.Message);
    },

    onSettled: async (_, error) => {
      if (error) {
        return error;
      }
      await queryClient.invalidateQueries({ queryKey: ["group-members"] });
    },
  });
}

export interface CreateExitMemberRequest {
  CustomerID: string;
  GroupID: string | null;
  UserID: string;
}

const createExitMember = async (data: CreateExitMemberRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "ExitMember",
      ...data,
    })
  ).data;
};

export function useCreateExitMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExitMemberRequest) => createExitMember(data),
    onError: (error) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(errorMessage);
    },
    onSuccess: (data, context) => {
      toast.success(data?.Message);
    },

    onSettled: async (_, error) => {
      if (error) {
        return error;
      }
      await queryClient.invalidateQueries({ queryKey: ["group-members"] });
    },
  });
}
