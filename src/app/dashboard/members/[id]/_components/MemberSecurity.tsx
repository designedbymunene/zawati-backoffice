import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resetPIN, ResetPINSchema } from "../../_services";
import { z } from "zod";
import { useUserStore } from "@/app/(auth)/_store";
import {
  useChangeCustomerDevice,
  useUnblockPin,
} from "@/hooks/api/members-api";
import toast from "react-hot-toast";

const MemberSecurity = () => {
  const params = useParams<{ id: string }>();

  const { user } = useUserStore();

  const [originalPIN, setOriginalPIN] = useState("");
  const [newPIN, setNewPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [deviceMake, setDeviceMake] = useState("");

  const resetPINMutation = useMutation({
    mutationFn: resetPIN,
    onSuccess: (data) => {
      // Handle success (e.g., show a success message, navigate to another screen)
      console.log("PIN reset successful");
      setOriginalPIN("");
      setNewPIN("");
      setConfirmPIN("");
      setDeviceID("");
      setDeviceMake("");
      toast.success(data.data.Message);
    },
    onError(error, variables, context) {
      if (error instanceof Error && error.response) {
        toast.error(error.response.data.Message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });

  const handleResetPIN = () => {
    try {
      const payload = ResetPINSchema.parse({
        RequestID: "CreateCustomerPIN",
        CustomerID: params.id,
        OriginalPIN: originalPIN,
        NewPIN: newPIN,
        ConfirmPIN: confirmPIN,
        DeviceID: deviceID,
        DeviceMake: deviceMake,
        Platform: "0", // Assuming '0' is for mobile
        RequestType: "1",
      });
      resetPINMutation.mutate(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        // Handle validation errors (e.g., show error messages to the user)
        // Toast.show(error.errors[0].message);
      }
    }
  };

  const unblockCustomerMutation = useUnblockPin();

  const handleUnblockCustomer = () => {
    unblockCustomerMutation.mutate({
      CustomerID: params.id,
      UserID: user.UserID as string,
    });
  };

  const changeDeviceMutation = useChangeCustomerDevice();

  const handleChangeDevice = () => {
    changeDeviceMutation.mutate({
      CustomerID: params.id,
      UserID: user.UserID as string,
      DeviceID: deviceID,
      DeviceMake: deviceMake,
      Platform: "0",
    });
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-2 gap-24 sm:gap-12 mt-10">
      <div className="grid w-auto gap-4 justify-items-center align-items-center">
        <p className="text-lg font-bold">Change Pin</p>
        <Input
          label="Original Pin"
          type="number"
          placeholder="Enter your original PIN"
          onChange={(e) => setOriginalPIN(e.target.value)}
          value={originalPIN}
        />
        <Input
          label="New Pin"
          type="number"
          placeholder="Enter your New PIN"
          onChange={(e) => setNewPIN(e.target.value)}
          value={newPIN}
        />
        <Input
          label="Confirm Pin"
          type="number"
          placeholder="Enter your confirm PIN"
          onChange={(e) => setConfirmPIN(e.target.value)}
          value={confirmPIN}
        />
        <Input
          label="Device ID"
          type="text"
          placeholder="Enter the Device ID"
          onChange={(e) => setDeviceID(e.target.value)}
          value={deviceID}
        />
        <Input
          label="Device Name"
          type="text"
          placeholder="Enter the Device Name"
          onChange={(e) => setDeviceMake(e.target.value)}
          value={deviceMake}
        />
        <Button color="primary" fullWidth onClick={handleResetPIN}>
          {resetPINMutation.isPending ? "Submitting PIN..." : "Reset Pin"}
        </Button>
      </div>

      <div className="grid w-auto gap-4 justify-items-center align-items-center">
        <p className="text-lg font-bold">Change Device</p>
        <Input
          label="Device ID"
          type="text"
          placeholder="Enter the Device ID"
          onChange={(e) => setDeviceID(e.target.value)}
          value={deviceID}
        />
        <Input
          label="Device Name"
          type="text"
          placeholder="Enter the Device Name"
          onChange={(e) => setDeviceMake(e.target.value)}
          value={deviceMake}
        />
        <Button color="primary" fullWidth onClick={handleChangeDevice}>
          {changeDeviceMutation.isPending
            ? "Submitting Device..."
            : "Change Customer Device"}
        </Button>
      </div>
      <div className="grid  gap-4 justify-items-center align-items-center">
        <div className="mt-10" />
        <div>
          <p className="text-center mb-2">
            Unblock Customer to gain access to the app
          </p>
          <Button
            className="ring-2 ring-green-500 text-base"
            color="primary"
            fullWidth
            onClick={handleUnblockCustomer}
            disabled={unblockCustomerMutation.isPending}
          >
            {unblockCustomerMutation.isPending
              ? "Submitting PIN..."
              : "Unblock Customer"}
          </Button>
        </div>
        {/* <div>
          <p> Enter your original PIN to unblock </p>
          <Button
            className="ring-2 ring-green-500 text-base"
            color="primary"
            fullWidth
            onClick={() => {
              console.log("unblock pin");
            }}
          >
            Unblock Pin
          </Button>
        </div>
        <div>
          <p> Enter your original PIN to unblock </p>
          <Button
            className="ring-2 ring-green-500 text-base"
            color="primary"
            fullWidth
            onClick={() => {
              console.log("unblock pin");
            }}
          >
            Deactivate User
          </Button>
        </div> */}
        <div className="mb-10" />
      </div>
    </div>
  );
};

export default MemberSecurity;
