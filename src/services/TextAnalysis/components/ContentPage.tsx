import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingScreen } from "../../../shared/Components/LoadingScreen";
import { Tab, TabGroup } from "../../../shared/Components/Tab";
import { ArrowRightIcon } from "../../../shared/Icons/ArrowRight";
import { Content, Status } from "../../../types";
import { pollContent } from "../../../utils";
import { ASSETS_IDS } from "../../../utils/constants";
import { TabContent } from "./TabContent";

export const ContentPage = () => {
  const navigate = useNavigate();
  // content id from the url
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content>();

  // poll the content until all assets are ready
  useEffect(() => {
    if (!id) {
      alert("content id missing");
      navigate("/");
      return;
    }
    pollContent(id, setContent).catch(() => {
      alert("Failed to fetch");
      navigate("/");
    });
  }, [id]);

  if (!content) return <LoadingScreen />;

  return (
    <div className="py-5">
      {/* alternatively, instead of a button, we can use Link by react-router-dom as well */}
      <button
        className="p-3 rounded-full shadow ml-5"
        onClick={() => navigate("/")}
        data-testid="back-button"
      >
        <ArrowRightIcon className="rotate-180" />
      </button>
      <div className="flex justify-center items-center mt-5">
        <TabGroup className="w-full max-w-3xl" sticky>
          <Tab
            name="Summary"
            assetId={ASSETS_IDS.SUMMARY}
            component={() => (
              <TabContent
                status={
                  content.summaries.length === 0
                    ? Status.writing
                    : content.summaries[0].status
                }
                result={content.summaries[0]?.result ?? ""}
              />
            )}
          />
          <Tab
            name="Quotes"
            assetId={ASSETS_IDS.QUOTES}
            component={() => (
              <TabContent
                status={
                  content.quotes.length === 0
                    ? Status.writing
                    : content.quotes[0].status
                }
                result={content.quotes[0]?.result ?? ""}
              />
            )}
          />
          <Tab
            name="Insights"
            assetId={ASSETS_IDS.INSIGHTS}
            component={() => (
              <TabContent
                status={
                  content.insights.length === 0
                    ? Status.writing
                    : content.insights[0].status
                }
                result={content.insights[0]?.result ?? ""}
              />
            )}
          />
        </TabGroup>
      </div>
    </div>
  );
};
