import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, UserPlusIcon } from "lucide-react";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { members } from "@/lib/group-data";

const AddGroupMembers = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <UserPlusIcon className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="h-5/6">
        <DialogHeader>
          <DialogTitle>Search Member</DialogTitle>
          <DialogDescription>
            Select users to include in group
          </DialogDescription>
          <Autocomplete
            defaultItems={members}
            label="Search member"
            className="w-full pt-5"
          >
            {(member) => (
              <AutocompleteItem key={member.id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={member.f_name}
                      className="flex-shrink-0"
                      size="sm"
                      src={member.photo}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">
                        {member.f_name + " " + member.o_names}
                      </span>
                      <span className="text-tiny text-default-400">
                        {member.work_sector}
                      </span>
                    </div>
                  </div>
                  <Button color="black">Add</Button>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupMembers;
