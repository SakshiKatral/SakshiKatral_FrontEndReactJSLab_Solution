import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenseTracker from './component/ExpenseTracker';
import ShowDataList from './component/ShowDataList';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/add" element={<ExpenseTracker onClose={true} onTrue={false}></ExpenseTracker>}></Route>
            <Route path="/" element={<ShowDataList></ShowDataList>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
