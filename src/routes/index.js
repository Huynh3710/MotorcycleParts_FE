import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAlert } from 'react-alert'; // assuming you are using 'react-alert' for alerts
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Home from "../pages/Home/Home";
import Nav_1 from "../components/Navbar/Nav_1";
import OrderPage from "../pages/Order/Order";
import AccountInfor from "../pages/AccountInfor/AccountInfor";
import ManageOrder from "../pages/AdminPages/MangeOrrder/ManageOrder";
import Dashboard from "../pages/AdminPages/Dashboard/Dashboard";    
import SignupTest from "../pages/Signup/SignupTest";
import ProductPage from '../pages/ProductPages/ProductPage';
// import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Modal from "../test/Modal";
import Test from "../test/Modal"

// Component RoleRoute
const RoleRoute = ({ roles, children }) => {
    const role = localStorage.getItem('role'); // get the role from local storage
    const [isAuthorized, setIsAuthorized] = useState(true);
    // const location = useLocation();
    const nevigate = useNavigate();

    useEffect(() => {
        if (!role) {
            alert('Vui lòng đăng nhập'); // show alert if user is not logged in
            setIsAuthorized(false);
            
        } else if (roles && roles.indexOf(role) === -1) {
            alert('Bạn không có quyền truy cập vào trang này'); // show alert if user does not have the necessary permissions
            setIsAuthorized(false);
            
        }
    }, [role, roles, nevigate]);

    return isAuthorized ? children : null;
};


// chưa đăng nhập
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/signup', component: SignupTest},
    {path: '/cart', component: Cart},
    {path: '/nav-test', component: Nav_1},
    // {path: '/product-detail/:id', component: ProductDetail},
    {path: '/product-detail', component: ProductDetail},
    {path: '/test', component: Modal},
    {path: '/test-adress', component: Test},
    {path: '/product', component: ProductPage}
]

// đăng nhập rồi
const privateRoutes = [
    {path: '/order', component: OrderPage, roles: ['USER']},
    {path: '/account', component: AccountInfor, roles: ['USER']},
]

// admin
const adminRoutes = [
    {path: '/manage-order', component: ManageOrder, roles: ['ADMIN']},
    {path: '/dashboard', component: Dashboard, roles: ['ADMIN']}
]

export { publicRoutes, privateRoutes, adminRoutes, RoleRoute };