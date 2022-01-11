//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Text, View, StyleSheet, ScrollView } from "react-native";

import { selectAllDifficulties } from "../../../store/difficultiesSlice";
import { selectAllTrainingConditionSeverities } from "../../../store/trainingConditionSeveritiesSlice";
import { Divider } from "react-native-paper";

const DataHelp: React.FC = () => {
  const difficulties = useSelector(selectAllDifficulties);
  const trainingConditionSeverities = useSelector(
    selectAllTrainingConditionSeverities
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Activity levels:</Text>
        <Text style={styles.subtitle}>None:</Text>
        <Text>No physical exercise in your free time, sitting job.</Text>
        <Text style={styles.subtitle}>Light:</Text>
        <Text>
          Sporadic and light physical exercise (walking, lesiure cycling etc.)
          in your free time, sitting job.
        </Text>
        <Text style={styles.subtitle}>Moderate:</Text>
        <Text>
          Regular and more demanding physical exercise (sports, gym etc.) in
          your free time or physical job.
        </Text>
        <Text style={styles.subtitle}>High:</Text>
        <Text>
          Regular and more demanding physical exercise (sports, gym etc.) in
          your free time and physical job.
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Medical conditions:</Text>
        <Text>
          Medical conditions affecting your everyday diet. We will choose meals
          accordingly.
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Unwanted products:</Text>
        <Text>
          Products you wish to not consume. We will choose meals accordingly.
        </Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Noteworthy conditions:</Text>
        <Text>
          Conditions which might affect your performance or health during
          exercise.
        </Text>
        {trainingConditionSeverities.map((severity) => (
          <View>
            <Text style={styles.subtitle}>{severity.name}:</Text>
            <Text>{severity.description}</Text>
          </View>
        ))}
        <Divider style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Difficulties:</Text>
        <Text>
          The level of difficulty which you feel you are comfortable with and
          most importantly, able to safely conform to (exercises can do harm to
          your body if executed incorrectly).
        </Text>
        {difficulties.map((difficulty) => (
          <View>
            <Text style={styles.subtitle}>{difficulty.name}:</Text>
            <Text>{difficulty.description}</Text>
          </View>
        ))}
        <Divider style={styles.divider} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#000000",
    height: 3,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default DataHelp;
