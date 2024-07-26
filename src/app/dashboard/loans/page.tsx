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
	User,
	ChipProps,
	Button,
	Link,
	Tooltip,
} from "@nextui-org/react";
import { useFetchLoans } from "@/hooks/api/loans-api";
import ScheduleLoanDrawer from "./_components/ScheduleLoanDrawer";
import { format } from "date-fns";
import FixedLoanDrawer from "./_components/FixedLoanDrawer";
import { EyeIcon } from "lucide-react";
import useScheduleStore from "./_components/scheduleStore";

export interface Loans {
	LoanID: string;
	GroupName: string;
	ProductName: string;
	FirstName: string;
	OtherNames: string;
	IDNUmber: string;
	PhoneNumber: string;
	LoanNo: string;
	LoanType: string;
	LoanApplied: string;
	LoanApproved: string;
	Status: string;
	LoanPeriod: string;
	TotalLoan: string;
	ScheduledDate: Date;
}

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

	{
		key: "actions",
		label: "Actions",
	},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
	"1": "success",
	"0": "danger",
};

const LoansPage = () => {
	const { onSelectedReference } = useScheduleStore();
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [isModalOpenFixed, setModalOpenFixed] = useState<boolean>(false);

	const body = {
		RequestID: "GetLoans",
	};

	const { isPending, isError, data, error } = useFetchLoans(body);

	const renderCell = React.useCallback((group: Loans, columnKey: React.Key) => {
		const cellValue = group[columnKey as keyof Loans];

		const data = JSON.stringify({
			id: group.LoanID,
			reference: group.LoanNo,
		});

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
					<Tooltip content="View loan">
						<Link
							href={`/dashboard/loans/${group.LoanID}?reference=${group.LoanNo}`}
						>
							<Button isIconOnly variant="bordered" aria-label="View">
								<EyeIcon className="h-4 w-4" />
							</Button>
						</Link>
					</Tooltip>
				);
			default:
				return cellValue;
		}
	}, []);

	if (isPending) {
		return <>Pending</>;
	}

	if (isError) {
		return <>Error</>;
	}

	return (
		<>
			<Table
				isHeaderSticky
				aria-label="Loan table"
				topContent={
					<div className="flex flex-row justify-between items-center">
						{/* <Input
                className="w-80"
                placeholder="Search group"
                startContent={<SearchIcon />}
              /> */}
						<div />
						<div>
							<Button className="mr-3" onClick={() => setModalOpenFixed(true)}>
								Fixed Loan
							</Button>
							<Button onClick={() => setModalOpen(true)}>Schedule Loan</Button>
						</div>
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
			<ScheduleLoanDrawer
				isOpen={isModalOpen}
				onOpenChange={() => setModalOpen(!isModalOpen)}
			/>
			<FixedLoanDrawer
				isOpen={isModalOpenFixed}
				onOpenChange={() => setModalOpenFixed(!isModalOpenFixed)}
			/>
		</>
	);
};

export default LoansPage;
