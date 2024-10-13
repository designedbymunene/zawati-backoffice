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
  ChipProps,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { GetSavingsType, useGetSavings } from "@/hooks/api/savings-api";
import AddSavingsDrawer from "./[id]/AddSavingsDrawer";
import { useDebounce } from "@uidotdev/usehooks";

const columns = [
  {
    key: "PaymentReference",
    label: "Payment Reference",
  },

  {
    key: "SavingsTypeID",
    label: "Savings Type",
  },
  {
    key: "Amount",
    label: "Amount",
  },
  {
    key: "AMountPaid",
    label: "Paid Amount",
  },
  {
    key: "PaymentBalance",
    label: "Payment Balance",
  },
  {
    key: "BalanceType",
    label: "Balance Type",
  },

  {
    key: "Status",
    label: "Status",
  },
  // {
  //   key: "actions",
  //   label: "Actions",
  // },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

const balanceTypeMap: Record<string, string> = {
  0: "Underpaid",
  1: "Unpaid",
  2: "Paid",
  3: "Over payment",
};

const statusTypeMap: Record<string, string> = {
  0: "Unpaid",
  1: "Underpaid",
  2: "Fully Settled",
};

const savingTypeMap: Record<string, string> = {
  P: "Penalty",
  MF: "Membership fee",
  I: "Interest",
  C: "Contribution",
};

// interface SavingsProps {
//   CustomerID?: string;
//   GroupID?: string;
//   ProductID?: string;
// }

const SavingsPage = () => {
  const hasValues = false;
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const body = {
    RequestID: "GetSavings",
    // CustomerID: CustomerID,
    // GroupID: GroupID,
    // ProductID: ProductID,
    Offset: String(page - 1),
    Limit: "10",
  };

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const { isPending, isError, data, error, isSuccess } = useGetSavings(body);

  const renderCell = React.useCallback(
    (savings: GetSavingsType, columnKey: React.Key) => {
      const cellValue = savings[columnKey as keyof GetSavingsType];

      switch (columnKey) {
        case "PaymentReference":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {savings.PaymentReference}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {savings.MpesaTransactionID}
              </p>
            </div>
          );

        case "Amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {savings.Amount}
              </p>
            </div>
          );
        case "SavingsTypeID":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {savingTypeMap[savings.SavingsTypeID]}
              </p>
            </div>
          );
        case "AMountPaid":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {savings.AMountPaid}
              </p>
            </div>
          );
        case "PaymentBalance":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {savings.PaymentBalance}
              </p>
            </div>
          );
        case "BalanceType":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {balanceTypeMap[savings.BalanceType]}
              </p>
            </div>
          );

        case "Status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[savings.Status]}
              size="sm"
              variant="flat"
            >
              {cellValue === "1" ? "active" : "not active"}
            </Chip>
          );
        // case "actions":
        //   return (
        //     <div className="relative flex gap-2">
        //       <Tooltip content="View savings">
        //         <Link href={`/dashboard/savings/${savings.SavingID}`}>
        //           <Button isIconOnly variant="bordered" aria-label="View">
        //             <EyeIcon className="h-4 w-4" />
        //           </Button>
        //         </Link>
        //       </Tooltip>
        //     </div>
        // );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Savings table"
        topContent={
          !hasValues && (
            <div className="flex flex-row justify-between items-center">
              {/* <Input
                className="w-80"
                placeholder="Search savings"
                startContent={<SearchIcon />}
              /> */}
              <div />
              <Button onClick={() => setModalOpen(true)}>Add Savings</Button>
            </div>
          )
        }
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={10}
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
          items={isSuccess ? (data as GetSavingsType[]) : isError ? [] : []}
          isLoading={isPending}
          emptyContent={isError ? error.message : "No members found"}
          loadingContent={<Spinner label="Loading ..." />}
        >
          {(item) => (
            <TableRow key={item.SavingID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddSavingsDrawer
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default SavingsPage;
