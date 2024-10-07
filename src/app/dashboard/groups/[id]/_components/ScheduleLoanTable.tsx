import useScheduleStore from "@/app/dashboard/loans/_components/scheduleStore";
import ErrorPage from "@/components/shared/ErrorPage";
import FormGroupIdSelect from "@/components/shared/form/FormGroupIdSelect";
import FormInput from "@/components/shared/form/FormInput";
import FormLoanTypeSelect from "@/components/shared/form/FormLoanTypeSelect";
import FormMemberSelect from "@/components/shared/form/FormMemberSelect";
import FormProductsIdSelect from "@/components/shared/form/FormPeoductsIdSelect";
import PendingState from "@/components/shared/PendingState";
import {
  CreateFixedInterestLoanRequest,
  useCreateFixedInterestLoan,
} from "@/hooks/api/loans-api";
import { axiosInstance } from "@/services/api";
import axiosService from "@/services/axios-service";
import { ErrorMessage } from "@/types/users";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { set } from "date-fns";
import { PlusIcon, ShuffleIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ScheduleLoanTable = () => {
  const params = useParams<{ id: string }>();
  const { onSelectedGroup } = useScheduleStore();

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [SwapFrom, setSwapFrom] = React.useState<string>("");

  const { isPending, data, isError, error, isSuccess } = useScheduledLoans(
    params.id
  );

  React.useEffect(() => {
    onSelectedGroup(params.id);
  }, [onSelectedGroup, params.id]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      GroupID: params.id,
      ProductID: "",
      LoanType: "",
      LoanFee: "",
      LoanInsurance: "",
      LoanCharges: "",
    },
  });

  const mutation = useRunScheduleLoanMutation();

  const renderCell = React.useCallback(
    (schedule: ScheduledLoans, columnKey: React.Key) => {
      const cellValue = schedule[columnKey as keyof ScheduledLoans];
      switch (columnKey) {
        case "CustomerNames":
          return (
            <User
              name={schedule.CustomerNames}
              description={schedule.LoanRecordID}
            />
          );
        case "ProductName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {schedule.ProductName}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {schedule.ProductCode}
              </p>
            </div>
          );
        case "LoanNo":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{schedule.LoanNo}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {schedule.LoanType}
              </p>
            </div>
          );
        case "DateCreated":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {schedule.DateCreated}
              </p>
            </div>
          );
        case "Loanfee":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{schedule.Loanfee}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {schedule.LoanInsurance}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Open Meeting">
                <Button
                  isIconOnly
                  variant="ghost"
                  onClick={() => {
                    setModalOpen(true);
                    setSwapFrom(schedule.LoanRecordID);
                  }}
                >
                  <ShuffleIcon className="h-4 w-4" />
                </Button>
              </Tooltip>
              {/* <Tooltip content="Start Meeting">
                    <Button
                      onClick={() => startMeeting.mutate(meeting.MeetingsID)}
                      isIconOnly
                      variant="ghost"
                    >
                      <CalendarCheckIcon className="h-4 w-4" />
                    </Button>
                  </Tooltip> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onSubmit = (data: RunScheduleLoanRequest) => {
    return mutation.mutate(data, {
      onSuccess: (data) => {
        reset();
        toast.success(data.Message);
      },
      onError: (error: AxiosError<ErrorMessage>, _, __) => {
        const errorMessage = error?.response?.data?.Message as string;

        toast.error(errorMessage);
      },
    });
  };

  return (
    <section className="flex-1">
      <Accordion variant="bordered">
        <AccordionItem key="1" aria-label="Set Meetings" title="Schedule Loan">
          <form className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormInput
              label="Loan Fee"
              name="LoanFee"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Loan Insurance"
              name="LoanInsurance"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Loan Charges"
              name="LoanCharges"
              control={control}
              errors={errors}
            />
            <FormProductsIdSelect
              label="Products Name"
              name="ProductID"
              control={control}
              errors={errors}
            />
            <FormLoanTypeSelect
              label="Loan Type"
              name="LoanType"
              control={control}
              errors={errors}
            />
          </form>
          <div className="pt-5" />
          <Button
            type="submit"
            className="w-full"
            isDisabled={mutation.isPending}
            isLoading={mutation.isPending}
            startContent={!mutation.isPending && <PlusIcon className="mr-2" />}
            color={"default"}
            onClick={handleSubmit(onSubmit)}
          >
            Schedule Loan
          </Button>
        </AccordionItem>
      </Accordion>
      <Table
        isHeaderSticky
        aria-label="Schedule Table"
        className="mt-10"
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
          items={isSuccess ? (data as ScheduledLoans[]) : []}
          isLoading={isPending}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={isError ? error?.response?.data?.Message : "No data"}
        >
          {(item) => (
            <TableRow key={item.LoanRecordID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <SwapLoanModal
        isOpen={isModalOpen}
        onOpenChange={() => setModalOpen(!isModalOpen)}
        from={SwapFrom}
        members={data ? data : []}
      />
    </section>
  );
};

export default ScheduleLoanTable;

export interface ScheduledLoans {
  LoanRecordID: string;
  GroupID: string;
  ProductID: string;
  ProductName: string;
  ProductCode: string;
  CustomerID: string;
  CustomerNames: string;
  PhoneNo: string;
  LoanNo: string;
  LoanTypeID: string;
  LoanType: string;
  Scheduled: string;
  Loanfee: string;
  LoanInsurance: string;
  DateCreated: string;
  DateRun: string;
}

const getScheduledLoans = async (id: string) => {
  const response = await axiosInstance.post<ScheduledLoans[]>("", {
    RequestID: "GetScheduledLoans",
    GroupID: id,
  });
  return response.data;
};

const useScheduledLoans = (id: string) => {
  return useQuery({
    queryKey: ["scheduled-loans", id],
    queryFn: () => getScheduledLoans(id),
  });
};

export interface RunScheduleLoanRequest {
  GroupID: string;
  ProductID: string;
  LoanType: string;
  LoanFee: string;
  LoanInsurance: string;
  LoanCharges: string;
}

const runScheduleLoan = async (request: RunScheduleLoanRequest) => {
  const response = await axiosInstance.post("", {
    RequestID: "ScheduleLoan",
    ...request,
  });
  return response.data;
};

const useRunScheduleLoanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runScheduleLoan,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["scheduled-loans"] });
      toast.success(data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

interface SwapLoanRequest {
  SwapFrom: string;
  SwapTo: string;
}

const swapLoan = async (request: SwapLoanRequest) => {
  return await axiosInstance.post("", {
    RequestID: "SwapLoans",
    ...request,
  });
};

const useSwapLoanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: swapLoan,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["scheduled-loans"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

const columns = [
  {
    key: "CustomerNames",
    label: "Customer Name",
  },
  {
    key: "ProductName",
    label: "Product Name",
  },
  {
    key: "LoanNo",
    label: "Loan Number",
  },
  {
    key: "DateCreated",
    label: "Scheduled Date",
  },
  {
    key: "",
    label: "Loan Fee",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

interface SwapProps extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  from: string;
  members: ScheduledLoans[];
}

const SwapLoanModal: React.FC<SwapProps> = ({ ...props }) => {
  const [swap, setSwap] = useState<{ from: string; to: string } | null>(null);

  const mutation = useSwapLoanMutation();

  const handleSwap = () => {
    if (swap) {
      mutation.mutate(
        {
          SwapFrom: swap.from,
          SwapTo: swap.to,
        },
        {
          onSuccess: (data) => {
            setSwap(null);
            props?.onOpenChange(false);
            toast.success(data.data.Message);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <Modal
      size={"2xl"}
      isOpen={props?.isOpen}
      onOpenChange={props?.onOpenChange}
      placement="center"
      backdrop="blur"
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Swap Member
            </ModalHeader>
            <ModalBody className="h-48 justify-center">
              <Autocomplete
                variant="bordered"
                defaultItems={props?.members}
                label="Pick a Member"
                placeholder="Select a Member"
                onSelectionChange={(key) =>
                  setSwap({
                    from: props?.from,
                    to: key as string,
                  })
                }
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.LoanRecordID}
                    textValue={item.CustomerNames}
                    className="capitalize"
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={item.CustomerNames}
                        className="flex-shrink-0"
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{item.CustomerNames}</span>
                        <span className="text-tiny text-default-400">
                          {item.DateCreated}
                        </span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Button
                isLoading={mutation.isPending}
                isDisabled={mutation.isPending}
                className="my-5"
                onClick={handleSwap}
              >
                Swap Member
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
