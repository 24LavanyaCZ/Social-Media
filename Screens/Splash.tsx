import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Back');   // Replace ---- never comes back to this screen
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/user.gif')}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
