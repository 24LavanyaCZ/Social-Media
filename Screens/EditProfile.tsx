import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { name, bio, email, phone, onUpdate } = route.params;


  const [newName, setNewName] = useState(name);
  const [newBio, setNewBio] = useState(bio);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);

 
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('name', newName);
      await AsyncStorage.setItem('bio', newBio);
      await AsyncStorage.setItem('email', newEmail);
      await AsyncStorage.setItem('phone', newPhone);

      if(onUpdate){
        onUpdate({
            name:newName,
            bio:newBio,
            email:newEmail,
            phone:newPhone,
        })
      }
      Alert.alert('Profile Updated!', 'Your changes have been saved.');
      navigation.goBack();
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };


  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={newBio}
        onChangeText={setNewBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={newPhone}
        onChangeText={setNewPhone}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changeText: {
    color: '#0d6759',
    marginTop: 8,
    fontSize: 14,
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
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#79b5ac',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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

export default EditProfile;
