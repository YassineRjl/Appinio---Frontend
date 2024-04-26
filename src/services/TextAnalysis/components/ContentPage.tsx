import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingScreen } from "../../../shared/Components/LoadingScreen";
import { Tab, TabGroup } from "../../../shared/Components/Tab";
import { ArrowRightIcon } from "../../../shared/Icons/ArrowRight";
import { Content } from "../../../types";
import { pollContent } from "../../../utils";
import { ASSETS_IDS } from "../../../utils/constants";
import { InsightsTab } from "./InsightsTab";
import { QuotesTab } from "./QuotesTab";
import { SummaryTab } from "./SummaryTab";

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
            component={() => <SummaryTab content={content} />}
          />
          <Tab
            name="Quotes"
            assetId={ASSETS_IDS.QUOTES}
            component={() => <QuotesTab content={content} />}
          />
          <Tab
            name="Insights"
            assetId={ASSETS_IDS.INSIGHTS}
            component={() => <InsightsTab content={content} />}
          />
        </TabGroup>
      </div>
    </div>
  );
};
