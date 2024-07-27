import { Props } from '@/components/CustomDrawer'
import { GoalMembers, GoalTransaction, useFetchGoalTransactions } from '@/hooks/api/goals-api'
import { Modal, ModalContent, ModalHeader, ModalBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, Link, Tooltip, User } from '@nextui-org/react';
import { ArrowDown, ArrowUp, EyeIcon } from 'lucide-react';
import React from 'react'

interface ITransaction {
  goal: string;
  customer: string;
}

const columns = [
  {
    key: "GoalName",
    label: "Name",
  },

  {
    key: "Amount",
    label: "Amount",
  },
];

const GoalTransactions: React.FC<Props & ITransaction> = ({ isOpen, onOpenChange, goal, customer }) => {
  const { isPending, isError, data, error } = useFetchGoalTransactions({customer, goal});

  const renderCell = React.useCallback(
    (member: GoalTransaction, columnKey: React.Key) => {
      const cellValue = member[columnKey as keyof GoalTransaction];

      switch (columnKey) {
        case "GoalName":
          return (
            <User
              description={member.TransactionType === "2" ? "Deposit" : "Credit"}
              name={member.GoalName}
              avatarProps={{ color: member.TransactionType === "2" ? "danger" : "success", icon: member.TransactionType === "2" ? <ArrowDown /> : <ArrowUp /> }}
            />
          );
        case "Amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {member.Amount}
              </p>
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
    return <>{error.isAxiosError ? error.response?.data?.Message : error.message}</>;
  }

  return (
    <Modal
    scrollBehavior="inside"
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="center"
    backdrop="blur"
    size="full"
    classNames={{
      wrapper: "flex justify-end",
    }}
    motionProps={{
      variants: {
        enter: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
        exit: {
          x: 50,
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeIn",
          },
        },
      },
    }}
    className="rounded-md max-w-3xl w-full h-screen max-h-screen"
  >
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1 mt-5">
        Goal Transactions
      </ModalHeader>
      <ModalBody>
      <Table
        isHeaderSticky
        aria-label="Goal Transactions table"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
      <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data as GoalTransaction[]}>
          {(item) => (
            <TableRow key={item.GoalName}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GoalTransactions