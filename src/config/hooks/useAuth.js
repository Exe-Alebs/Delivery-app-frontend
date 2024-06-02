// import { useState } from 'react';

import { useContext } from 'react';
import AuthContext from '../context/JWTAuthContext';

// const useAuth = () => {
//   // You can use a state variable to simulate authentication status
//   const [isauthenticated, setIsAuthenticated] = useState(true);

//   // You can also return a user object if needed
//   const user = {
//     // user data here
//   };

//   return { isauthenticated, user };
// };

// export default useAuth;

const useAuth = () => {
  const defaultContext = useContext(AuthContext);
  return defaultContext;
};

export default useAuth;
