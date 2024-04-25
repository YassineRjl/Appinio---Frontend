import { StatusScreen } from "../../../shared/Components/StatusScreen";
import { Content, Status } from "../../../types";
import { createMarkup } from "../../../utils";

export const SummaryTab = ({ content }: { content: Content }) => {
  // if length is 0, then the summary record hasn't been initialized
  // else if the status is not ready, then the summary is still being processed or failed
  if (
    content.summaries.length === 0 ||
    content.summaries[0].status !== "ready"
  ) {
    return (
      <StatusScreen
        status={
          content.summaries.length === 0
            ? Status.writing
            : content.summaries[0].status
        }
      />
    );
  }

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={createMarkup(content.summaries[0].result ?? "")}
    />
  );
};
