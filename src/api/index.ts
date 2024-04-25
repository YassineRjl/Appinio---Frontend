import axios from "axios";
import { Content } from "../types";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

/**
 * Sends long text to the backend for processing
 * @param source - long text to be processed
 * @param isoLang - language of the text
 * @returns An Axios Object containing the id of the content record
 */
export const writeContent = async ({
  source,
  isoLang,
}: {
  source: string;
  isoLang: string;
}): Promise<{ data: string }> =>
  axios.post("/content", {
    isoLang,
    source,
  });

/**
 * Fetches the content from the backend
 * @param id - id of the content record
 * @returns An Axios Object containing the content record
 */
export const getContent = async (id: string): Promise<{ data: Content }> =>
  axios.get(`/content/${id}`);
