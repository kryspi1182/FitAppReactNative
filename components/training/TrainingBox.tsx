import * as React from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import { Text, View, StyleSheet } from "react-native";

import { Training } from "../../models/Training";
import { selectAllExercises } from "../../store/exercisesSlice";
import ExerciseBox from "./ExerciseBox";
import { Exercise } from "../../models/Exercise";
import {
  addUserSavedTraining,
  deleteUserSavedTraining,
  selectAllUserSavedTrainings,
} from "../../store/userSavedTrainingsSlice";
import { UserSavedTrainingParams } from "../../models/UserSavedTrainingParams";
import { selectUser } from "../../store/userSlice";
import { List, Button, useTheme } from "react-native-paper";
import { TrainingCondition } from "../../models/TrainingCondition";

type Props = {
  training: Training;
  saveEnabled: boolean;
  deleteEnabled: boolean;
  trainingConditions: TrainingCondition[];
};

type ExerciseWithReps = {
  exercise: Exercise;
  series: number;
  repsPerSeries: number;
};

const TrainingBox: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const exercises = useSelector(selectAllExercises);
  const userSavedTrainings = useSelector(selectAllUserSavedTrainings);
  const user = useSelector(selectUser);
  const [saved, setSaved] = React.useState(false);

  const trainingExercises = exercises.filter((exercise) =>
    props.training.trainingExercises.some(
      (trainingExercise) => trainingExercise.exerciseId === exercise.id
    )
  );
  const exercisesWithReps = props.training.trainingExercises.map(
    (trainingExercise) => {
      let ex = {
        exercise: exercises.find(
          (exercise) => exercise.id === trainingExercise.exerciseId
        ),
        series: trainingExercise.series,
        repsPerSeries: trainingExercise.repsPerSeries,
      } as ExerciseWithReps;
      return ex;
    }
  );
  const handleSave = () => {
    let params = {
      userId: user.id,
      trainingId: props.training.id,
    } as UserSavedTrainingParams;
    dispatch(addUserSavedTraining(params));
    setSaved(true);
  };
  const handleDelete = () => {
    var training = userSavedTrainings.find(
      (x) => x.trainingId === props.training.id
    );
    if (training) dispatch(deleteUserSavedTraining(training.id));
  };

  React.useEffect(() => {
    if (userSavedTrainings.some((x) => x.trainingId === props.training.id))
      setSaved(true);
  }, [userSavedTrainings]);

  return (
    <List.Accordion title={props.training.name} style={styles.accordion}>
      <View style={styles.container}>
        <List.Item
          title="Description"
          description={props.training.description}
        />
        <View>
          <Text style={styles.text}>Exercises:</Text>
          <View style={styles.targetContainer}>
            {trainingExercises.length > 0 &&
              exercisesWithReps.map((exercise) => {
                var severity = props.trainingConditions.find(
                  (trainingCondition) =>
                    exercise.exercise.exerciseBodyTargets.some(
                      (x) => x.bodyTargetId === trainingCondition.bodyTargetId
                    )
                );

                let severityId = 0 as EntityId;
                if (severity) severityId = severity.trainingConditionSeverityId;
                return (
                  <ExerciseBox
                    exercise={exercise.exercise}
                    series={exercise.series}
                    repsPerSeries={exercise.repsPerSeries}
                    severity={severityId}
                  />
                );
              })}
          </View>
        </View>
        {props.saveEnabled && !saved && (
          <View>
            <Button onPress={handleSave} theme={theme}>
              Save
            </Button>
          </View>
        )}
        {props.saveEnabled && saved && (
          <View>
            <Button disabled>Saved</Button>
          </View>
        )}
        {props.deleteEnabled && saved && (
          <View>
            <Button onPress={handleDelete} theme={theme} style={styles.button}>
              Delete
            </Button>
          </View>
        )}
      </View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    margin: 5,
    flex: 1,
  },
  container: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
    //padding: 5,
    margin: 5,
  },
  accordion: {
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  text: {
    //flex: 1,
    paddingLeft: 15,
  },
  targetContainer: {
    //flexWrap: "nowrap",
    padding: 5,
  },
  button: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#000",
    margin: 10,
  },
});

export default TrainingBox;
