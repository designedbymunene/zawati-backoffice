import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
};

interface SaveProductsType {
  RequestID: string;
  ProductID: string;
  GroupID: string;
}

const useSaveGroupProduct = () => {
  return useMutation({
    mutationFn: (saveProduct: SaveProductsType) => {
      return axiosService.post("", saveProduct);
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
