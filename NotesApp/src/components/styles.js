import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 },
  note: { padding: 10, borderBottomWidth: 1 },
  noteText: { fontSize: 16 },
  addButton: { backgroundColor: 'blue', padding: 10, marginTop: 20, alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  textInput: { borderBottomWidth: 1, width: '80%', padding: 10, marginBottom: 10 },
  saveButton: { backgroundColor: 'green', padding: 10, marginBottom: 10, alignItems: 'center' },
  closeButton: { position: 'absolute', top: 20, right: 20 },
});

export default styles;
