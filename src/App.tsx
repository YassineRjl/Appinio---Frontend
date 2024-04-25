import "./App.css";
import TextAnalysis from "./services/TextAnalysis";
import TextInput from "./services/TextInput";

function App() {
  return (
    <div className="App">
      <TextInput />
      <TextAnalysis />
    </div>
  );
}

export default App;
