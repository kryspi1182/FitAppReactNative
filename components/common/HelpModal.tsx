//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  content: React.ReactNode;
};

const HelpModal: React.FC<Props> = (props) => {
  return <ScrollView>{props.content}</ScrollView>;
};

export default HelpModal;
