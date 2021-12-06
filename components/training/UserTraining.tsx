import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { fetchMatchingTrainings, fetchMatchingTrainingsUserData, selectAllUserTrainings } from '../../store/userTrainingsSlice';
import { UserTrainingParams } from '../../models/UserTrainingParams';
import TrainingResult from './TrainingResult';
import CustomTraining from './CustomTraining';
import { selectUser } from '../../store/userSlice';
import { selectAllTrainingConditions } from '../../store/trainingConditionsSlice';

const UserTraining: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenOption, setChosenOption] = React.useState("none");
    const [step, setStep] = React.useState(1);
    const [title, setTitle] = React.useState("Find trainings based on:");
    const [startTrainingProcess, setStartTrainingProcess] = React.useState(false);
    const [showTraining, setShowTraining] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const [notFirstRender, setNotFirstRender] = React.useState(false);

    const userTrainings = useSelector(selectAllUserTrainings);
    const trainingConditions = useSelector(selectAllTrainingConditions);
    const user = useSelector(selectUser);

    React.useEffect(() => {
        switch(step) {
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
        switch(chosenOption) {
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
                //setNotFirstRender(false);
                break;
        }
    }, [chosenOption]);
    React.useEffect(() => {
        if(startTrainingProcess) {
            //setNotFirstRender(true);
            let params = {
                difficulty: user.difficultyId,
                trainingConditions: trainingConditions.filter(x => user.trainingConditions.some(y => y.trainingConditionId === x.id)),
            } as UserTrainingParams;
            dispatch(fetchMatchingTrainingsUserData(params));
        }
    }, [startTrainingProcess]);

    React.useEffect(() => {
        if(userTrainings.length > 0) {
            setShowTraining(true);
            setShowError(false);
        }
        else {
            setShowTraining(false);
            setShowError(true);
        }
    }, [userTrainings]);
    
    return(<>
        <ScrollView contentContainerStyle={styles.container}>
            <Text>{title}</Text>
        {(chosenOption === "none" && <>
            <Button 
                onPress={() => {setChosenOption("data")}}
                mode="contained"
                compact={true}
                style={styles.button}
            >Your data (recommended for beginners)</Button>
            <Button 
                onPress={() => {setChosenOption("form")}}
                mode="contained"
                compact={true}
                style={styles.button}
            >Parameters of your choice</Button>
        </>)}
        {(chosenOption === "data" && <>
            <Button 
                onPress={() => {setChosenOption("none")}}
                mode="contained"
                compact={true}
                style={styles.button}
            >Back</Button>
            <Button 
                onPress={() => {setStartTrainingProcess(true)}}
                mode="contained"
                compact={true}
                style={styles.button}
            >Find trainings</Button>
        </>)}
        {(chosenOption === "form" && <>
            <Button 
                onPress={() => {setChosenOption("none")}}
                mode="contained"
                compact={true}
                style={styles.button}
            >Back</Button>
            <CustomTraining />
        </>)}

            {(showTraining && <TrainingResult trainingConditions={trainingConditions.filter(x => user.trainingConditions.some(y => y.trainingConditionId === x.id))}/>)}
    </ScrollView>
    </>)
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
    },
    button: {
        width: '75%',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: '#4c8bf5'
    }
  });

export default UserTraining;