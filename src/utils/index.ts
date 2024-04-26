import { getContent } from "../api";
import { Content, Status } from "../types";
import { sanitize } from "dompurify";

export const pollContent = async (
  contentId: string,
  setContent: (content: Content) => void
) => {
  // query the content
  const { data: content } = await getContent(contentId);

  // store the latest state of the content
  setContent(content);

  // poll the content until all assets are ready
  if (
    content.insights.length === 0 ||
    content.summaries.length === 0 ||
    content.quotes.length === 0 ||
    content.insights[0].status === Status.writing ||
    content.summaries[0].status === Status.writing ||
    content.quotes[0].status === Status.writing
  )
    setTimeout(() => pollContent(contentId, setContent), 1000);
};

// Safely set innerHTML of a div element
export const createMarkup = (dirty: string) => {
  return { __html: sanitize(dirty) };
};
