import axiosService from "@/services/axios-service";
import { useQuery } from "@tanstack/react-query";

export interface PerformanceReport {
  Company: string;
  Date: string;
  Membership: Membership;
  SavingsLoans: SavingsLoans;
  Earnings: Earnings;
}

export interface Membership {
  TotalGroups: string;
  TotalCustomers: string;
  MembersPaid: string;
  TotalRegFeePaid: string;
}

export interface SavingsLoans {
  TotalSavings: string;
  TotalCover: string;
  TotalInterestPaid: string;
  TotalRegFeePaid: string;
  TotalSemiLoanBalance: string;
  ThirtyDaysNPA: string;
  ThirtyDaysNPABal: string;
  SixtyDaysNPA: string;
  SixtyDaysNPABal: string;
  NinetyDaysNPA: string;
  NinetyDaysNPABal: string;
  OverNinetyDaysNPA: string;
  OverNinetyDaysNPABal: string;
  NoOfLoansPaid: string;
  TotalLoansPaid: string;
}

export interface Earnings {
  AdministrationFees: string;
  EBIT: string;
}

export const getPerformanceReports = async () => {
  return (
    await axiosService.post<PerformanceReport>("", {
      RequestID: "ZawatiPerfomanceReport",
    })
  ).data;
};

export function useGetPerformanceReports() {
  return useQuery({
    queryKey: ["group-reports"],
    queryFn: () => getPerformanceReports(),
  });
}
