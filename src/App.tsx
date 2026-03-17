import "./App.css";
import Board from "./components/Board";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <div className="m-2">
        <h1 className="text-2xl font-bold">KanbanBoard</h1>
        <Board></Board>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
