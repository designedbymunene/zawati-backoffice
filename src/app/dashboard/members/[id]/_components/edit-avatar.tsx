import { Input } from "@/components/ui/input";
import { Avatar } from "@nextui-org/react";
import React from "react";

const EditAvatar = () => {
  return (
    <div className="pt-4">
      <p className="py-2 mb-1">Upload avatar</p>
      <div className="flex flex-row justify-around items-center">
        <Avatar
          isBordered
          size="lg"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className="w-20 h-20 "
        />
        <Input id="picture" type="file" className="max-w-[320px]" />
      </div>
    </div>
  );
};

export default EditAvatar;
