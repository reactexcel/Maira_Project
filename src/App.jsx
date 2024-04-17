import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/login'
import Register from './pages/register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
