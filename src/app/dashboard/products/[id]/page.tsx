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
  ChipProps,
  Input,
  Spinner,
} from "@nextui-org/react";
import { SaveIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFeesType, useGetProductFees } from "@/hooks/api/products-api";
import { useParams } from "next/navigation";
import CreateProductFee from "./CreateProductFee";

const columns = [
  {
    key: "FeesName",
    label: "Name",
  },
  {
    key: "Slug",
    label: "Slug",
  },
  {
    key: "FeeType",
    label: "Type",
  },
  {
    key: "FeeMode",
    label: "Mode",
  },
  {
    key: "FeesValue",
    label: "Value",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const statusColorMap: Record<number, ChipProps["color"]> = {
  1: "success",
  0: "danger",
};

const typeDescriptionMap: Record<string, string> = {
  F: "Flat figure",
  P: "Percentage",
};

const modeDescriptionMap: Record<string, string> = {
  R: "Recurring",
  O: "Once",
};

const savingTypeMap: Record<string, string> = {
  P: "Penalty",
  MF: "Membership fee",
  I: "Interest",
  C: "Contribution",
};

const ProductPage = () => {
  const params = useParams<{ id: string }>();
  const { isPending, data, isError, isSuccess, error } = useGetProductFees(
    params.id
  );

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const renderCell = React.useCallback(
    (fees: ProductFeesType, columnKey: React.Key) => {
      const cellValue = fees[columnKey as keyof ProductFeesType];

      switch (columnKey) {
        case "FeesName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{fees.FeesName}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {fees.FeesDescription}
              </p>
            </div>
          );
        case "Slug":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {savingTypeMap[fees.Slug]}
              </p>
            </div>
          );
        case "FeeType":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {typeDescriptionMap[fees.FeeType]}
              </p>
            </div>
          );
        case "FeeMode":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {modeDescriptionMap[fees.FeeMode]}
              </p>
            </div>
          );
        case "FeesValue":
          return (
            <div className="flex flex-col">
              <Input variant="bordered" value={fees.FeesValue} />
            </div>
          );
        case "actions":
          return (
            <div className="relative flex gap-2">
              <Tooltip content="Save row">
                <Button variant="default">
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  if (isError) {
    return (
      <div>
        <p>Product fees not found!</p>
        <Button onClick={() => setModalOpen(true)}>Add Product Fee</Button>
        <CreateProductFee
          isOpen={isModalOpen}
          onOpenChange={() => setModalOpen(!isModalOpen)}
        />
      </div>
    );
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Product Fee table"
        topContent={
          <div className="flex flex-row justify-between items-center">
            {/* <Input
              className="w-80"
              placeholder="Search product fee"
              startContent={<SearchIcon />}
            /> */}
            <div />
            <Button onClick={() => setModalOpen(true)}>Add Product Fee</Button>
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
          items={isSuccess ? data : isError ? [] : []}
          isLoading={isPending}
          emptyContent={"No Products found"}
          loadingContent={<Spinner label="Loading ..." />}
        >
          {(item) => (
            <TableRow key={item.FeeID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CreateProductFee
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default ProductPage;
