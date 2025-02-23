// src/components/NotesApp.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NotesScreen from '../screens/NotesScreen'; // if you use a separate UI screen
import styles from './styles';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) setNotes(JSON.parse(storedNotes));
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = () => {
    if (input.trim() || image) {
      const newNote = { 
        id: Date.now().toString(), 
        text: input, 
        image, 
        category: category.trim().toLowerCase() 
      };
      saveNotes([...notes, newNote]);
      setInput('');
      setImage(null);
      setCategory(''); // Reset category input
      setModalVisible(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uniqueCategories = Array.from(new Set(notes.map(note => note.category).filter(c => c)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = (note.text || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory 
      ? (note.category || '').toLowerCase() === selectedCategory.toLowerCase() 
      : true;
    return matchesSearch && matchesCategory;
  });  
  const onNotePress = (note) => {
    setSelectedNote(note);
    setViewModalVisible(true);
  };
  
  return (
    // For simplicity, we're rendering the UI here directly.
    <NotesScreen 
      notes={filteredNotes} 
      input={input} 
      setInput={setInput} 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      addNote={addNote} 
      pickImage={pickImage}
      searchTerm ={searchTerm}
      setSearchTerm={setSearchTerm}
      showSearch={showSearch}
      setShowSearch={setShowSearch}
      onSettingsPress={() => navigation.navigate('Settings') }
      onNotePress={onNotePress}
      viewModalVisible={viewModalVisible}
      setViewModalVisible={setViewModalVisible}
      selectedNote={selectedNote}  
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      category={category}
      setCategory={setCategory}
      categories={uniqueCategories}
    />
  );
}
