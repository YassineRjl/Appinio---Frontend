import { StatusScreen } from "../../../shared/Components/StatusScreen";
import { Content, Status } from "../../../types";
import { createMarkup } from "../../../utils";

export const QuotesTab = ({ content }: { content: Content }) => {
  // if length is 0, then the quote record hasn't been initialized
  // else if the status is not ready, then the quote is still being processed or failed
  if (content.quotes.length === 0 || content.quotes[0].status !== "ready") {
    return (
      <StatusScreen
        status={
          content.quotes.length === 0
            ? Status.writing
            : content.quotes[0].status
        }
      />
    );
  }

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={createMarkup(content.quotes[0].result ?? "")}
    />
  );
};
