// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings & About</Text>
      <Text style={styles.info}>Version: 1.0.0</Text>
      <Text style={styles.info}>Contact: support@notesapp.com</Text>
      {/* Add more options as needed */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20 },
  buttonText: { color: 'white', marginLeft: 10, fontSize: 16 },
});
