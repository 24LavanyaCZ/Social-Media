import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { baseUrl, endPoints } from '../Services/urls';

const PostsContext = createContext([]);

export const PostProvider = ({children})=>{
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        axios.get(baseUrl + endPoints.userPosts)
        .then(res=>setPosts(res?.data || []))
        .catch((err) => console.log(err));
    },[])

    return(
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    )

}

export const usePosts = () => useContext(PostsContext);