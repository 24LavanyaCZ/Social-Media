import axios from 'axios';
import React, {createContext, useState, useEffect, useContext} from 'react';
import { baseUrl, endPoints } from '../Services/urls';


const CommentContext = createContext([]);

export const CommentProvider = ({children}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + endPoints.userComments)
      .then(res => {
        setComments(res?.data || []) 
        console.log("use",res)})
      .catch(err => console.log(err));
  }, []);

  return (
    <CommentContext.Provider value={comments}>
        {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => useContext(CommentContext);
