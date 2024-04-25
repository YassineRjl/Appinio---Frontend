import { Route, Routes } from "react-router-dom";
import { ContentPage } from "./components/ContentPage";

export const TextAnalysis = () => {
  return (
    <Routes>
      <Route path="output/:id" element={<ContentPage />}></Route>
    </Routes>
  );
};

export default TextAnalysis;
