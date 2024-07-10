import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EntriesListScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://backend url/entries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntries();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text>{item.category}</Text>
      <Text>{new Date(item.date).toLocaleDateString()}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditEntry', { entryId: item._id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      <Button
        title="Add New Entry"
        onPress={() => navigation.navigate('AddEntry')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  entry: {
    padding: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

export default EntriesListScreen;
