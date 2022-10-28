// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DeviceStatusListJson from "../../fixtures/device-status-list.json";
import { ApiDeviceStatusList } from "../../types";

const DEVICE_STATUS_LIST: ApiDeviceStatusList = DeviceStatusListJson;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDeviceStatusList>
) {
  res.status(200).json(DEVICE_STATUS_LIST);
}
