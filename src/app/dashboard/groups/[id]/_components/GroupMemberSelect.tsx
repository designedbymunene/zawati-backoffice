import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import { useParams } from "next/navigation";

import {
  useCreateGroupLeaders,
  useGetGroupMembers,
} from "@/hooks/api/groups-api";

interface GroupMemberSelectProps {
  label: string;
}

const GroupMemberSelect: React.FC<GroupMemberSelectProps> = ({ label }) => {
  const params = useParams<{ id: string }>();
  const { isPending, data, isError, isSuccess } = useGetGroupMembers(params.id);

  const [value, setValue] = React.useState<React.Key | null>("");
  const onSelectionChange = (key: React.Key | null) => {
    setValue(key);
  };

  const { mutate, isPending: createLeaderPending } = useCreateGroupLeaders();

  const onSubmit = () => {
    const submitData = {
      RequestID: "CreateGroupLeaders",
      GroupID: params.id,
      CustomerID: value as string,
      RoleName: label,
      UserID: "1",
    };

    return mutate(submitData);
  };

  if (isPending) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Group has no members!</p>;
  }

  return (
    <div className="flex w-full flex-col my-6">
      <Autocomplete
        key={label}
        className="w-full"
        variant="bordered"
        isLoading={isPending}
        defaultItems={data}
        label={label}
        onSelectionChange={onSelectionChange}
        startContent={
          <UserSearchIcon
            className="text-default-400"
            strokeWidth={2.5}
            size={20}
          />
        }
      >
        {(item) => (
          <AutocompleteItem
            key={item.CustomerID}
            textValue={item.Firstname + " " + item.OtherNames}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.Firstname + " " + item.OtherNames}
                  className="flex-shrink-0"
                  size="sm"
                  name={item.Firstname + " " + item.OtherNames}
                />
                <div className="flex flex-col">
                  <span className="text-small">
                    {item.Firstname + " " + item.OtherNames}
                  </span>
                  <span className="text-tiny text-default-400">
                    {item.EconomicSector}
                  </span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button
        size="lg"
        className="mt-2"
        isLoading={createLeaderPending}
        isDisabled={createLeaderPending}
        onClick={onSubmit}
      >
        Save {label}
      </Button>
    </div>
  );
};

export default GroupMemberSelect;
