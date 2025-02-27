import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {baseUrl, endPoints} from '../Services/urls';

const UserContext = createContext([]);

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + endPoints.userDetails)
      .then(res => setUsers(res?.data || []))
      .catch(err => console.log(err));
  }, []);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};

export const useUsers = () => useContext(UserContext);
