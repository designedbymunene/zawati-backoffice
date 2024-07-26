import { GetSavingsType, useGetSavings } from "@/hooks/api/savings-api";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  Table,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

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

const MemberSavings = () => {
  const params = useParams<{ id: string }>();
  const body = {
    RequestID: "GetSavings",
    CustomerID: params.id,
  };
  const { isPending, isError, data, error } = useGetSavings(body);

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

        default:
          return cellValue;
      }
    },
    []
  );

  if (isPending) {
    return <>Pending</>;
  }

  if (isError) {
    return <>No Savings Found!</>;
  }

  return (
    <Table
      isHeaderSticky
      aria-label="Savings table"
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data as GetSavingsType[]}>
        {(item) => (
          <TableRow key={item.SavingID}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as any}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemberSavings;
