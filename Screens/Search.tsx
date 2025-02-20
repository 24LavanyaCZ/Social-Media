import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <TextInput
        placeholder='Search.....'
        style={styles.search}
       />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20
  },
  search: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 6,
    marginVertical: 12,
  },
});
