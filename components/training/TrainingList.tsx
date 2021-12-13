import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { getAllEnumEntries, getAllEnumKeys, getAllEnumValues } from 'enum-for';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import Dialog from "react-native-dialog";

import { selectAllUserTrainings } from '../../store/userTrainingsSlice';
import { TrainingCategoryEnum } from '../../models/enums/TrainingCategoryEnum';
import TrainingBox from './TrainingBox';
import { Training } from '../../models/Training';
import { TrainingCondition } from '../../models/TrainingCondition';

type Props = {
    trainings: Training[],
    saveEnabled: boolean,
    deleteEnabled: boolean,
    trainingConditions: TrainingCondition[],
};

const TrainingList: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const trainingCategoryIds = getAllEnumValues(TrainingCategoryEnum);
    const trainingCategories = getAllEnumKeys(TrainingCategoryEnum);
    return(<ScrollView contentContainerStyle={styles.container}>
        {trainingCategoryIds.map(catId => {
            if (props.trainings.some(training => training.trainingCategoryId === catId)) {
                return (<List.Accordion title={trainingCategories[catId-1]}>
                    <View style={styles.container}>
                        {props.trainings.filter(training => training.trainingCategoryId === catId)
                            .map(training => {
                                return (<TrainingBox 
                                    training={training}
                                    saveEnabled={props.saveEnabled}
                                    deleteEnabled={props.deleteEnabled} 
                                    trainingConditions={props.trainingConditions} />);
                        })}
                    </View>
                </List.Accordion>);  
            }
        })}
    </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });

export default TrainingList;