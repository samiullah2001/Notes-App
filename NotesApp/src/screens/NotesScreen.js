import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

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
      const newNote = { id: Date.now().toString(), text: input, image };
      const newNotes = [...notes, newNote];
      saveNotes(newNotes);
      setInput('');
      setImage(null);
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

  const openViewModal = (note) => {
    setSelectedNote(note);
    setInput('');
    setImage(note.image);
    setEditingId(note.id);
    setViewModalVisible(true);
  };

  const saveEdit = () => {
    if (editingId) {
      const updatedNotes = notes.map(note =>
        note.id === editingId ? { ...note, text: note.text + '\n' + input, image } : note
      );
      saveNotes(updatedNotes);
      setEditingId(null);
      setViewModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => setSettingsModalVisible(true)}>
          <Ionicons name="settings" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openViewModal(item)}>
            <View style={styles.note}>
              <Text style={styles.noteText}>{item.text}</Text>
              {item.image && <Image source={{ uri: item.image }} style={styles.noteImage} />}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Add Note Button */}
      <TouchableOpacity
        style={[styles.addButton, (input.trim() === '' && !image) && styles.disabledButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Note..</Text>
      </TouchableOpacity>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Write a note..."
            onChangeText={setInput}
          />

          {image && <Image source={{ uri: image }} style={styles.viewNoteImage} />}

          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="image" size={30} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, (input.trim() === '' && !image) && styles.disabledButton]}
            onPress={addNote}
            disabled={input.trim() === '' && !image}
          >
            <Text style={styles.addButtonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* View Note Modal */}
      <Modal visible={viewModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          {selectedNote && (
            <>
              <TouchableOpacity style={styles.closeButton} onPress={() => setViewModalVisible(false)}>
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>
              {selectedNote.image && <Image source={{ uri: selectedNote.image }} style={styles.viewNoteImage} />}
              <Text style={styles.noteText}>{selectedNote.text}</Text>

              <View style={styles.editContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add more text..."
                  value={input}
                  onChangeText={setInput}
                />
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="image" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                  <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </Modal>
      <Modal visible={settingsModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsModalVisible(false)}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>About Notes App</Text>
          <Text>Version: 1.0.0</Text>
          <Text>Contact: support@notesapp.com</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  note: { padding: 10, borderBottomWidth: 1 },
  noteText: { fontSize: 16 },
  noteImage: { width: 50, height: 50, marginTop: 5 },
  viewNoteImage: { width: '100%', height: 300, resizeMode: 'contain', marginVertical: 10 },
  addButton: { backgroundColor: 'blue', padding: 10, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: 16 },
  settingsButton: { padding: 10 },
  modalContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 },
  closeButton: { position: 'absolute', top: 20, right: 20, zIndex: 1 },
  textInput: { borderBottomWidth: 1, width: '80%', padding: 10, marginBottom: 10 },
  editContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 },
  saveButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, marginLeft: 10 },
  disabledButton: { backgroundColor: 'gray', opacity: 0.6 }
});
