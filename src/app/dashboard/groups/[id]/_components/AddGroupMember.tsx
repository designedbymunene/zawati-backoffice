import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Props } from "@/components/CustomDrawer";
import { MemberType, useFetchAllMembers } from "@/hooks/api/members-api";
import { useParams } from "next/navigation";
import { useAddGroupMember } from "@/hooks/api/groups-api";

const AddGroupMember: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const params = useParams<{ id: string }>();

  const { isPending, error, isError, data } = useFetchAllMembers();
  const { mutate, isPending: isSavePending } = useAddGroupMember();

  const [member, setMember] = React.useState<React.Key | null>("");

  const saveGroupMember = () => {
    const saveMember = {
      RequestID: "CreateGroupMember",
      GroupID: params.id,
      CustomerID: member as string,
    };
    mutate(saveMember);
  };

  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Group Member
            </ModalHeader>
            <ModalBody className="h-48 justify-center">
              <Autocomplete
                variant="bordered"
                isLoading={isPending}
                defaultItems={data as MemberType[]}
                label="Pick a Member"
                placeholder="Select a Member"
                onSelectionChange={(key) => setMember(key)}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.CustomerID}
                    textValue={item.FirstName + " " + item.OtherNames}
                    className="capitalize"
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={item.FirstName}
                        className="flex-shrink-0"
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {item.FirstName + " " + item.OtherNames}
                        </span>
                        <span className="text-tiny text-default-400">
                          {item.WorkSector}
                        </span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Button
                isLoading={isSavePending}
                isDisabled={isSavePending}
                className="my-5"
                onClick={saveGroupMember}
              >
                Save Member
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddGroupMember;
