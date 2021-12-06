import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';

import { selectAllDifficulties } from '../../../store/difficultiesSlice';
import { selectAllTrainingConditionSeverities } from '../../../store/trainingConditionSeveritiesSlice';

const DataHelp: React.FC = () => {
    const difficulties = useSelector(selectAllDifficulties);
    const trainingConditionSeverities = useSelector(selectAllTrainingConditionSeverities);

    return(<ScrollView>
        <View>
            <Text>Activity levels:</Text>
            <Text>None: No physical exercise in your free time, sitting job.</Text>
            <Text>Light: Sporadic and light physical exercise (walking, lesiure cycling etc.) in your free time, sitting job.</Text>
            <Text>Moderate: Regular and more demanding physical exercise (sports, gym etc.) in your free time or physical job.</Text>
            <Text>High: Regular and more demanding physical exercise (sports, gym etc.) in your free time and physical job.</Text>
        </View>
        <View>
            <Text>Medical conditions:</Text>
            <Text>Medical conditions affecting your everyday diet. We will choose meals accordingly.</Text>
        </View>
        <View>
            <Text>Unwanted products:</Text>
            <Text>Products you wish to not consume. We will choose meals accordingly.</Text>
        </View>
        <View>
            <Text>Noteworthy conditions:</Text>
            <Text>Conditions which might affect your performance or health during exercise.</Text>
            {trainingConditionSeverities.map((severity) => <Text>{severity.name}: {severity.description}</Text>)}
        </View>
        <View>
            <Text>Difficulties:</Text>
            <Text>The level of difficulty which you feel you are comfortable with and most importantly, able to safely conform to (exercises can do harm to your body if executed incorrectly).</Text>
            {difficulties.map((difficulty) => <Text>{difficulty.name}: {difficulty.description}</Text>)}
        </View>
    </ScrollView>)
};

export default DataHelp;