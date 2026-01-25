import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/clerk-react';
import "./index.css"
import { Routes, Route, Navigate} from 'react-router';
import Login from './pages/LoginPage.jsx';
import DashboardPage from "./pages/DashboardPage.jsx"
import ProductsPage from "./pages/ProductPage.jsx"
import OrdersPage from "./pages/OrdersPage.jsx"
import CustomersPage from "./pages/CustomersPage.jsx"
import DashboardLayout from './layouts/DashboardLayout.jsx';
import PageLoader from './components/PageLoader.jsx';
function App() {

  const {isSignedIn, isLoaded} = useAuth()

  if(!isLoaded) return <PageLoader/>
  
  
  return (
    <Routes>
     <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"}/> : <Login/>}/> 
     <Route path="/" element={isSignedIn ? <DashboardLayout/> : <Login/>}>
      <Route index element={<Navigate to={"/dashboard"}/>}/>
      <Route path="dashboard" element={<DashboardPage/>}/>
      <Route path="products" element={<ProductsPage/>}/>
      <Route path="orders" element={<OrdersPage/>}/>
      <Route path="customers" element={<CustomersPage/>}/>
     </Route>
    </Routes>
  )
}

export default App;