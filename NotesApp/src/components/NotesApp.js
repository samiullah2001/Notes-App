import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles';
import NotesScreen from "../../src/screens/NotesScreen";


export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    if (input.trim()) {
      const newNote = { id: Date.now().toString(), text: input };
      saveNotes([...notes, newNote]);
      setInput('');
      setModalVisible(false);
    }
  };

  return (
    <NotesScreen 
      notes={notes} 
      input={input} 
      setInput={setInput} 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible}
      addNote={addNote}
    />
  );
}
