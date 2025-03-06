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

  const updateNote = (noteId, newText, newCategory, newImage) => {
    const updatedNotes = notes.map(note => {
      if (!note) return note; // Skip if note is null
      if (note.id === noteId) {
        return { 
          ...note, 
          text: newText, 
          category: newCategory || '', // default to empty string if null
          image: newImage 
        };
      }
      return note;
    });
    saveNotes(updatedNotes);
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
  
  const deleteNote = (noteId) => {
    const newNotes = notes.filter(note => note.id !== noteId);
    saveNotes(newNotes);
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedNotes = notes.map(note => {
      if (note.category && note.category.toLowerCase() === categoryToDelete.toLowerCase()) {
        return { ...note, category: '' }; // Clear the category
      }
      return note;
    });
    saveNotes(updatedNotes);
  };

  const uniqueCategories = Array.from(new Set(
    notes.filter(note => note && note.category).map(note => note.category.toLowerCase())
  ));
  

  const filteredNotes = notes.filter(note => {
    if (!note) return false;
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
      deleteNote={deleteNote}
      deleteCategory={deleteCategory}
      updateNote={updateNote}
    />
  );
}
