// src/screens/NotesScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles';

export default function NotesScreen({
   notes, input, setInput, modalVisible, setModalVisible, 
   addNote, pickImage, searchTerm, setSearchTerm, showSearch, setShowSearch, onSettings,
   onNotePress, onSettingsPress, viewModalVisible, setViewModalVisible, selectedNote,
   category, setCategory,  selectedCategory, setSelectedCategory, categories
  }) {
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
  <TouchableOpacity style={styles.rightIcon} onPress={() => setShowSearch(!showSearch)}>
    <Ionicons name="search" size={24} color="black" />
  </TouchableOpacity>
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
          <TouchableOpacity key={index} onPress={() => setSelectedCategory(cat)}>
            <Text style={styles.categoryFilterText}>{cat}</Text>
          </TouchableOpacity>
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
            <TouchableOpacity key={index} onPress={() => setSelectedCategory(cat)}>
              <Text style={styles.categoryFilterText}>{cat}</Text>
            </TouchableOpacity>
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
      {/* View Note Modal */}
      <Modal visible={viewModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedNote && (
            <>
            <Text style={styles.noteText}>{selectedNote.text}</Text>
            {selectedNote.category && <Text style={styles.categoryText}>[{selectedNote.category}]</Text> }
            {selectedNote.image && <Image source={{ uri: selectedNote.image }} style={styles.noteImage} />}
          </>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setViewModalVisible(false)}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
        

      </Modal>
    </View>
  );
}
