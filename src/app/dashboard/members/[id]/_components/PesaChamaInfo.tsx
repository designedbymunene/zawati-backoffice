import { useGetMemberProducts } from "@/hooks/api/members-api";
import { useParams } from "next/navigation";
import React from "react";

const PesaChamaInfo = () => {
  const params = useParams<{ id: string }>();
  const { isPending, data, isError } = useGetMemberProducts(params.id);

  return (
    <>
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
    </>
  );
};

export default PesaChamaInfo;
