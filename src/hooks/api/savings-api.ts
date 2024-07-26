import axiosService from "@/services/axios-service";
import { useQuery } from "@tanstack/react-query";

export interface GetSavingsType {
  SavingID: string;
  GroupID: string;
  CustomerID: string;
  ProductID: string;
  SavingsTypeID: string;
  MpesaTransactionID: string;
  Amount: string;
  PaymentReference: string;
  DateCreated: Date;
  DatePaid: Date;
  LastUpdatedOn: string;
  Status: string;
  AMountPaid: string;
  PaymentBalance: string;
  BalanceType: string;
  TransactionType: string;
  ScheduledDate: string;
}

const useGetSavings = (body: {}) => {
  return useQuery({
    queryKey: ["savings", body],
    queryFn: async () => {
      return (await axiosService.post("", body)).data;
    },
  });
};

export interface TotalPaidType {
  TotalPaid: string;
}

export { useGetSavings };
