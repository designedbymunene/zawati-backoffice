import axiosService from "@/services/axios-service";
import { useQuery } from "@tanstack/react-query";

const useGetCounty = () => {
  return useQuery({
    queryKey: ["county"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetCounty",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

const useGetConstituency = (countyId: string) => {
  return useQuery({
    queryKey: countyId ? ["constituency", countyId] : ["constituency"],
    queryFn: async () => {
      if (countyId) {
        let bodyContent = JSON.stringify({
          RequestID: "GetConstituency",
          CountyID: countyId,
        });

        return (await axiosService.post("", bodyContent)).data;
      } else {
        return [];
      }
    },
  });
};

const useGetWards = (constituencyId: string) => {
  return useQuery({
    queryKey: constituencyId ? ["ward", constituencyId] : ["ward"],
    queryFn: async () => {
      if (constituencyId) {
        let bodyContent = JSON.stringify({
          RequestID: "GetWard",
          ConstituencyID: constituencyId,
        });

        return (await axiosService.post("", bodyContent)).data;
      } else {
        return [];
      }
    },
  });
};

export { useGetCounty, useGetConstituency, useGetWards };
