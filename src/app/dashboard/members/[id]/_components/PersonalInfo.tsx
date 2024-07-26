import { useGetMember } from "@/hooks/api/members-api";
import { Input } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

const PersonalInfo = () => {
  const params = useParams<{ id: string }>();
  const { isPending, isError, error, data } = useGetMember(params.id);

  if (isPending) {
    return <>Loading Data...</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div className="w-full grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      <Input
        type="name"
        variant={"bordered"}
        label="Full Name"
        value={data[0]?.FirstName + " " + data[0]?.OtherNames}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Email Address"
        value={data[0]?.Email}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Phone Number"
        value={data[0]?.PhoneNumber}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Gender"
        value={data[0]?.Gender}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Year Of Birth"
        value={data[0]?.DateOfBirth}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="ID Number"
        value={data[0]?.IDNumber}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Work Sector"
        value={data[0]?.WorkSector}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="County"
        value={data[0]?.County}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="SubCounty"
        value={data[0]?.SubCounty}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Next of kin"
        value={data[0]?.NextOfKin}
      />
      <Input
        type="name"
        variant={"bordered"}
        label="Next of kin (Relationship)"
        value={data[0]?.NextOfKinRelationship}
      />
    </div>
  );
};

export default PersonalInfo;
