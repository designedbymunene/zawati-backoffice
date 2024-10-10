"use client";

import React, { useState } from "react";
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
  Button,
  Input,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { EyeIcon, SearchIcon } from "lucide-react";
import AddGroupDrawer from "./_components/AddGroupDrawer";
import { useFetchAllGroups } from "@/hooks/api/groups-api";
import { GroupType } from "@/lib/types/group_type";
import useGroupStore from "./store";
import { useRouter } from "next/navigation";
import { statusColorMap } from "@/utils/utils";
import { columns } from "./columns";
import { useDebounce } from "@uidotdev/usehooks";

const GroupsPage = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // const offset = (page - 1) * 10;

  const { isPending, isError, data, error } = useFetchAllGroups({
    GroupName: debouncedSearchTerm,
    Offset: String(page - 1),
    Limit: "15",
  });

  const { onSelectedContent } = useGroupStore();

  const totalPages = 10;

  const topContent = React.useCallback(() => {
    return (
      <div className="flex flex-row justify-between items-center">
        <Input
          label="Search Group"
          isClearable
          value={searchTerm}
          onClear={() => setSearchTerm("")}
          radius="lg"
          className="w-80"
          placeholder="Search group"
          startContent={<SearchIcon />}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div />
        <Button onClick={() => setModalOpen(true)}>Add Group</Button>
      </div>
    );
  }, [searchTerm, setSearchTerm]);

  const renderCell = React.useCallback(
    (group: GroupType, columnKey: React.Key) => {
      const cellValue = group[columnKey as keyof GroupType];

      const handlePush = (group: GroupType) => {
        onSelectedContent(group);
        router.push(`/dashboard/groups/${group.GroupNo}`);
      };

      switch (columnKey) {
        case "GroupCode":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{group.GroupCode}</p>
            </div>
          );
        case "GroupName":
          return (
            <User name={group.GroupName} description={group.GroupDescription} />
          );
        case "PhoneNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {group.PhoneNumber}
              </p>
            </div>
          );
        case "CountyName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{group.CountyName}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {group.ConstituencyName}
              </p>
            </div>
          );
        case "Town":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{group.Town}</p>
            </div>
          );
        case "RegistrationDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {group.RegistrationDate}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[group.status]}
              size="sm"
              variant="flat"
            >
              {group.status === "1" ? "active" : "not active"}
            </Chip>
          );
        case "actions":
          return (
            <Tooltip content="Details" onClick={() => onSelectedContent(group)}>
              <Button
                onClick={() => handlePush(group)}
                isIconOnly
                variant="bordered"
                aria-label="View"
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </Tooltip>
          );
        default:
          return cellValue;
      }
    },
    [onSelectedContent, router]
  );

  return (
    <div className="flex-1">
      <Table
        isHeaderSticky
        aria-label="Group table"
        topContent={topContent()}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
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
        <TableBody
          items={data ? (data as GroupType[]) : []}
          isLoading={isPending}
          emptyContent="No groups found"
          loadingContent={<Spinner label="Loading ..." />}
        >
          {(item) => (
            <TableRow key={item?.GroupNo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddGroupDrawer
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </div>
  );
};

export default GroupsPage;
