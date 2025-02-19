import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import NotesScreen from "./src/screens/NotesScreen";
import NotesApp from "./src/components/NotesApp";


const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotesApp />
    </SafeAreaView>
  );
}
