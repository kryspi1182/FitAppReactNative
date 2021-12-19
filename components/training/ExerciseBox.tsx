import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, Chip, useTheme, Divider } from "react-native-paper";
import { Button, Text, View, StyleSheet } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { Exercise } from "../../models/Exercise";
import { selectAllBodyTargets } from "../../store/bodyTargetsSlice";
import { EntityId } from "@reduxjs/toolkit";
import { TrainingConditionSeverityEnum } from "../../models/enums/TrainingConditionSeverityEnum";

type Props = {
  exercise: Exercise;
  series: number;
  repsPerSeries: number;
  severity: EntityId | undefined;
};

const ExerciseBox: React.FC<Props> = (props) => {
  const theme = useTheme();
  const bodyTargets = useSelector(selectAllBodyTargets);
  const exerciseTargets = bodyTargets.filter((target) =>
    props.exercise.exerciseBodyTargets.some(
      (exerciseBodyTarget) => exerciseBodyTarget.bodyTargetId === target.id
    )
  );
  return (
    <List.Accordion
      title={props.exercise.name}
      style={styles.accordion}
      theme={theme}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            {props.severity == 0 && (
              <FontAwesome
                name="check-circle"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
            {props.severity == TrainingConditionSeverityEnum.Unnoticeable && (
              <FontAwesome
                name="info-circle"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
            {props.severity == TrainingConditionSeverityEnum.Mild && (
              <FontAwesome
                name="warning"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
          </View>
          <View style={styles.col}>
            <List.Item title="Series" description={props.series} />
          </View>
          <View style={styles.col}>
            <List.Item title="Reps" description={props.repsPerSeries} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.textContainer}>
              <Text>Targets:</Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.targetContainer}>
              {exerciseTargets.map((target) => {
                return (
                  <Chip
                    key={target.id + " " + props.exercise.id}
                    style={styles.chip}
                  >
                    <FontAwesome name="crosshairs" size={24} color="white" />
                    <View style={styles.chipTextContainer}>
                      <Text style={styles.chipText}>{target.target}</Text>
                    </View>
                  </Chip>
                );
              })}
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    margin: 5,
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    // flex: 1,
    // flexDirection: "row",
    //alignItems: 'center'
    padding: 30,
  },
  accordion: {
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  chipTextContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 10,
  },
  chipText: {
    //flex: 1,
    //paddingLeft: 15,
    color: "#fff",
  },
  targetContainer: {
    //flexWrap: "nowrap",
    //paddingRight: 30,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  divider: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#000",
    marginTop: 3,
  },
});

export default ExerciseBox;
