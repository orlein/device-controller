// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceItemJson from "../../fixtures/device-item.json";
import { ApiDeviceItem } from "../../types";

const DEVICE_ITEMS: ApiDeviceItem[] = DeviceItemJson;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDeviceItem[]>
) {
  res.status(200).json(DEVICE_ITEMS);
}
