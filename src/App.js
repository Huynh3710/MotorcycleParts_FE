import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { publicRoutes, privateRoutes, adminRoutes, RoleRoute } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />}/>
          })
        }
        {
          privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<RoleRoute roles={route.roles}><Page /></RoleRoute>}/>
          })
        }
        {
          adminRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<RoleRoute roles={route.roles}><Page /></RoleRoute>}/>
          })
        }
      </Routes>
      <ToastContainer />  
    </BrowserRouter>
  );
}

export default App;