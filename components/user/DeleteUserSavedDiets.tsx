import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { deleteUserSavedDiet, selectAllUserSavedDiets } from '../../store/userSavedDietsSlice';

const DeleteUserSavedDiets: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const userSavedDiets = useSelector(selectAllUserSavedDiets);
    const handleDelete = (id: EntityId) => {
        dispatch(deleteUserSavedDiet(id));
    };

    return (<ScrollView>
        <View>
            <Text>
                You have exceeded your limit of 5 saved diets. Delete one of your diets in order to save the new one.
            </Text>
        </View>
        {userSavedDiets.map(savedDiet => <View>
                <Text>{savedDiet.name}</Text>
                <Button onPress={() => handleDelete(savedDiet.id)} theme={theme}>Delete</Button>
        </View>)}
    </ScrollView>)
};

export default DeleteUserSavedDiets;