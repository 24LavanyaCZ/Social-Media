import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native-gesture-handler';

import {useUsers} from '../Context/UserContext';

const font = Platform.OS === 'ios' ? 'Gill Sans' : 'Lato-Bold';

const Profile = ({route, navigation}) => {
  const [isUser, setIsUser] = useState(false);
  const user = route.params.data;
  const users = useUsers();

  useEffect(() => {
    if (typeof user === 'object') setIsUser(true);
    else setIsUser(false);
  }, [user]);

  console.log(isUser);
  const screenWidth = Dimensions.get('window').width;

  const handleFollow = data => {
    //why data because above we have used const user = route.params.data this line where there is .data. If I ue other name like user then I need to do this const user = route.params.data.user;  which is difficult to handle
    console.log(user);
    navigation.push('Profile', {data});
  };
  const renderUsers = ({item}) => {
    return (
      <View>
        {!(item.id === user.id) && (
          <View style={styles.person}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
              }}
              style={{
                width: 150,
                height: 100,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                objectFit: 'cover',
              }}
            />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleFollow(item)}>
              <Text style={{color: '#fff'}}>Follow Me</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isUser ? (
        <>
          <View style={{position: 'relative'}}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/abstract-gradient-geometric-background_52683-54898.jpg?ga=GA1.1.2080722426.1739959464&semt=ais_hybrid',
              }}
              style={{
                width: screenWidth,
                height: 150,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
              }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 120 / 2,
                position: 'absolute',
                bottom: -50,
                left: 25,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 1,
              }}
            />
          </View>
          <View style={{position: 'relative', height: 100}}>
            <View style={styles.userDetails}>
              <Text style={{fontFamily: font, fontSize: 20}}>{user.name}</Text>

              <View style={styles.row}>
                <Text style={styles.smallHeading}>Engineer at</Text>
                <Text style={styles.smallHeading}>
                  <Icon name="dot-single" size={14} />
                  {user?.company.name}
                </Text>
              </View>
              <Text style={styles.smallHeading}>
                {user?.address.city}, {user?.address.street}
              </Text>
            </View>
          </View>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.title}>About Me</Text>
            <Text
              style={
                styles.body
              }>{`A tech-savvy professional from ${user.address.city}, known for innovative thinking and problem-solving. Works at ${user.company.name}, contributing to cutting-edge client-server solutions. Passionate about leveraging technology to enhance real-time e-markets.`}</Text>
          </View>

          <View style={styles.contact}>
            <Text style={styles.title}>Connect</Text>
            <View>
              <Text style={styles.contactText}>
                Visit my website:{' '}
                <Text style={{color: 'rgba(14, 58, 251, 0.86)'}}>
                  {user.website}
                </Text>
              </Text>

              <Text style={styles.contactText}>
                Email:{' '}
                <Text style={{color: 'rgba(14, 58, 251, 0.86)'}}>
                  {user.email}
                </Text>
              </Text>

              <Text style={styles.contactText}>
                Phone:{' '}
                <Text style={{color: 'rgba(14, 58, 251, 0.86)'}}>
                  {user.phone}
                </Text>
              </Text>
            </View>
          </View>

          {/* FOLLOW */}

          <FlatList
            data={users}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderUsers}
            keyExtractor={item => item.id.toString()}
          />
        </>
      ) : (
        <View style={styles.container}>
          <Text style={{color: 'red', fontFamily: font, fontSize: 20}}>
            No users found
          </Text>
        </View>
      )}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  userDetails: {
    width: 250,
    position: 'absolute',
    right: 7,
    top: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: font,
    fontWeight: '500',
    color: '#000000',
    fontSize: 20,
  },
  body: {
    fontFamily: font,
    fontSize: 15,
    color: '#555',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smallHeading: {
    fontSize: 13,
    color: '#555',
  },
  contact: {
    paddingVertical: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(233, 239, 240, 0.49)',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    gap: 10,
    marginVertical: 12,
  },
  contactText: {
    fontFamily: font,
    fontSize: 14,
    color: '#555',
  },
  person: {
    width: 150,
    borderColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 20,
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  btn: {
    backgroundColor: 'rgba(6, 122, 247, 0.59)',
    padding: 7,
    borderRadius: 7,
  },
  name: {
    paddingHorizontal: 12,
    marginHorizontal: 5,
    fontWeight: 'bold',
    minHeight: 30,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
