import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditEntryScreen = ({ route, navigation }) => {
  const { entryId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://backend url/entries/${entryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { title, content, category, date } = response.data;
        setTitle(title);
        setContent(content);
        setCategory(category);
        setDate(new Date(date).toISOString());
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntry();
  }, [entryId]);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(`http://your-backend-url/entries/${entryId}`, {
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
      <Button title="Save Changes" onPress={handleSubmit} />
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

export default EditEntryScreen;
