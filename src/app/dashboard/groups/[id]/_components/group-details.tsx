import React from "react";
import { Chip, Select, SelectItem, Button, Input } from "@nextui-org/react";
import { CheckIcon, SaveAllIcon } from "lucide-react";

const GroupDetails = () => {
  return (
    <section className="flex w-full flex-col">
      <div className=" grid grid-cols-2 gap-6">
        <div>
          <div className="bg-white dark:bg-slate-800 overflow-hidden pb-3 shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium">Group Details</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the Group.
              </p>
            </div>
            <div className="border-t border-gray-500 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    TUMAINI S.H.G
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Code</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    ME/GC/040
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    +254722123456
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Ward</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    Kinshasa
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    <Chip
                      startContent={<CheckIcon size={18} />}
                      variant="bordered"
                      color="success"
                    >
                      Active
                    </Chip>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium ">Group Leads</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the group leaders.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 items-center  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Chairman
                  </dt>
                  <Input size="sm" variant={"bordered"} />
                </div>
                <div className="py-3 items-center  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-800">
                    Vice Chairman
                  </dt>
                  <Input size="sm" variant={"bordered"} />
                </div>
                <div className="py-3 items-center  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-800">
                    Secretary
                  </dt>
                  <Input size="sm" variant={"bordered"} />
                </div>
                <div className="py-3 items-center sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-800">
                    Treasurer
                  </dt>
                  <Input size="sm" variant={"bordered"} />
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 mt-5 overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium">Additional Settings</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Provide additional settings here.
          </p>
          <div className="flex flex-row grid-cols-2 gap-3">
            <div className="py-3 sm:py-5 sm:px-6 w-full">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                Select a Product
              </dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <Select
                  selectionMode="multiple"
                  variant="bordered"
                  className="max-w-xs"
                >
                  {["Chama 100", "Chama 500"].map((chama) => (
                    <SelectItem key={chama} value={chama}>
                      {chama}
                    </SelectItem>
                  ))}
                </Select>
              </dd>
            </div>
            {/* <div className="py-3 items-center sm:py-5 sm:px-6 w-full">
              <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                Select a Product
              </dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <Select selectionMode="multiple" className="max-w-xs">
                  {["Chama 100", "Chama 500"].map((chama) => (
                    <SelectItem key={chama} value={chama}>
                      {chama}
                    </SelectItem>
                  ))}
                </Select>
              </dd>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-end mt-5">
        <Button className="" color="primary" startContent={<SaveAllIcon />}>
          Save Group Details
        </Button>
      </div>
    </section>
  );
};

export default GroupDetails;
