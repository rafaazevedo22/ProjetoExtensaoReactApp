// Primeiro, instale a biblioteca xlsx para trabalhar com arquivos Excel:
// npm install xlsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import XLSX from 'xlsx';

export default function App() {
  const [excelData, setExcelData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newEntry, setNewEntry] = useState({ name: '', product: '', price: '' });

  // Função para carregar o arquivo Excel
  const loadExcelFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      if (result.type === "success") {
        const fileUri = result.uri;
        const bstr = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        const workbook = XLSX.read(bstr, { type: "base64" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(data);
        setSelectedFile(result.name);
      }
    } catch (error) {
      console.error("Erro ao carregar o arquivo Excel:", error);
      Alert.alert("Erro", "Falha ao carregar o arquivo Excel.");
    }
  };

  // Função para adicionar um novo registro
  const addNewEntry = () => {
    if (!newEntry.name || !newEntry.product || !newEntry.price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const updatedData = [...excelData, [newEntry.name, newEntry.product, newEntry.price]];
    setExcelData(updatedData);
    setNewEntry({ name: '', product: '', price: '' });
    Alert.alert("Sucesso", "Novo registro adicionado!");
  };

  // Função para salvar os dados atualizados no Excel
  const saveExcelFile = async () => {
    try {
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Dados");

      const wbout = XLSX.write(wb, { type: 'base64', bookType: "xlsx" });
      const uri = `${FileSystem.documentDirectory}${selectedFile}`;
      await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });

      Alert.alert("Sucesso", "Arquivo Excel salvo com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar o arquivo Excel:", error);
      Alert.alert("Erro", "Falha ao salvar o arquivo Excel.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Dados - Planilha Excel</Text>

      <TouchableOpacity style={styles.button} onPress={loadExcelFile}>
        <Text style={styles.buttonText}>Carregar Arquivo Excel</Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.fileName}>Arquivo carregado: {selectedFile}</Text>
      )}

      <FlatList
        data={excelData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Nome: {item[0]}</Text>
            <Text>Produto: {item[1]}</Text>
            <Text>Preço: {item[2]}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={newEntry.name}
          onChangeText={(text) => setNewEntry({ ...newEntry, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Produto"
          value={newEntry.product}
          onChangeText={(text) => setNewEntry({ ...newEntry, product: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={newEntry.price}
          onChangeText={(text) => setNewEntry({ ...newEntry, price: text })}
        />
        <TouchableOpacity style={styles.button} onPress={addNewEntry}>
          <Text style={styles.buttonText}>Adicionar Novo Registro</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonSave} onPress={saveExcelFile}>
        <Text style={styles.buttonText}>Salvar Arquivo Excel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonSave: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
