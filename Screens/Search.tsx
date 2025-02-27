import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl, endPoints} from '../Services/urls';
import {FlatList} from 'react-native-gesture-handler';
import { useUsers } from '../Context/UserContext';

const font = Platform.OS === 'ios' ? 'Gill Sans' : 'Lato-Regular';


const Search = ({navigation}) => {
  const [searchUser, setSearchUser] = useState('');
  const users = useUsers() 
  const [filteredUsers, setFilteredUsers] = useState([]);



  useEffect(() => {
    if (searchUser.trim() === '') setFilteredUsers(users);
    else {
      const filtered = users.filter(user =>
        user.name
          .toLowerCase()
          .trim()
          .includes(searchUser.toLowerCase().trim()),
      );
      setFilteredUsers(filtered);
    }
  }, [searchUser]);

  const handleNavigateProfile = id => {
    try {
      const user = users.find(user => user.id === id);
      navigation.push('Profile', {data: user});
    } catch (error) {
      console.log(error);
      navigation.push('Profile', {data: 'No user found'});
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ShowGram</Text>
      <TextInput
        placeholder="Search....."
        style={styles.search}
        value={searchUser}
        onChangeText={setSearchUser}
      />
    
    {filteredUsers.length === 0 ? (
      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
        No Users Found
      </Text>
    ) : (
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNavigateProfile(item.id)}
            style={styles.users}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
              }}
              style={styles.img}
            />
            <Text style={styles.userItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    )}
  </View>
          );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  search: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#999',
    borderRadius: 6,
    marginVertical: 12,
  },
  heading: {
    fontSize: 20,
    fontFamily: font,
    marginBottom: 12,
    fontWeight: '700',
    paddingTop: 12,
  },
  users: {
    backgroundColor: 'rgba(233, 239, 240, 0.49)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#999',
  },
  userItem: {
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: font,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
});
