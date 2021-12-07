import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SavedTrainingsHelp: React.FC = () => {

    return(<ScrollView>
        <View>
            <Text>Saved trainings:</Text>
            <Text>Here you have access to all your saved trainings.</Text>
        </View>
        <View>
            <Text>Icon meaning:</Text>
            <Text><FontAwesome name="check-circle" size={24} color="black" /> - no need for extra caution.</Text>
            <Text><FontAwesome name="info-circle" size={24} color="black" />  - this exercise targets a body part you mentioned in your conditions as "Unnoticable", nothing should happen, just in case be extra focused.</Text>
            <Text><FontAwesome name="warning" size={24} color="black" /> - this exercise targets a body part you mentioned in your conditions as "Mild". Be careful, if you feel any discomfort other than standard exhaustion, reduce the intensity or omit the exercise completely.</Text>
            <Text>We do not show you any exercises/trainings which target a body part you mentioned in your conditions as "Severe".</Text>
        </View>
    </ScrollView>)
};

export default SavedTrainingsHelp;