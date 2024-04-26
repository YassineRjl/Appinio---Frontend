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
  insights: AssetType[];
  summaries: AssetType[];
  quotes: AssetType[];
};
type AssetType = {
  id: string;
  result?: string;
  status: Status;
  contentId: string;
  created: string;
  Content: Content;
};
