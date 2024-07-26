import { Loans } from "@/app/dashboard/loans/page";
import { useFetchLoans } from "@/hooks/api/loans-api";
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Chip,
  User,
  ChipProps,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";

const columns = [
  {
    key: "LoanNo",
    label: "Loan",
  },
  {
    key: "FirstName",
    label: "Name",
  },
  {
    key: "PhoneNumber",
    label: "Phone Number",
  },
  {
    key: "IDNUmber",
    label: "ID Number",
  },
  {
    key: "TotalLoan",
    label: "Total Loan",
  },
  {
    key: "ScheduledDate",
    label: "Scheduled Date",
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
  "1": "success",
  "0": "danger",
};

const MemberLoans = () => {
  const params = useParams<{ id: string }>();
  const body = {
    RequestID: "GetLoans",
    CustomerID: params.id,
  };
  const { isPending, isError, data, error } = useFetchLoans(body);

  const renderCell = React.useCallback((group: Loans, columnKey: React.Key) => {
    const cellValue = group[columnKey as keyof Loans];

    switch (columnKey) {
      case "LoanNo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{group.LoanNo}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {group.LoanType}
            </p>
          </div>
        );
      case "FirstName":
        return (
          <User
            name={group.FirstName + " " + group.OtherNames}
            description={group.GroupName}
          />
        );
      case "PhoneNumber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{group.PhoneNumber}</p>
          </div>
        );
      case "IDNUmber":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{group.IDNUmber}</p>
          </div>
        );
      case "TotalLoan":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{group.TotalLoan}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {group.LoanPeriod}
            </p>
          </div>
        );
      case "ScheduledDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {format(new Date(group.ScheduledDate), "dd MMM YYY")}
            </p>
          </div>
        );
      case "Status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[group.Status]}
            size="sm"
            variant="flat"
          >
            {group.Status === "1" ? "active" : "not active"}
          </Chip>
        );
      case "actions":
        return (
          <span></span>
          // <Tooltip content="Details">
          //   <Link href={`/dashboard/groups/${group.LoanNo}`}>
          //     <Button isIconOnly variant="bordered" aria-label="View">
          //       <EyeIcon className="h-4 w-4" />
          //     </Button>
          //   </Link>
          // </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isPending) {
    return <>Pending</>;
  }

  if (isError) {
    return <>No Loans Found!</>;
  }

  return (
    <Table
      isHeaderSticky
      aria-label="Loan table"
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data as Loans[]}>
        {(item) => (
          <TableRow key={item.LoanNo}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as any}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemberLoans;
