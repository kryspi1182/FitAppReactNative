import * as React from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Text, View, StyleSheet } from 'react-native';

import { Training } from '../../models/Training';
import { selectAllExercises } from '../../store/exercisesSlice';
import ExerciseBox from './ExerciseBox';
import { Exercise } from '../../models/Exercise';
import { addUserSavedTraining } from '../../store/userSavedTrainingsSlice';
import { UserSavedTrainingParams } from '../../models/UserSavedTrainingParams';
import { selectUser } from '../../store/userSlice';
import { List } from 'react-native-paper';

type Props = {
    training: Training
};

type ExerciseWithReps = {
    exercise: Exercise,
    series: number,
    repsPerSeries: number
};

const TrainingBox: React.FC<Props> = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const exercises = useSelector(selectAllExercises);
    const user = useSelector(selectUser);
    const trainingExercises = exercises.filter(exercise => props.training.trainingExercises
        .some(trainingExercise => trainingExercise.exerciseId === exercise.id));
    const exercisesWithReps = props.training.trainingExercises.map(trainingExercise => {
        let ex = {
            exercise: exercises.find(exercise => exercise.id === trainingExercise.exerciseId),
            series: trainingExercise.series,
            repsPerSeries: trainingExercise.repsPerSeries
        } as ExerciseWithReps;
        return ex;
    });
    const handleSave = () => {
        let params = {
            userId: user.id,
            trainingId: props.training.id
        } as UserSavedTrainingParams;
        dispatch(addUserSavedTraining(params));
    };
    
    return (<List.Accordion 
            title={props.training.name} 
            style={styles.accordion}
        >
            <List.Item title="Description" description={props.training.description} />
            <View style={styles.container}>
            <Text style={styles.text}>Exercises:</Text>
            <View style={styles.targetContainer}>
                {trainingExercises.length > 0 && exercisesWithReps.map(exercise => {
                    return (
                        <ExerciseBox exercise={exercise.exercise} series={exercise.series} repsPerSeries={exercise.repsPerSeries}  />);
                })}
            </View>
        </View>

                    
    </List.Accordion>);
};

const styles = StyleSheet.create({
    chip: {
      alignSelf: 'center',
      margin: 5,
      flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center'
    },
    accordion: {
        paddingLeft: 20,
        backgroundColor: '#e3e6e4'
    },
    text: {
        flex: 1,
        paddingLeft: 15,
        
    },
    targetContainer: {
        flexWrap: "nowrap",
    }
  });

export default TrainingBox;