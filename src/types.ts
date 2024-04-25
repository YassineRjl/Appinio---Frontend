export enum Status {
  writing = "writing",
  ready = "ready",
  failed = "failed",
}
export type Content = {
  id: string;
  source: string;
  isoLang: string;
  created: string;
  insights: InsightType[];
  summaries: SummaryType[];
};
export type InsightType = {
  id: string;
  result?: string;
  status: Status;
  contentId: string;
  created: string;
  Content: Content;
};

export type SummaryType = {
  id: string;
  result?: string;
  status: Status;
  contentId: string;
  created: string;
  Content: Content;
};
