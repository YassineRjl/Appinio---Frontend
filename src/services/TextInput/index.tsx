import { Route, Routes } from "react-router-dom";
import { TextInputPage } from "./components/TextInputPage";

const TextInput = () => {
  return (
    <Routes>
      <Route path="/" element={<TextInputPage />}></Route>
    </Routes>
  );
};

export default TextInput;
