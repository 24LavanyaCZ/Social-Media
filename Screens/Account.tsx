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
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const font = Platform.OS === 'ios' ? 'Gill Sans' : 'Lato-Regular';

const Account = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);


  
  const loadProfileData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedBio = await AsyncStorage.getItem('bio');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedImage = await AsyncStorage.getItem('image');
      if (storedName) setName(storedName);
      if (storedBio) setBio(storedBio);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedImage) setSelectedImage(storedImage);

    } catch (error) {
      console.log('Error loading stored data:', error);
    }
  };

  const handlePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      try {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          let imageUri = response.assets?.[0]?.uri;
          if (imageUri) {
            setSelectedImage(imageUri);
            await AsyncStorage.setItem('image', imageUri);
            Alert.alert('Image saved successfully!');
          } else {
            console.log('No image URI found');
          }
        }
      } catch (error) {
        console.log('Error storing image:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ShowGram</Text>

      <View style={{alignItems: 'center'}}>
        <View style={styles.shadowContainer}>
          <Image
            source={{
              uri: selectedImage
                ? selectedImage
                : 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBvcnRyYWl0fGVufDB8fDB8fHww',
            }}
            style={styles.image}
          />
        </View>


        <TouchableOpacity
          style={{position: 'absolute', top:120, right:150, zIndex:10,backgroundColor:'#f6f6f4',padding:10,borderRadius:50}}
          onPress={() => handlePicker()}>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>


        <Text style={styles.name}>{name ? name : 'UnknownUser'}</Text>
        <Text style={styles.bio}>{bio ? bio : 'No bio'}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>📧 {email ? email : 'Set email'}</Text>
          <Text style={styles.infoText}>📞 {phone ? phone : 'Set Phone'}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditProfile', {
              name,
              bio,
              email,
              phone,
              onUpdate: updated => {
                setName(updated.name);
                setBio(updated.bio);
                setEmail(updated.email);
                setPhone(updated.phone);
              },
            })
          }>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontFamily: font,
    marginBottom: 12,
    fontWeight: '700',
    padding: 12,
  },
  shadowContainer: {
    width: 150,
    height: 150,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#161663',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 50,
    marginBottom:20

  },
  image: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex:1
  },
  btn: {
    marginVertical: 12,
    padding: 6,
    borderColor: '#0d6759',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#79b5ac',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: '#333',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#79b5ac',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
export default Account;
