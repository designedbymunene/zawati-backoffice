import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetProducts",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

const useGetGroupProducts = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetProducts",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct) => {
      return axiosService.post("", newProduct);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

interface SaveProductsType {
  RequestID: string;
  ProductID: string;
  GroupID: string;
}

const useSaveGroupProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (saveProduct: SaveProductsType) => {
      return axiosService.post("", saveProduct);
    },
    onSuccess: async (data, variables, context) => {
      toast.success(data.data.Message);
      return await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data?.Message);
    },
  });
};

export interface ProductFeesType {
  FeeID: string;
  FeesName: string;
  Slug: string;
  FeesDescription: string;
  FeeType: string;
  FeeMode: string;
  FeesValue: string;
}

const useGetProductFees = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetProductFees",
        ProductID: productId,
      });

      return (await axiosService.post("", bodyContent))
        .data as ProductFeesType[];
    },
  });
};

export {
  useFetchProducts,
  useCreateProduct,
  useSaveGroupProduct,
  useGetProductFees,
};
