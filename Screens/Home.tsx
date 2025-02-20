import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl, endPoints} from '../Services/urls';



const Home = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});


  useEffect(() => {
    axios
      .get(baseUrl + endPoints.userPosts)
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(baseUrl + endPoints.userComments)
      .then(res => {
        console.log(res);
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(baseUrl + endPoints.userDetails)
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleShowComments = id => {
    setSelectedPostId(selectedPostId == id ? null : id);
  };

  const handleNavigateProfile = (id) => {

    const postItem = posts.find(post => post.userId===id)
    console.log(postItem)
    const user = users.find(user => user.id===postItem.userId)

    console.log(user)
    navigation.push('Profile',{data:user})
    
  };

  /*COMMENTS=[{
  ID 1,POSTID 1
  }] 
  POSTS=[{
  USERID 1, ID 1
  }]
  ID OF POST AND POSTID OF COMMENTS SHOULD MATCH
  I WANT TO SHOW COMMENTS MATCHING ID FROM POST ARRAY
  FILTER COMMENTS
  */

  // const renderComment = ({item}) => {
  //   const filteredComments = posts.filter(post => post.id === item.postId);

  //   return (
  //     <View>
  //       <Text>{item.name}</Text>
  //     </View>
  //   );
  // };

  console.log(comments.length);
  const renderPosts = ({item}) => {
    const filteredComments = comments.filter(
      comment => comment.postId === item.id,
    );
    return (
      <View style={styles.cards}>
        <View style={styles.card}>
          <View style={styles.texts}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_vector-1731899129354-222e5798f949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxpbGx1c3RyYXRpb25zLWZlZWR8NTV8fHxlbnwwfHx8fHw%3D',
            }}
            style={{width: 370, height: 300}}
          />
          <Pressable
            style={{paddingVertical: 4, marginBottom: 3}}
            onPress={() => handleShowComments(item.id)}>
            <Text style={styles.commentText}>
              {filteredComments.length + ' Comments'}
            </Text>
          </Pressable>
          {selectedPostId === item.id && (
            <FlatList
              data={filteredComments}
              keyExtractor={item => item.id.toString()}
              renderItem={renderComment}
            />
          )}
        </View>
      </View>
    );
  };
  const renderComment = ({item}) => (

    
      <View style={styles.commentSection}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => handleNavigateProfile(item.id)}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
              }}
              style={{
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: 40 / 2,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.commentTitle}>{item.name}</Text>
        </View>

        <Text style={styles.commentBody}>{item.body}</Text>
      </View>
    
  );

  // -----------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ShowGram</Text>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={10}
        ItemSeparatorComponent={() => <View style={{marginVertical: 12}} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    marginBottom: 12,
  },
  cards: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: 'grey',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    gap: 7,
    borderRadius: 7,
    marginVertical: 2,
  },
  texts: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    fontFamily: 'Gill Sans',
    fontSize: 14,
  },
  commentText: {
    fontFamily: 'Gill Sans',
    paddingHorizontal: 12,
    color: 'blue',
    opacity: '0.8',
  },
  commentSection: {
    padding: 3,
    flexWrap: 'wrap',
    margin: 'auto',
    backgroundColor: 'rgba(233, 239, 240, 0.49)',
    marginVertical: 12,
  },
  commentTitle: {
    fontFamily: 'Gill Sans',
    fontWeight: '500',
    fontSize: 14,
  },
  commentBody: {
    fontFamily: 'Gill Sans',
    fontWeight: '200',
    fontSize: 12,
    width: 270,
    flexWrap: 'wrap',
    marginLeft: 50,
    marginVertical: 10,
  },
  profile: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 7,
    borderBottomWidth: 0.7,
    borderBottomColor: '#333',
  },
});
