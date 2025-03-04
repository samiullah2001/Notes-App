// src/screens/NotesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles';

export default function NotesScreen({
   notes, input, setInput, modalVisible, setModalVisible, 
   addNote, pickImage, searchTerm, setSearchTerm, showSearch, setShowSearch, onSettings,
   onNotePress, onSettingsPress, viewModalVisible, setViewModalVisible, selectedNote,
   category, setCategory,  selectedCategory, setSelectedCategory, categories, deleteNote, deleteCategory,
   updateNote
  }) {
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
      if (selectedNote) {
        setEditedText(selectedNote.text);
      }
    }, [selectedNote]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity style={styles.leftIcon} onPress={onSettingsPress}>
    <Ionicons name="settings" size={24} color="black" />
  </TouchableOpacity>
  <View style={styles.titleContainer}>
    <Text style={styles.title}>Notes</Text>
  </View>
</View>
      
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
      {/* Dynamic Category Filter UI */}
      <View style={styles.categoryFilterContainer}>
        <TouchableOpacity onPress={() => setSelectedCategory('')}>
          <Text style={styles.categoryFilterText}>All</Text>
        </TouchableOpacity>
        {categories.map((cat, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity key={index} onPress={() => setSelectedCategory(cat)}>
            <Text style={styles.categoryFilterText}>{cat}</Text>
          </TouchableOpacity>
          
  </View>
        ))}
      </View>
      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onNotePress(item)}>
            <View style={styles.note}>
              <Text style={styles.noteText}>{item.text}</Text>
              {item.category && <Text style={styles.categoryText}>[{item.category}]</Text>}
              {item.image && <Image source={{ uri: item.image }} style={styles.noteImage} />}
              <TouchableOpacity onPress={() => deleteNote(item.id)} style={{ marginLeft: 10 }}>
                <Ionicons name="trash" size={15} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          
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
          <TextInput 
          style={styles.textInput} 
          placeholder="Category (e.g., Personal, Work)"
          value={category}
          onChangeText={setCategory}
          />
          

          <View style={styles.categoryFilterContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory('')}>
              <Text style={styles.categoryFilterText}>All</Text>
            </TouchableOpacity>
            {categories.map((cat, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setSelectedCategory(cat)}>
              <Text style={styles.categoryFilterText}>{cat}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCategory(cat)} style={{ marginLeft: 5 }}>
              <Ionicons name="trash" size={16} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

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
 
 {/* View Note Modal with Edit Capability */}
 <Modal visible={viewModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedNote ? (
            <>
              <TextInput
                style={styles.textInput}
                value={editedText}
                onChangeText={setEditedText}
              />
              {selectedNote.category ? (
                <Text style={styles.categoryText}>
                  [{selectedNote.category || ''}]
                </Text>
              ) : null}
              {selectedNote.image && (
                <Image
                  source={{ uri: selectedNote.image }}
                  style={styles.noteImage}
                />
              )}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  if (selectedNote) {
                    updateNote(
                      selectedNote.id,
                      editedText,
                      selectedNote.category ? selectedNote.category : '',
                      selectedNote.image ? selectedNote.image : null
                    );
                  }
                  setViewModalVisible(false);
                }}
              >
                <Text style={styles.addButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text>No note selected</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setViewModalVisible(false)}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}