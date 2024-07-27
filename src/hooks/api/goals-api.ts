import { ErrorMessage } from "@/app/dashboard/loans/_components/FixedLoanDrawer";
import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface NotFoundResponse {
  ResultCode: string;
  ResultDesc: string;
  Message: string;
}

export interface GoalMembers {
  CustomerID: string
  Country: string
  CountyName: string
  ConstituencyName: string
  FirstName: string
  OtherNames: string
  IDNumber: string
  PhoneNumber: string
  YearOfBirth: string
  Gender: string
  EconomicSector: string
  DateJoined: string
}

export const useFetchGoalMembers = () => {
  return useQuery({
    queryKey: ["goal-members"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupMembers",
        GroupID: "66",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

export interface Goal {
  RowNo: string
  GoalName: string
  GoalDescription: string
  Period: string
  DateStarted: string
  Status: string
  TotalSaving: string
  CashOut: string
  InterestEarned: number
  TotalSavings: number
}

export const useFetchAllGoals = (id: string) => {
  return useQuery({
    queryKey: ["goals", id],
    queryFn: () => getGoals(id)
  });
};

 const getGoals = async (id: string) => {
  try {
    const response = await axiosService.post<NotFoundResponse | Goal[]>("", {
      RequestID: "GetMyGoals",
      CustomerID: id,
    });
    const data = response.data;

    if (!data) {
      throw new Error("No data received");
    }

    if ((data as NotFoundResponse)?.ResultCode === "0") {
      throw new Error((data as NotFoundResponse)?.Message);
    }

    return data as Goal[];
  } catch (error: AxiosError<ErrorMessage> | any) {
    const errorMessage = error?.response?.data?.Message || error?.message;
    throw new Error(errorMessage || "An error occurred");
  }
};

export interface GoalTransaction {
  GoalName: string
  TransactionType: string
  Amount: string
  Status: string
}

export const useFetchGoalTransactions = ({
  customer,
  goal
}: { customer: string; goal: string }) => {
  return useQuery({
    queryKey: ["goal-transactions", goal],
    queryFn: () => getMyLastTransactions(customer, goal)
  });
};

const getMyLastTransactions = async (customer: string, goal: string) => {
  try {
    const response = await axiosService.post<NotFoundResponse | GoalTransaction[]>("", {
     "RequestID": "GetMyLastTransactions",
    "CustomerID": customer,
    "GoalID": goal
    });
    const data = response.data;

    if (!data) {
      throw new Error("No data received");
    }

    if ((data as NotFoundResponse)?.ResultCode === "0") {
      throw new Error((data as NotFoundResponse)?.Message);
    }

    return data as GoalTransaction[];
  } catch (error: AxiosError<ErrorMessage> | any) {
    const errorMessage = error?.response?.data?.Message || error?.message;
    throw new Error(errorMessage || "An error occurred");
  }
};

export interface CreateGoalsParams {
  CustomerID: string;
  GroupID: string;
  GoalName: string;
  GoalDescription: string;
  GoalPeriod: string;
  PhoneNumber: string;
  Amount: string;
}

export function useCreateGoalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGoalsParams) => createGoal(data),
    onError: (error: AxiosError<ErrorMessage>) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(errorMessage);
    },
    onSuccess: async (data, variables, context ) => {
      await queryClient.invalidateQueries({ queryKey: ["goals", variables.CustomerID] });
      toast.success(data.Message);
    },
  });
}

const createGoal = async (params: CreateGoalsParams) => {
  return (
    await axiosService.post("", {
      RequestID: "CreateGoals",
      ...params,
    })
  ).data;
};