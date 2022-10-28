// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import ActuatorStatusJson from "../../fixtures/actuator-status.json";
import { ApiActuatorStatus } from "../../types";

const ACTUATOR_STATUS: ApiActuatorStatus[] = ActuatorStatusJson;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(ACTUATOR_STATUS);
}
