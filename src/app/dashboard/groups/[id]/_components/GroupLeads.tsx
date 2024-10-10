import React from "react";
import { useParams } from "next/navigation";

import GroupMemberSelect from "./GroupMemberSelect";
import { useGetGroupLeaders } from "@/hooks/api/groups-api";

const GroupLeads = () => {
  const params = useParams<{ id: string }>();
  const { isPending, data, isError, isSuccess } = useGetGroupLeaders(params.id);

  if (isPending) {
    <>Loading</>;
  }

  if (isError) {
    <>Error</>;
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      <div>
        <GroupMemberSelect key="Chairman" label="Chairman" />
        <GroupMemberSelect label="Vice Chairman" />
        <GroupMemberSelect label="Treaserer" />
        <GroupMemberSelect label="Secretary" />
      </div>
      <div>
        <p className="text-center font-bold font-sans">Group Leads</p>
        <ul>
          {data &&
            data.map((item) => (
              <li
                key={item.RoleCode}
                className="m-3 bg-slate-300 rounded-lg p-3 dark:text-slate-900"
              >
                <p className="font-bold font-sans">{item.RoleCode}</p>
                <p className="font-mono">{item.CustomerName}</p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default GroupLeads;
