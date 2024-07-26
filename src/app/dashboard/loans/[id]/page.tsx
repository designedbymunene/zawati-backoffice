"use client";

import { useGetLoanInstallments } from "@/hooks/api/loans-api";

import {
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Table,
	Button,
} from "@nextui-org/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PayLoanDrawer from "../_components/PayLoans";

export interface LoanInstallmentType {
	InstallmentID: string;
	LoanID: string;
	InstallmentNo: string;
	Principle_Due: string;
	Interest: string;
	Fees: string;
	OtherCharges: string;
	Penalties: string;
	InstallmentStatus: string;
	OverdueStatus: string;
	InstallmentAmount: string;
	DateInstallmentPaid: string;
	PaymentReceipt: string;
	InstallmentDueDate: string;
	DateCreated: string;
	DateUpdated: string;
}

const InstallmentStatusMap: Record<string, string> = {
	0: "Default",
	1: "Underpaid",
	2: "Paid",
};

const OverdueStatusMap: Record<string, string> = {
	0: "Okay",
	1: "Overdue",
};

const columns = [
	{
		key: "LoanID",
		label: "Loan",
	},
	{
		key: "InstallmentNo",
		label: "Installment Number",
	},
	{
		key: "InstallmentAmount",
		label: "Installment Amount",
	},
	{
		key: "DateInstallmentPaid",
		label: "Date Installment Paid",
	},
	{
		key: "Principle_Due",
		label: "Principle Due",
	},
	{
		key: "Interest",
		label: "Interest",
	},
	{
		key: "Fees",
		label: "Fees",
	},
	{
		key: "OtherCharges",
		label: "OtherCharges",
	},
	{
		key: "Penalties",
		label: "Penalties",
	},
];

const LoanPage = () => {
	const params = useParams<{ id: string }>();

	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const searchParams = useSearchParams();

	const reference = searchParams.get("reference");

	const loanInstallmentQuery = useGetLoanInstallments(params.id);
	const renderCell = React.useCallback(
		(installment: LoanInstallmentType, columnKey: React.Key) => {
			const cellValue = installment[columnKey as keyof LoanInstallmentType];

			switch (columnKey) {
				case "LoanID":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">{reference}</p>
						</div>
					);
				case "InstallmentNo":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.InstallmentNo}
							</p>
							<p className="text-bold text-sm capitalize text-default-400">
								{InstallmentStatusMap[installment.InstallmentStatus]}
							</p>
						</div>
					);
				case "InstallmentAmount":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.InstallmentAmount}
							</p>
							<p className="text-bold text-sm capitalize text-default-400">
								{installment.InstallmentDueDate}
							</p>
						</div>
					);
				case "DateInstallmentPaid":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.DateInstallmentPaid}
							</p>
							<p className="text-bold text-sm capitalize text-default-400">
								{OverdueStatusMap[installment.OverdueStatus]}
							</p>
						</div>
					);
				case "Principle_Due":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.Principle_Due}
							</p>
						</div>
					);
				case "Interest":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.Interest}
							</p>
						</div>
					);
				case "Fees":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">{installment.Fees}</p>
						</div>
					);
				case "OtherCharges":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.OtherCharges}
							</p>
						</div>
					);
				case "Penalties":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-sm capitalize">
								{installment.Penalties}
							</p>
						</div>
					);

				default:
					return cellValue;
			}
		},
		[reference],
	);

	if (loanInstallmentQuery.isPending) {
		return <>Pending</>;
	}

	if (loanInstallmentQuery.isError) {
		return <>Error</>;
	}

	return (
		<>
			<Table
				aria-label="Loan table"
				topContent={
					<div className="flex flex-row justify-between items-center">
						{/* <Input
			   className="w-80"
			   placeholder="Search member"
			   startContent={<SearchIcon />}
			 /> */}
						<div />
						<Button onClick={() => setModalOpen(true)}>Pay Loan</Button>
					</div>
				}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={loanInstallmentQuery.data.data as LoanInstallmentType[]}
				>
					{(item) => (
						<TableRow key={item.LoanID}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<PayLoanDrawer
				isOpen={isModalOpen}
				onOpenChange={() => setModalOpen(!isModalOpen)}
			/>
		</>
	);
};

export default LoanPage;
