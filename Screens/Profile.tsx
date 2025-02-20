import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Profile = ({route}) => {
  const user = route.params.data;
  console.log('USER:', user);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
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
            borderRadius: '50%',
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
          <Text style={{fontFamily: 'Gill Sans', fontSize: 20}}>
            {user.name}
          </Text>
          <Text style={{fontFamily: 'Gill Sans', color: 'rgba(14, 58, 251, 0.86)', fontSize: 13}}>
            {user.email}
          </Text>
          <Text style={{fontFamily: 'Gill Sans', fontSize: 14,color:'#333'}}>
            Visit my website: <Text style={{color:'rgba(14, 58, 251, 0.86)'}}>{user.website}</Text>
          </Text>
        </View>
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.title}>About Me</Text>
        <Text
          style={
            styles.body
          }>{`A tech-savvy professional from ${user.address.city}, known for innovative thinking and problem-solving. Works at ${user.company.name}, contributing to cutting-edge client-server solutions. Passionate about leveraging technology to enhance real-time e-markets.`}</Text>
      </View>
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
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    fontFamily: 'Gill Sans',
    fontSize: 15,
    color:"#333"
  },
});
