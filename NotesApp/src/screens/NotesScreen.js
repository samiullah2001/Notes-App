// src/screens/NotesScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles';

export default function NotesScreen({
   notes, input, setInput, modalVisible, setModalVisible, 
   addNote, pickImage, searchTerm, setSearchTerm, showSearch, setShowSearch, onSettingsPress }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
          <Ionicons name="settings" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (showSearch) {
            setSearchTerm('');
          }
          setShowSearch(!showSearch);
          }}
        >
        <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>

      </View>
      {/* Conditionally Render Search Bar */}
      {/* Conditionally Render Search Bar */}
      {showSearch && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchTerm}
          onChangeText={(text) => {
            console.log("Search term:", text);
            setSearchTerm(text);
          }}
        />
      )}

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteText}>{item.text}</Text>
            
          </View>
        )}
      />

      {/* Add Note Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>New Note</Text>
      </TouchableOpacity>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write a note..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.saveButton} onPress={addNote}>
            <Text style={styles.addButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="image" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
