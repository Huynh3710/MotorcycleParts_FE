import './App.css';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Nav from './Components/Nav';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Nav' element={<Nav />} />;
        <Route path='/login' element={<LoginForm />} />;
        <Route path='/signup' element={<SignupForm />} />;
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
