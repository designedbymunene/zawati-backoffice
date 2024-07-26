"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  User,
  ChipProps,
  Pagination,
  Input,
  Button,
} from "@nextui-org/react";
import { EyeIcon, SearchIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { GroupMembersType, useGetGroupMembers } from "@/hooks/api/groups-api";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import AddGroupMember from "./AddGroupMember";

const columns = [
  {
    key: "Firstname",
    label: "Name",
  },

  {
    key: "phone_number",
    label: "Phone Number",
  },
  {
    key: "IDNumber",
    label: "ID Number",
  },
  {
    key: "Gender",
    label: "Gender",
  },
  {
    key: "YearOfBirth",
    label: "Year Of Birth",
  },
  {
    key: "DateJoined",
    label: "Date Joined",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const GroupMembersPage = () => {
  const params = useParams<{ id: string }>();

  const { isPending, data, isError } = useGetGroupMembers(params.id);

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const renderCell = React.useCallback(
    (member: GroupMembersType, columnKey: React.Key) => {
      const cellValue = member[columnKey as keyof GroupMembersType];

      switch (columnKey) {
        case "Firstname":
          return (
            <User
              description={member.EconomicSector}
              name={member.Firstname + " " + member.OtherNames}
            />
          );
        case "phone_number":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {member.PhoneNumber}
              </p>
            </div>
          );
        case "IDNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.IDNumber}</p>
            </div>
          );
        case "Gender":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.Gender}</p>
              {/* <p className="text-bold text-sm capitalize text-default-400">
                {member.marital_status}
              </p> */}
            </div>
          );
        case "YearOfBirth":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {member.YearOfBirth}
              </p>
            </div>
          );
        case "DateJoined":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {format(new Date(member.DateJoined), "dd MMM YYY")}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex gap-2">
              <Tooltip content="View member">
                <Link href={`/dashboard/members/${member.CustomerID}`}>
                  <Button isIconOnly variant="bordered" aria-label="View">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const disableButton = data && data.length >= 30;

  if (isPending) {
    return <>Pending</>;
  }

  if (isError) {
    return (
      <>
        <p>No Members</p>
        <Button isDisabled={disableButton} onClick={() => setModalOpen(true)}>
          Add Group Member
        </Button>
        <AddGroupMember
          isOpen={isModalOpen}
          onOpenChange={() => setModalOpen(!isModalOpen)}
        />
      </>
    );
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Group table"
        topContent={
          <div className="flex flex-row justify-between">
            <Input
              className="w-80"
              placeholder="Search member"
              startContent={<SearchIcon />}
            />
            <div />
            <Button
              isDisabled={disableButton}
              onClick={() => setModalOpen(true)}
            >
              Add Group Member
            </Button>
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.IDNumber}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddGroupMember
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default GroupMembersPage;
