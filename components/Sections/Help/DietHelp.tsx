import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';

const DietHelp: React.FC = () => {

    return(<ScrollView>
        <View>
            <Text>Your data:</Text>
            <Text>We will calculate your daily macros based on the data you provided in your profile.</Text>
        </View>
        <View>
            <Text>Macros of your choice:</Text>
            <Text>You decide how much of each macro you want to consume daily.</Text>
        </View>
        <View>
            <Text>Save diet:</Text>
            <Text>Save the generated diet with a name of your choice. That diet will show up in the "Saved diets" tab.</Text>
        </View>
    </ScrollView>)
};

export default DietHelp;