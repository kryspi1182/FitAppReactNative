//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import Dialog from "react-native-dialog";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  loaded: boolean;
  open: boolean;
  setOpen: Function;
};

const LoadingModal: React.FC<Props> = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={props.open}>
        <View style={styles.row}>
          {!props.loaded && (
            <View style={styles.col}>
              <ActivityIndicator size={100} color="#000" />
            </View>
          )}
          {props.loaded && (
            <View style={styles.col}>
              <FontAwesome name="check-circle-o" size={100} color="black" />
              <Text>Done</Text>
            </View>
          )}
        </View>
        {props.loaded && <Dialog.Button label="Close" onPress={handleClose} />}
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
    alignItems: "center",
  },
});

export default LoadingModal;
