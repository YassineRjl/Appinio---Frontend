import React from "react";
import { StatusScreen } from "../../../shared/Components/StatusScreen";
import { Status } from "../../../types";
import { createMarkup } from "../../../utils";

export const TabContent = ({
  result,
  status,
}: {
  status: Status;
  result: string;
}) => {
  if (status !== Status.ready) {
    return <StatusScreen status={status} />;
  }

  return (
    <div className="prose" dangerouslySetInnerHTML={createMarkup(result)} />
  );
};

React.memo(TabContent);
