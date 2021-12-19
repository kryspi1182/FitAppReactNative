import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import Dialog from "react-native-dialog";

type Props = {
  title: string;
  description?: string;
  setInput: Function;
  //confirm: Function
};

const TextInputModal: React.FC<Props> = (props) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = React.useState("");
  const handleConfirm = () => {
    props.setInput(inputValue);
  };
  return (
    <View>
      <TextInput
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
        style={styles.input}
      />
      <Button onPress={handleConfirm} theme={theme} style={styles.button}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    margin: 10,
  },
  button: {
    maxWidth: "75%",
    alignSelf: "center",
    margin: 10,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
  },
});

export default TextInputModal;
