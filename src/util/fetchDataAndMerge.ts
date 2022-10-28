import axios, { AxiosRequestConfig } from "axios";
import {
  ApiActuatorStatus,
  ApiDeviceItem,
  ApiDeviceStatusList,
  FrontActuator,
  FrontActuatorStatus,
  FrontDeviceItem,
  FrontDeviceStatusList,
} from "../types";
import { keysToCamel } from "./transformSnakeToCamelCase";

async function fetchWithAxios<BE, FE>(url: AxiosRequestConfig<BE>["url"]) {
  const result = await axios.request<BE>({ url, method: "GET" });
  return keysToCamel(result.data) as FE;
}

export async function fetchData() {
  const [deviceItems, deviceStatusList, actuatorStatus] = await Promise.all([
    fetchWithAxios<ApiDeviceItem[], FrontDeviceItem[]>("/api/device-item"),
    fetchWithAxios<ApiDeviceStatusList, FrontDeviceStatusList>(
      "/api/device-status-list"
    ),
    fetchWithAxios<ApiActuatorStatus[], FrontActuatorStatus[]>(
      "/api/actuator-status"
    ),
  ]);

  return [deviceItems, deviceStatusList, actuatorStatus] as const;
}

function findActuatorStatusByControlResourceId(
  controlResourceId: string,
  actuatorStatus: FrontActuatorStatus[]
) {
  const index = actuatorStatus.findIndex(
    (status) => status.controlResourceId === controlResourceId
  );

  if (index === -1) {
    throw new Error(
      `Could not find actuator status for control resource id ${controlResourceId}`
    );
  }

  return actuatorStatus[index];
}

function decideControlValueInput(deviceItem: FrontDeviceItem) {
  if (deviceItem.controlValueType === 0) {
    const [min, max] = deviceItem.controlValues
      .split(",")
      .map((value) => Number(value.trim())) as [number, number];

    return { type: "range", range: { min, max } };
  }

  if (deviceItem.controlValueType === 1) {
    const range = deviceItem.controlValues
      .split(",")
      .map((value) => value.trim().split(":"))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur[1]]: Number(cur[0]),
        }),
        {}
      );

    return { type: "radio", range };
  }

  return { type: "text" };
}

function findActuatorByDeviceId(
  deviceItem: FrontDeviceItem,
  actuators: FrontDeviceStatusList["actuators"]
) {
  console.log(deviceItem, actuators);
  const index = actuators.findIndex(
    (actuator) => Number(actuator.deviceId) === Number(deviceItem.deviceId)
  );

  if (index === -1) {
    return null;
  }

  return actuators[index];
}

export type ViewDeviceItem = FrontDeviceItem & {
  controlValueInputType: string;
  controlValueInputRange: any;
} & FrontDeviceStatusList["actuators"][number];

export async function transformData(): Promise<ViewDeviceItem[]> {
  const [deviceItems, deviceStatusList, actuatorStatus] = await fetchData();

  return deviceItems.map((deviceItem) => {
    const { controlName, controlResourceId, controlValueType, controlValues } =
      deviceItem;

    const { controlValue } = findActuatorStatusByControlResourceId(
      controlResourceId,
      actuatorStatus
    );

    const controlValueInput = decideControlValueInput(deviceItem);

    const actuator: FrontActuator = findActuatorByDeviceId(
      deviceItem,
      deviceStatusList.actuators
    );

    return {
      ...deviceItem,
      controlValueInputType: controlValueInput.type,
      controlValueInputRange: controlValueInput.range,
      controlValue,
      ...actuator,
    };
  });
}
