import React from "react";
import { transformData, ViewDeviceItem } from "../util/fetchDataAndMerge";

export default function Home() {
  const [deviceItem, setDeviceItem] = React.useState<ViewDeviceItem[]>([]);

  React.useEffect(() => {
    transformData().then((data) => setDeviceItem(data));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(deviceItem, null, 2)}</pre>
    </div>
  );
}
