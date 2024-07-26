"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
} from "@nextui-org/react";
import { EyeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import AddProducts from "./_components/add-products";
import { useFetchProducts } from "@/hooks/api/products-api";

export interface Products {
  ProductID: string;
  ProductCode: string;
  ProductName: string;
  ProductDescription: string;
  ProductCost: string;
  ContributionFrequency: string;
}

const columns = [
  {
    key: "ProductCode",
    label: "Product Code",
  },
  {
    key: "ProductName",
    label: "Product Name",
  },
  {
    key: "ProductCost",
    label: "Product Cost",
  },
  {
    key: "ContributionFrequency",
    label: "Contribution Frequency",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const frequencyTypeMap: Record<string, string> = {
  D: "Daily",
  W: "Weekly",
  M: "Monthly",
  Y: "Yearly",
};

const ProductsPage = () => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const { isPending, isError, data, error } = useFetchProducts();

  const renderCell = React.useCallback(
    (products: Products, columnKey: React.Key) => {
      const cellValue = products[columnKey as keyof Products];

      switch (columnKey) {
        case "ProductCode":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {products.ProductCode}
              </p>
            </div>
          );
        case "ProductName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {products.ProductName}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {products.ProductDescription}
              </p>
            </div>
          );
        case "ProductCost":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {products.ProductCost}
              </p>
            </div>
          );
        case "ContributionFrequency":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {frequencyTypeMap[products.ContributionFrequency]}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex gap-2">
              <Tooltip content="View products">
                <Tooltip content="Details">
                  <Link href={`/dashboard/products/${products.ProductID}`}>
                    <Button isIconOnly variant="bordered" aria-label="View">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </Tooltip>
              </Tooltip>
            </div>
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
    return <>Error</>;
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Products table"
        topContent={
          <div className="flex flex-row justify-between items-center">
            {/* <Input
              className="w-80"
              placeholder="Search product"
              startContent={<SearchIcon />}
            /> */}
            <div />
            <Button onClick={() => setModalOpen(true)}>Create Product</Button>
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
        <TableBody items={data as Products[]}>
          {(item) => (
            <TableRow key={item.ProductID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddProducts
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default ProductsPage;
