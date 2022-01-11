//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

import {
  fetchMatchingTrainings,
  fetchMatchingTrainingsUserData,
  resetTrainings,
  selectAllUserTrainings,
} from "../../store/userTrainingsSlice";
import { UserTrainingParams } from "../../models/UserTrainingParams";
import TrainingResult from "./TrainingResult";
import CustomTraining from "./CustomTraining";
import { selectUser } from "../../store/userSlice";
import { selectAllTrainingConditions } from "../../store/trainingConditionsSlice";
import LoadingModal from "../common/LoadingModal";
import ErrorBox from "../common/ErrorBox";

const UserTraining: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [chosenOption, setChosenOption] = React.useState("none");
  const [step, setStep] = React.useState(1);
  const [title, setTitle] = React.useState("Find trainings based on:");
  const [startTrainingProcess, setStartTrainingProcess] = React.useState(false);
  const [showTraining, setShowTraining] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [notFirstRender, setNotFirstRender] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const startLoading = () => {
    setLoaded(false);
    handleOpen();
  };

  const notify = () => {
    setNotFirstRender(true);
    setTimeout(() => {
      if (!loaded) {
        setShowError(true);
        setLoaded(true);
      }
    }, 10000);
  };

  const userTrainings = useSelector(selectAllUserTrainings);
  const trainingConditions = useSelector(selectAllTrainingConditions);
  const user = useSelector(selectUser);

  React.useEffect(() => {
    switch (step) {
      case 1:
        setTitle("Find trainings based on:");
        break;
      case 2:
        setTitle("Almost there:");
        break;
      case 3:
        setTitle("Matching trainings:");
        break;
    }
  }, [step]);
  React.useEffect(() => {
    switch (chosenOption) {
      case "data":
        setStep(2);
        break;
      case "form":
        setStep(2);
        break;
      case "none":
        setStep(1);
        setStartTrainingProcess(false);
        setShowTraining(false);
        setShowError(false);
        setNotFirstRender(false);
        break;
    }
  }, [chosenOption]);
  React.useEffect(() => {
    if (startTrainingProcess) {
      //setNotFirstRender(true);
      startLoading();
      dispatch(resetTrainings());
      let params = {
        difficulty: user.difficultyId,
        trainingConditions: trainingConditions.filter((x) =>
          user.trainingConditions.some((y) => y.trainingConditionId === x.id)
        ),
      } as UserTrainingParams;
      dispatch(fetchMatchingTrainingsUserData(params));
      notify();
    }
  }, [startTrainingProcess]);

  React.useEffect(() => {
    if (userTrainings.length > 0) {
      setShowTraining(true);
      setShowError(false);
      setLoaded(true);
    } else {
      setShowTraining(false);
      setShowError(true);
    }
  }, [userTrainings]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/*Did not use ModalWithContent here due to modal showing on a submit button, not a dedicated modal button*/}
        <LoadingModal open={open} setOpen={setOpen} loaded={loaded} />
        <Text style={styles.title}>{title}</Text>
        {chosenOption === "none" && (
          <>
            <Button
              onPress={() => {
                setChosenOption("data");
              }}
              mode="contained"
              compact={true}
              style={styles.button}
              theme={theme}
            >
              Your data
            </Button>
            <Button
              onPress={() => {
                setChosenOption("form");
              }}
              mode="contained"
              compact={true}
              style={styles.button}
              theme={theme}
            >
              Parameters of your choice
            </Button>
          </>
        )}
        {chosenOption === "data" && (
          <>
            <Button
              onPress={() => {
                setChosenOption("none");
              }}
              mode="contained"
              compact={true}
              style={styles.button}
              theme={theme}
            >
              Back
            </Button>
            <Button
              onPress={() => {
                setStartTrainingProcess(true);
              }}
              mode="contained"
              compact={true}
              style={styles.button}
              theme={theme}
            >
              Find trainings
            </Button>
          </>
        )}
        {chosenOption === "form" && (
          <>
            <Button
              onPress={() => {
                setChosenOption("none");
              }}
              mode="contained"
              compact={true}
              style={styles.button}
              theme={theme}
            >
              Back
            </Button>
            <CustomTraining notify={notify} startLoading={startLoading} />
          </>
        )}

        {showTraining && notFirstRender && (
          <TrainingResult
            trainingConditions={trainingConditions.filter((x) =>
              user.trainingConditions.some(
                (y) => y.trainingConditionId === x.id
              )
            )}
          />
        )}
        {showError && notFirstRender && !showTraining && (
          <ErrorBox message="No matching trainings were found." />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
  button: {
    width: "75%",
    alignSelf: "center",
    margin: 10,
    //backgroundColor: '#4c8bf5'
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    margin: 10,
  },
});

export default UserTraining;
