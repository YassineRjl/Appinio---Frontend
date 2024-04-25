import { StatusScreen } from "../../../shared/Components/StatusScreen";
import { Content, Status } from "../../../types";
import { createMarkup } from "../../../utils";

export const InsightsTab = ({ content }: { content: Content }) => {
  // if length is 0, then the insights record hasn't been initialized
  // else if the status is not ready, then the insights are still being processed or failed
  if (content.insights.length === 0 || content.insights[0].status !== "ready") {
    return (
      <StatusScreen
        status={
          content.insights.length === 0
            ? Status.writing
            : content.insights[0].status
        }
      />
    );
  }

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={createMarkup(content.insights[0].result ?? "")}
    />
  );
};
