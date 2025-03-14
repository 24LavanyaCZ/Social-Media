import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { usePosts } from '../Context/PostsContext';
import { useComments } from '../Context/CommentsContext';
import { useUsers } from '../Context/UserContext';

const font = Platform.OS === 'ios' ? 'Gill-Sans' : 'Lato-Regular';

const Home = ({navigation}) => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { posts, loading, fetchMore } = usePosts();
  const comments = useComments()
  const users = useUsers() 
 
  console.log("Users",users)


  //initially selectedPostId is null so no comments will be shown
  //when we click on a post, selectedPostId will be set to the id of the post
  //if selectedPostId is equal to the id of the post, comments will be shown
  const handleShowComments = id => {
    setSelectedPostId(selectedPostId == id ? null : id);
  };

  
  const handleNavigateProfile = id => {
    try {
      const postItem = posts.find(post => post.userId === id);
      console.log(postItem);
      const user = users.find(user => user.id === postItem.userId);
      navigation.push('Profile', {data: user});
    } catch (error) {
      console.log(error);
      navigation.push('Profile', {data: 'No user found'});
    }
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



  console.log(comments.length);

  const onShare = async post => {
    try {
      const result = await Share.share({
        message:
          post,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  const renderPosts = ({item}) => {
    const filteredComments = comments.filter(
      comment => comment.postId === item.id,
    );
    return (
      <View style={styles.cards}>
        <View style={styles.card}>
          <View style={{overflow: 'hidden'}}>
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

            <View style={styles.iconSection}>
              <Pressable onPress={() => handleShowComments(item.id)}>
                <Text style={styles.commentText}>
                  {filteredComments.length}{' '}
                  <Icon name="commenting-o" size={20} />
                </Text>
              </Pressable>
              <Pressable onPress={() => onShare(item.title)}>
                <Image
                  source={require('../assets/images/share.png')}
                  style={{width: 20, height: 20}}
                />
              </Pressable>
            </View>

            
            {selectedPostId === item.id && (   //If I dont add this all the posts comment section will show up 
              <FlatList
                data={filteredComments}
                keyExtractor={item => item.id.toString()}
                renderItem={renderComment}
              />
            )}
          </View>
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
        onEndReached={() => {
          console.log("End reached, fetching more posts...");
          fetchMore(); 
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
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
    fontFamily: font,
    marginBottom: 12,
    fontWeight: '700',
    paddingTop: 12,
  },
  cards: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#999',
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
    fontFamily: font,
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    fontFamily: font,
    fontWeight: Platform.OS === 'ios' ? null : '500',
    fontSize: 14,
  },
  commentText: {
    fontFamily: font,
    color: 'blue',
    opacity: 0.8,
    alignItems: 'center',
  },
  commentSection: {
    padding:3,
    margin: 'auto',
    backgroundColor: 'rgba(233, 239, 240, 0.49)',
    marginVertical: 12,
  },
  commentTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: font,
    fontWeight: Platform.OS === 'ios' ? '' : '700',
    fontSize: 14,
  },

  commentBody: {
    fontFamily: font,
    fontWeight: 'medium',
    flexWrap: 'wrap',
    width: 300,
    fontSize: 12,
    padding: 12,
    color: '#333',
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    // flexWrap: 'wrap',
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    alignItems: 'center',
    marginHorizontal: 12,
  },
});
