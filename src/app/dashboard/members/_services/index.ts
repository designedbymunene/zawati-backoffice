import axiosService from "@/services/axios-service";
import { z } from "zod";

export const resetPIN = async (payload: ResetPINPayload) => {
  const response = await axiosService.post("", payload);
  return response.data;
};

export type ResetPINPayload = z.infer<typeof ResetPINSchema>;
export const ResetPINSchema = z.object({
  RequestID: z.literal("CreateCustomerPIN"),
  CustomerID: z.string(),
  OriginalPIN: z.string().length(4),
  NewPIN: z.string().length(4),
  ConfirmPIN: z.string().length(4),
  DeviceID: z.string(),
  DeviceMake: z.string(),
  Platform: z.enum(["0", "1"]),
  RequestType: z.enum(["1"]),
});
