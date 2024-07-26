"use client";

import { Products } from "@/app/dashboard/products/page";
import { useGroupProducts } from "@/hooks/api/groups-api";
import {
  useFetchProducts,
  useSaveGroupProduct,
} from "@/hooks/api/products-api";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useParams } from "next/navigation";
import useGroupStore from "../../store";

const GroupInformation = () => {
  const params = useParams<{ id: string }>();

  const { selectedContent } = useGroupStore();

  const { isPending, data, isError, error } = useGroupProducts(params.id);
  const { mutate, isPending: isSavePending } = useSaveGroupProduct();
  const { isPending: productsLoading, data: productData } = useFetchProducts();

  const [productID, setProductID] = React.useState<string>("");

  const saveProduct = () => {
    const submitSave = {
      RequestID: "CreateGroupProducts",
      ProductID: productID,
      GroupID: params.id,
    };

    return mutate(submitSave);
  };

  return (
    <section className="mt-4">
      <div className="grid grid-flow-row  gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        <Input
          disabled
          variant="bordered"
          label={"Code"}
          value={selectedContent.GroupCode}
        />
        <Input
          disabled
          variant="bordered"
          label={"Name"}
          value={selectedContent.GroupName}
        />
        <Input
          disabled
          variant="bordered"
          label={"Description"}
          value={selectedContent.GroupDescription}
        />

        <Input
          disabled
          variant="bordered"
          label={"Phone Number"}
          value={selectedContent.PhoneNumber}
        />
        <Input
          disabled
          variant="bordered"
          label={"Registration Certification Number"}
          value={selectedContent.RegCertNo}
        />
        <Input
          disabled
          variant="bordered"
          label={"Status"}
          value={selectedContent.status === "1" ? "Active" : "Inactive"}
        />
        <Input
          disabled
          variant="bordered"
          label={"Town"}
          value={selectedContent.Town}
        />
        <Input
          disabled
          variant="bordered"
          label={"County"}
          value={selectedContent.CountyName}
        />
        <Input
          disabled
          variant="bordered"
          label={"Constituency"}
          value={selectedContent.ConstituencyName}
        />
        <Input
          disabled
          variant="bordered"
          label={"Ward"}
          value={selectedContent.WardName}
        />
      </div>
      <Divider className="my-5 h-0.5" />

      <h2 className="mb-2 text-lg font-semibold">Group Products</h2>
      <ul className="max-w-md space-y-1 list-disc list-inside mb-5">
        {isPending ? (
          <p>Loading</p>
        ) : (
          data &&
          data.map((item: Products, index: React.Key) => (
            <li key={index}>{item.ProductName}</li>
          ))
        )}
        {isError && <p>{"No group products found"}</p>}
      </ul>

      <div className="flex justify-between items-center">
        <Select
          label="Select Product"
          variant="bordered"
          className="w-5/12"
          value={[productID]}
          isLoading={productsLoading}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setProductID(e.target.value);
          }}
        >
          {productData &&
            productData.map((chama: Products) => (
              <SelectItem key={chama.ProductID} value={chama.ProductID}>
                {chama.ProductName}
              </SelectItem>
            ))}
        </Select>
        <Button
          size="lg"
          isLoading={isSavePending}
          isDisabled={isSavePending}
          onClick={saveProduct}
        >
          Save Products
        </Button>
      </div>
    </section>
  );
};

export default GroupInformation;
