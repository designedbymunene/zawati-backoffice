"use client";
import {
  Button,
  Card,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import EditAvatar from "./edit-avatar";
import { Trash2Icon } from "lucide-react";
import { useGetMember } from "@/hooks/api/members-api";
import { useParams } from "next/navigation";

const MemberGeneralDetails = () => {
  const params = useParams<{ id: string }>();
  const { isPending, isError, error, data } = useGetMember(params.id);

  if (isPending) {
    return <>Loading Data...</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <section className="w-full ">
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <Card className="max-w-[500px] p-6">
          <p className="text-lg">Personal Information</p>
          <EditAvatar />
          <div className="mt-4">
            <Input
              className="my-4"
              type="name"
              variant={"bordered"}
              label="First Name"
              value={data[0]?.FirstName + " " + data[0]?.OtherNames}
            />
            <Input
              className="my-4"
              type="name"
              variant={"bordered"}
              label="Email Address"
            />
            <Input
              className="my-4"
              type="name"
              variant={"bordered"}
              label="Phone Number"
              value={data[0]?.PhoneNumber}
            />
            <Input
              className="my-4"
              type="name"
              variant={"bordered"}
              label="Gender"
              value={data[0]?.Gender}
            />
          </div>
        </Card>
        <Card className="max-w-[500px] p-6">
          <p className="text-lg">Additional Information</p>
          <Input className="my-4" variant={"bordered"} label="Next of kin" />
          <div className="flex w-full my-4">
            <Select label="Next of kin (Relationship)" variant="bordered">
              {["Parents", "Children", "Siblings"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Divider />
          <Input className="my-4" variant={"bordered"} label="Work Sector" />
          <div className="flex w-full my-4">
            <Select label="Occupation" variant="bordered">
              {["Yes", "No"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Divider />
          <Input
            className="my-4"
            variant={"bordered"}
            label="Physical Address"
          />

          <div className="flex w-full my-4">
            <Select label="Province" variant="bordered">
              {["Bas-Uele", "Equateur", "Kasai"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full my-4">
            <Select label="Territory" variant="bordered">
              {["Anketi", "Bikoro", "Dekese"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
        </Card>
        <Card className="max-w-[500px] p-6">
          <p className="text-lg">Zawati Information</p>
          <div className="flex w-full my-4">
            <Select label="Select Group" variant="bordered">
              {["Group A", "Group B", "Group C"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full my-4">
            <Select
              selectionMode="multiple"
              label="Select Product"
              variant="bordered"
            >
              {["Chama 100", "Chama 300", "Chama 500"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Divider />
          <div className="flex w-full my-4">
            <Select label="Status" variant="bordered">
              {["Active", "In-active", "Pending"].map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </Select>
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-5">
        <Button color="primary" className="mx-2">
          Update Member
        </Button>
        <Button
          variant="bordered"
          color="danger"
          className="mx-2"
          startContent={<Trash2Icon />}
        >
          Delete Member
        </Button>
      </div>
    </section>
  );
};

export default MemberGeneralDetails;
