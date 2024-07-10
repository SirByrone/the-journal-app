import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString());

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('http://backend url/entries', {
        title,
        content,
        category,
        date,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate('EntriesList');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text>Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Text>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <Text>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Entry" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default AddEntryScreen;
