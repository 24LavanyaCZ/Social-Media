import axios from 'axios';
import React, {createContext, useState, useEffect, useContext} from 'react';
import {baseUrl, endPoints} from '../Services/urls';
import {post} from '../notificationback4accesstoken/src/routes';

const PostsContext = createContext([]);

export const PostProvider = ({children}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPosts = async newPage => {
    if (loading) return;
    setLoading(true);

    try {
      console.log(`Fetching posts for page: ${newPage}`);

      const res = await axios.get(
        `${baseUrl}${endPoints.userPosts}?_limit=5&_page=${newPage}`,
      );
      const newPosts = res.data;

      console.log('API Response:', newPosts);

      if (newPosts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
      } else {
        console.log('No more posts available');
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching posts:', error);
      
    }
  };
  //hi how are you

  useEffect(() => {
    fetchPosts(page);
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        fetchMore: () => {
          fetchPosts(page);
        },
      }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
