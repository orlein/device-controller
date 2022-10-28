export type ApiDeviceItem = {
  control_name: string;
  control_resource_id: string;
  control_resource_path: string;
  control_value_type: number;
  control_values: string;
  controllable: boolean;
  device_id: number;
  value_scale: number;
  value_type: number;
  value_unit: string;
};

export type ApiActuator = {
  control_status: string[];
  device_class: number;
  device_id: number;
  device_name: string;
  device_type: number;
  install_region: number;
  location: string;
};

export type ApiSensor = {
  applied_value: number;
  device_class: number;
  device_id: number;
  device_name: string;
  device_type: number;
  install_region: number;
  location: string;
  predict_value: null;
  real_value: number;
  sensing_status: number;
  sensing_time: string; //stringified date
  valueState: number;
};

export type ApiDeviceStatusList = {
  actuators: ApiActuator[];
  section_id: number;
  section_name: string;
  sensors: ApiSensor[];
};

export type ApiActuatorStatus = {
  control_resource_id: string;
  control_value: number;
  operation_mode: number;
  report_status: number;
  report_time: string;
  value_state: number;
};

export type FrontDeviceItem = {
  controlName: string;
  controlResourceId: string;
  controlResourcePath: string;
  controlValueType: number;
  controlValues: string;
  controllable: boolean;
  deviceId: number;
  valueScale: number;
  valueType: number;
  valueUnit: string;
};

export type FrontActuator = {
  controlStatus: string[];
  deviceClass: number;
  deviceId: number;
  deviceName: string;
  deviceType: number;
  installRegion: number;
  location: string;
};

export type FrontSensor = {
  appliedValue: number;
  deviceClass: number;
  deviceId: number;
  deviceName: string;
  deviceType: number;
  installRegion: number;
  location: string;
  predictValue: null;
  realValue: number;
  sensingStatus: number;
  sensingTime: string; //stringified date
  valueState: number;
};

export type FrontDeviceStatusList = {
  actuators: FrontActuator[];
  sectionId: number;
  sectionName: string;
  sensors: FrontSensor[];
};

export type FrontActuatorStatus = {
  controlResourceId: string;
  controlValue: number;
  operationMode: number;
  reportStatus: number;
  reportTime: string;
  valueState: number;
};
