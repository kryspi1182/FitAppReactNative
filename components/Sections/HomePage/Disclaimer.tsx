import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const Disclaimer: React.FC = () => {
  const logo = require("./pb_logo.png");

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text>
          Niniejsza strona internetowa powstała na Wydziale Informatyki
          Politechniki Białostockiej, w ramach pracy inżynierskiej.
        </Text>
      </View>
      <View>
        <Text>Autor: Krystian Wysocki</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  container: {
    alignItems: "center",
  },
});

export default Disclaimer;
