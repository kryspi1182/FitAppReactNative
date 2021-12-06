import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Text, View, StyleSheet, ScrollView } from 'react-native';

const SavedDietsHelp: React.FC = () => {

    return(<ScrollView>
        <View>
            <Text>Saved diets:</Text>
            <Text>Here you have access to all your saved diets. You can save max 5 diets.</Text>
        </View>
    </ScrollView>)
};

export default SavedDietsHelp;