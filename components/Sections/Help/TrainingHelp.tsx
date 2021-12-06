import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';

import { selectAllTrainingCategories } from '../../../store/trainingCategoriesSlice';

const TrainingHelp: React.FC = () => {
    const trainingCategories = useSelector(selectAllTrainingCategories);

    return(<ScrollView>
        <View>
            <Text>Your data:</Text>
            <Text>We will show you a list of trainings suiting you based on the data you provided in your profile.</Text>
        </View>
        <View>
            <Text>Parameters of your choice:</Text>
            <Text>You decide what type of training you are looking for.</Text>
        </View>
        <View>
            <Text>Save training:</Text>
            <Text>Save a training to your list for easier and quicker access.</Text>
        </View>
        <View>
            <Text>Training categories:</Text>
            <Text>Trainings are grouped into these categories:</Text>
            {trainingCategories.map((category) => <Text>{category.name}: {category.description}</Text>)}
        </View>
        <View>
            <Text>Icon meaning:</Text>
            <Text>icon - no need for extra caution.</Text>
            <Text>icon - this exercise targets a body part you mentioned in your conditions as "Unnoticable", nothing should happen, just in case be extra focused.</Text>
            <Text>icon - this exercise targets a body part you mentioned in your conditions as "Mild". Be careful, if you feel any discomfort other than standard exhaustion, reduce the intensity or omit the exercise completely.</Text>
            <Text>We do not show you any exercises/trainings which target a body part you mentioned in your conditions as "Severe".</Text>
        </View>
    </ScrollView>)
};

export default TrainingHelp;