import axiosService from "@/services/axios-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        let bodyContent = JSON.stringify({
          RequestID: "GetSystemUsers",
        });
  
        return (await axiosService.post("", bodyContent)).data;
      },
    });
  };


  export const useFetchPermissions = () => {
    return useQuery({
      queryKey: ["permission"],
      queryFn: async () => {
        let bodyContent = JSON.stringify({
          RequestID: "GetSystemPermissions",
        });
  
        return (await axiosService.post("", bodyContent)).data;
      },
    });
  };

  export const useFetchRoles = () => {
    return useQuery({
      queryKey: ["roles"],
      queryFn: async () => {
        let bodyContent = JSON.stringify({
          RequestID: "GetSystemRoles",
        });
  
        return (await axiosService.post("", bodyContent)).data;
      },
    });
  };

  export const useFetchAuditTrails= () => {
    return useQuery({
      queryKey: ["audit"],
      queryFn: async () => {
        let bodyContent = JSON.stringify({
          RequestID: "GetAuditTrails",
        });
  
        return (await axiosService.post("", bodyContent)).data;
      },
    });
  };