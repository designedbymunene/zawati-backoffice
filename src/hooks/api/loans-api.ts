import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFetchLoans = (body: object) => {
  return useQuery({
    queryKey: ["loans", body],
    queryFn: async () => {
      return (await axiosService.post("", body)).data;
    },
  });
};

const useScheduleLoans = () => {
  return useMutation({
    mutationFn: (scheduleLoan) => {
      return axiosService.post("", scheduleLoan);
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

export interface GetLoanTypes {
  LoanTypeNo: string;
  LoanType: string;
  Slug: string;
  Description: string;
  NoOfInstallments: string;
  LimitMultiplier: string;
  LimitIncrease: string;
  InterestPercentage: string;
  LowerLimit: string;
  UpperLimit: string;
  RiskLevel: string;
  LoanPriority: string;
  DateCreated: Date;
  Status: string;
}

const useGetLoanTypes = () => {
  return useQuery({
    queryKey: ["loanType"],
    queryFn: async () => {
      const bodyContent = JSON.stringify({
        RequestID: "GetLoanTypes",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

export interface TotalLoans {
  TotalApplied: string;
  TotalApproved: string;
  LoanInterest: string;
  TotalFees: string;
  LoanInsurance: string;
}

const useGetTotalLoans = (id: string) => {
  return useQuery({
    queryKey: ["loans", id],
    queryFn: async () => {
      const bodyContent = JSON.stringify({
        RequestID: "GetTotals",
        CustomerID: id,
      });

      return (await axiosService.post("", bodyContent)).data as TotalLoans[];
    },
  });
};

const useScheduleGroupProducts = (groupID: string) => {
  return useQuery({
    queryKey: groupID ? ["groups", groupID] : ["groups"],
    queryFn: async () => {
      if (groupID) {
        const bodyContent = JSON.stringify({
          RequestID: "GetGroupProducts",
          GroupID: groupID,
        });

        return (await axiosService.post("", bodyContent)).data;
      }
      return [];
    },
  });
};

export interface CreateFixedInterestLoanRequest {
  GroupID: string;
  ProductID: string;
  CustomerID: string;
  LoanType: string;
  LoanAmtApplied: string;
  LoanFee: string;
  LoanInsurance: string;
  LoanDuration: string;
}

const useCreateFixedInterestLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFixedInterestLoanRequest) => {
      return axiosService.post("", {
        RequestID: "CreateFixedInterestLoan",
        ...data,
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

export function useGetLoanInstallments(id: string) {
  return useQuery({
    queryKey: ["ward"],
    queryFn: async () =>
      await axiosService.post("", {
        RequestID: "GetLoanInstallments",
        LoanID: id,
      }),
  });
}

export interface PayLoanRequest {
  CustomerID: string;
  TransactionType: string;
  ReceiptNo: string;
  Amount: string;
  PaymenyReference: string | null;
  Status: string;
}

const usePayLoan = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PayLoanRequest) => {
      return axiosService.post("", {
        RequestID: "PayLoan",
        ...data,
      });
    },
    onSuccess(data, variables, context) {
      // queryClient.invalidateQueries({ queryKey: ["groups-leader"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
    // onSettled: async (_, error) => {
    //   if (error) {
    //     // console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["pay-loan"] });
    //   }
    // },
  });
};

export {
  useFetchLoans,
  useScheduleLoans,
  useGetLoanTypes,
  useGetTotalLoans,
  useScheduleGroupProducts,
  useCreateFixedInterestLoan,
  usePayLoan,
};
