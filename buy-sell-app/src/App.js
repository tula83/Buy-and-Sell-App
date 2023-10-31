import './App.css';
import MyNav from './Users/components/MyNav';
import Admin from './Admin/components/Admin';
import { BrowserRouter as Router,Routes,Route,Navigate,Outlet } from 'react-router-dom';
import Login from './LoginAndRegistration/Login';
import AdminHomePage from './Admin/components/AdminHomePage';
import ItemPage from './Admin/components/Itempage';

import Register from './LoginAndRegistration/Registration';

import Footer from './Users/components/Footer'
import AdminLogin from './LoginAndRegistration/AdminLogin';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import AdminUsers from './Admin/components/AdminUsers';

import AdminOrders from './Admin/components/AdminOrders'

const UserSection = () => {
  return (
    <div>
      <MyNav/>
      <Footer></Footer>
      <Outlet/>

     
    </div>
  );
};


function App() {

  
  
  
  return (
    <div className="App">
        <Router>
          
         <Routes>
          <Route exact path='/' element={<Login/>}></Route> 
          <Route path="/register" element={<Register/>} />

          <Route path="/admin-login" element={
           
             <AdminLogin/>
          
         }></Route>

         
          <Route path="/admin" element={
             <AdminProtectedRoute>
              <Admin/>
             </AdminProtectedRoute>
          }></Route> 

          



          <Route path="/admin-homepage" element={
            <AdminProtectedRoute>
             <AdminHomePage/>
            </AdminProtectedRoute>
         }></Route>
         
         
         <Route path="/admin-orders" element={
          <AdminProtectedRoute>
           <AdminOrders/>
          </AdminProtectedRoute>
       }></Route>


       <Route path="/admin-customers" element={
        <AdminProtectedRoute>
         <AdminUsers/>
        </AdminProtectedRoute>
     }></Route>


          
         


          <Route path='/admin-items'
           element={
             <AdminProtectedRoute>
               <ItemPage/>
             </AdminProtectedRoute>
           }
          >
          
          </Route>

         

          <Route path="/user/*" 
           element={
               <ProtectedRoute>
                 <UserSection/>
                </ProtectedRoute>
           }
          ></Route> 
          

          
         <Route path='*' element={<NotFoundPage/>}>
         
         </Route>
         
        
          
       

          </Routes>
          
           
        </Router>


        

      
    </div>
  );
}

export default App;

export function ProtectedRoute({children}){
 

   if(localStorage.getItem("arr")){
    return children;
    
   }
   else{
      return <Navigate to='/'></Navigate>
   }
}


export function AdminProtectedRoute({children}){

   if(localStorage.getItem("admin")){
    return children;
   }
   else{
    return <Navigate to='/'></Navigate>
   }
}

