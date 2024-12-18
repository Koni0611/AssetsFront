import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AssetManagement from './components/AssetManagement';
import ViewRegisteredAssets from './components/ViewRegisteredAssets';
import UserInfo from './components/UserInfo';
import AddAdmin from './components/AddAdmin';
import UpdateUser from './components/UpdateUser';
import UpdateAsset from './components/UpdateAsset'; // Import UpdateAsset component

function App() {
  const isAuthenticated = localStorage.getItem('userId') !== null;
 // Check if user is logged in
  const isAdmin = localStorage.getItem('role') === 'admin'; // Check if user is an admin
   
  console.log('isAuthenticated:', isAuthenticated); // Debug log for authentication status
  console.log('isAdmin:', isAdmin); // Debug log for admin status
  
  return (
    <Router>
      <Routes>
        {/* Default Route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes */}
        <Route
          path="/assets"
          element={isAuthenticated ? <AssetManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-assets"
          element={isAuthenticated ? <ViewRegisteredAssets /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-info"
          element={isAuthenticated ? <UserInfo /> : <Navigate to="/login" />}
        />
        <Route path="/update-asset/:type/:id" element={<UpdateAsset />} />
           


        {/* Admin-only Routes */}
        <Route
          path="/add-admin"
          element={isAuthenticated && isAdmin ? <AddAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/update/:identityNumber"
          element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />}
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
