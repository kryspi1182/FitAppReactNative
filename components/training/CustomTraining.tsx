import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Divider } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TrainingCondition } from '../../models/TrainingCondition';
import AutocompleteInput from '../common/AutocompleteInput';
import { TrainingCategoryEnum } from '../../models/enums/TrainingCategoryEnum';
import { DifficultyEnum } from '../../models/enums/DifficultyEnum';
import { BodyTargetEnum } from '../../models/enums/BodyTargetEnum';
import { selectAllTrainingConditions } from '../../store/trainingConditionsSlice';
import { selectAllTrainingConditionSeverities } from '../../store/trainingConditionSeveritiesSlice';
import { AutocompleteItem } from '../common/AutocompleteItem';
import { selectAllBodyTargets } from '../../store/bodyTargetsSlice';
import { UserTrainingParams } from '../../models/UserTrainingParams';
import { fetchMatchingTrainings, resetTrainings } from '../../store/userTrainingsSlice';

type Props = {
    notify: Function,
    startLoading: Function
};

const CustomTraining: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const allTrainingConditions = useSelector(selectAllTrainingConditions);
    const trainingConditionSeverities = useSelector(selectAllTrainingConditionSeverities);
    const bodyTargets = useSelector(selectAllBodyTargets);

    const mappedTrainingConditions = allTrainingConditions.map(trainingCondition => {
        var trainingConditionSeverity = trainingConditionSeverities.find(severity => severity.id === trainingCondition.trainingConditionSeverityId);
        var bodyTarget = bodyTargets.find(target => target.id === trainingCondition.bodyTargetId);
        var result = {} as AutocompleteItem;
        result.id = trainingCondition.id;
        if (trainingConditionSeverity && bodyTarget) {
            result.name = trainingConditionSeverity.name + "(" + bodyTarget.target + ")";
        }
        return result;
    });

    const [selectedMappedTrainingConditions, setSelectedMappedTrainingConditions] = React.useState([] as AutocompleteItem[]);

    const mapItemsToTrainingConditions = (items: AutocompleteItem[]) => {
        setSelectedMappedTrainingConditions(items);
        formik.setFieldValue('trainingConditions', allTrainingConditions.filter(condition => items.some(x => x.id === condition.id)));
    };

    const [trainingCategory, setTrainingCategory] = React.useState(1);
    const [difficulty, setDifficulty] = React.useState(1);
    const [bodyTarget, setBodyTarget] = React.useState(1);
    const [trainingConditions, setTrainingConditions] = React.useState([] as TrainingCondition[]);

    React.useEffect(() => {
        formik.setFieldValue('trainingCategory', trainingCategory);
    }, [trainingCategory]);

    React.useEffect(() => {
        formik.setFieldValue('difficulty', difficulty);
    }, [difficulty]);

    React.useEffect(() => {
        formik.setFieldValue('bodyTarget', bodyTarget);
    }, [bodyTarget]);

    React.useEffect(() => {
        formik.setFieldValue('trainingConditions', trainingConditions);
    }, [trainingConditions]);

    const formik = useFormik({
        initialValues: {
            trainingCategory: trainingCategory,
            difficulty: difficulty,
            trainingConditions: trainingConditions,
            bodyTarget: bodyTarget,
        },
        onSubmit: (values) => {
            props.startLoading();
            dispatch(resetTrainings());
            var params = {
                trainingCategory: values.trainingCategory,
                difficulty: values.difficulty,
                bodyTarget: values.bodyTarget,
                trainingConditions: values.trainingConditions
            } as UserTrainingParams;
            dispatch(fetchMatchingTrainings(params));
            props.notify();
        }
    });
    return(<ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formControl}>
                    <Text>Category</Text>
                    <Picker
                        selectedValue={trainingCategory}
                        onValueChange={setTrainingCategory}
                    >
                        <Picker.Item value={TrainingCategoryEnum.Circuit} label="Circuit" />
                        <Picker.Item value={TrainingCategoryEnum.Fartlek} label="Fartlek" />
                        <Picker.Item value={TrainingCategoryEnum.Flexibility} label="Flexibility" />
                        <Picker.Item value={TrainingCategoryEnum.Continuous} label="Continuous" />
                        <Picker.Item value={TrainingCategoryEnum.Interval} label="Interval" />
                        <Picker.Item value={TrainingCategoryEnum.Plyometric} label="Plyometric" />
                        <Picker.Item value={TrainingCategoryEnum.Weight} label="Weight" />
                    </Picker>
                </View>
                <View style={styles.formControl}>
                    <Text>Difficulty</Text>
                    <Picker
                        selectedValue={difficulty}
                        onValueChange={setDifficulty}
                    >
                        <Picker.Item value={DifficultyEnum.Beginner} label="Beginner" />
                        <Picker.Item value={DifficultyEnum.Intermediate} label="Intermediate" />
                        <Picker.Item value={DifficultyEnum.Advanced} label="Advanced" />
                        <Picker.Item value={DifficultyEnum.Professional} label="Professional" />
                    </Picker>
                </View>
                <View style={styles.formControl}>
                    <Text>Body target</Text>
                    <Picker
                        selectedValue={bodyTarget}
                        onValueChange={setBodyTarget}
                    >
                        <Picker.Item value={BodyTargetEnum.Arms} label="Arms" />
                        <Picker.Item value={BodyTargetEnum.Back} label="Back" />
                        <Picker.Item value={BodyTargetEnum.Chest} label="Chest" />
                        <Picker.Item value={BodyTargetEnum.Stomach} label="Stomach" />
                        <Picker.Item value={BodyTargetEnum.Legs} label="Legs" />
                        <Picker.Item value={BodyTargetEnum.Cardio} label="Cardio" />
                    </Picker>
                </View>
                <View style={styles.formControl}>
                    <Text>Noteworthy conditions</Text>
                    <AutocompleteInput 
                        items={mappedTrainingConditions}
                        id="custom-training-conditions"
                        title="Noteworthy conditions"
                        setSelected={mapItemsToTrainingConditions}
                        selectedValues={selectedMappedTrainingConditions}
                    />
                </View>
                <Button
                    mode="contained"
                    compact={true}
                    style={styles.button}
                    onPress={formik.handleSubmit}
                >
                    Submit
                </Button>
    </ScrollView>);
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
    },
    formControl: {
        width: '33%'
    }
  });

export default CustomTraining;