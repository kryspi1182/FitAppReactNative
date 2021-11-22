import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { List, Chip } from 'react-native-paper';
import { Button, Text, View, StyleSheet } from 'react-native';

import { Exercise } from "../../models/Exercise";
import { selectAllBodyTargets } from "../../store/bodyTargetsSlice";

type Props = {
    exercise: Exercise,
    series: number,
    repsPerSeries: number
};

const ExerciseBox: React.FC<Props> = (props) => {
    const bodyTargets = useSelector(selectAllBodyTargets);
    const exerciseTargets = bodyTargets.filter(target => props.exercise.exerciseBodyTargets.some(exerciseBodyTarget => exerciseBodyTarget.bodyTargetId === target.id));
    return(<List.Accordion
        title={props.exercise.name}
        style={styles.accordion}
    >
        <List.Item title="Series" description={props.series}/>
        <List.Item title="Reps" description={props.repsPerSeries} />

        <View style={styles.container}>
            <Text style={styles.text}>Targets:</Text>
            <View style={styles.targetContainer}>
                {exerciseTargets.map(target => {
                    return <Chip key={target.id + " " + props.exercise.id} style={styles.chip}>{target.target}</Chip>
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

export default ExerciseBox;