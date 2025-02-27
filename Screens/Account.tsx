import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {launchImageLibrary} from 'react-native-image-picker';


const font = Platform.OS === 'ios' ? 'Gill Sans' : 'Lato-Regular';

const Account = () => {
  const screenWidth = Dimensions.get('window').width;
  const [selectedImage, setSelectedImage] = useState(null);
  const handlePicker = async()=>{
    // const options = {
    //   mediaType: 'photo',
    //   includeBase64: false,
    //   maxHeight: 2000,
    //   maxWidth: 2000,
    // };
    // launchImageLibrary(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('Image picker error: ', response.error);
    //   } else {
    //     let imageUri = response.uri || response.assets?.[0]?.uri;
    //     setSelectedImage(imageUri);
    //   }
    // });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ShowGram</Text>

      <View style={{alignItems:'center'}}>
      <View style={styles.shadowContainer}>
       
       <Image
         source={{
           uri: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBvcnRyYWl0fGVufDB8fDB8fHww',
         }}
         style={styles.image}
       />
       
     </View>
     <TouchableOpacity
        style={styles.btn}
        onPress={()=>handlePicker()}
     >
        <Text style={{color:'#ffffff',fontFamily:font,fontWeight:600,fontSize:16}}>Upload picture</Text>
       </TouchableOpacity>
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  btn:{
    marginVertical:12,
    padding:6,
    borderColor:"#0d6759",
    borderWidth:1,
    borderRadius:12,
    backgroundColor:"#79b5ac"
  }
});
export default Account;