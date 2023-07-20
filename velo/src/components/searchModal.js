import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, TextInput, StyleSheet, TouchableHighlight, Text, ScrollView, BackHandler } from 'react-native';

const SearchModal = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const debounceTimer = useRef(null);  // use a ref to store the debounce timer

  const handleSearchChange = (text) => {
    setSearchText(text);

    // clear the previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // set a new debounce timer
    debounceTimer.current = setTimeout(async () => {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=pk.eyJ1IjoiZGphbmdvYW1pZGFsYSIsImEiOiJjbGsxcjdka3kwNTNnM3NveTRscW9xd3pvIn0.1FZ2901YCkfMHzhqnutzdQ`);
      const data = await response.json();
  
      if (data && data.features) {
        setAutocompleteResults(data.features);
      } else {
        setAutocompleteResults([]);  // clear the autocomplete results if the response data is not as expected
      }
    }, 500);  // delay of 500ms
  };

  // clear the debounce timer when the component is unmounted
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Add event listener for hardware back button
  useEffect(() => {
    // Only add event listener if modal is visible
    if (visible) {
      const backAction = () => {
        onClose();  // Close modal when back button is pressed
        return true;  // Prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      // Clean up event listener on component unmount or when modal is no longer visible
      return () => backHandler.remove();
    }
  }, [visible]);  // Recreate event listener whenever visibility changes

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchChange}
          value={searchText}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        <ScrollView style={styles.resultsContainer}>
          {autocompleteResults.map((result, index) => (
            <Text key={index} style={styles.resultText}>{result.place_name}</Text>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  resultsContainer: {
    width: '100%',
    maxHeight: '50%',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default SearchModal;
