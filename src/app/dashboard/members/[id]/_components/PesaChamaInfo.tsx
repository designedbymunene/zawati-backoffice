import { useGetMember, useGetMemberProducts } from "@/hooks/api/members-api";
import { Button, Skeleton } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { axiosInstance } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PesaChamaInfo = () => {
  const params = useParams<{ id: string }>();
  const customer = useGetMember(params.id);

  const { isPending, data, isError } = useGetMemberProducts(params.id);

  const mutation = useDeleteUploadsMutation();

  return (
    <div className=" mt-10">
      <div className="">
        <h2 className="mt-5 text-lg font-semibold">Group Products</h2>
        <ul className="max-w-md space-y-1 list-disc list-inside mb-5">
          {isPending ? (
            <p>Loading</p>
          ) : (
            data &&
            data.map((item, index: React.Key) => (
              <li key={index}>{item.ProductName}</li>
            ))
          )}
          {isError && <p>No Group Products Found!</p>}
        </ul>
      </div>
      <div className="mv-10">
        <div className="flex justify-between align-center">
          <h2 className="mb-5 text-lg font-semibold">Kenyan National ID</h2>
          <Button
            className="mb-5"
            onClick={() => mutation.mutate(params.id)}
            isDisabled={mutation.isPending}
            isLoading={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete Uploads"}
          </Button>
        </div>
        {customer.isPending ? (
          <Skeleton isLoaded={customer.isPending} />
        ) : (
          customer &&
          customer.data && (
            <>
              <div className="grid grid-cols-2 gap-4 justify-items-center">
                <Image
                  src={`https://apis.automittech.tech/${customer?.data[0]?.IDFront}`}
                  alt="Front ID"
                  width={700}
                  height={700}
                />
                <Image
                  src={`https://apis.automittech.tech/${customer?.data[0].IDBack}`}
                  alt="Back ID"
                  width={700}
                  height={700}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default PesaChamaInfo;

export const deleteUploads = async (CustomerID: string) => {
  return (
    await axiosInstance.post("", {
      RequestID: "DeleteCustomerUploads",
      CustomerID,
    })
  ).data;
};

const useDeleteUploadsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUploads,
    onSuccess: async () => {
      toast.success("Uploads Deleted Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["group-members"],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(errorMessage);
    },
  });
};
