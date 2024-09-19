import { useGetMember, useGetMemberProducts } from "@/hooks/api/members-api";
import { Button, Skeleton } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

const PesaChamaInfo = () => {
  const params = useParams<{ id: string }>();
  const customer = useGetMember(params.id);

  const { isPending, data, isError } = useGetMemberProducts(params.id);

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
        <h2 className="mb-5 text-lg font-semibold">Kenyan National ID</h2>
        {customer.isPending ? (
          <Skeleton isLoaded={customer.isPending} />
        ) : (
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <Image
              src={`https://apis.automittech.tech/${customer?.data[0].IDFront}`}
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
        )}
      </div>
    </div>
  );
};

export default PesaChamaInfo;
