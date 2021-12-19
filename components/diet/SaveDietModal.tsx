import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { selectAllUserSavedDiets } from '../../store/userSavedDietsSlice';
import TextInputModal from '../common/TextInputModal';
import DeleteUserSavedDiets from '../user/DeleteUserSavedDiets';

type Props = {
    setInput: Function
};

const SaveDietModal: React.FC<Props> = (props) => {
    const userSavedDiets = useSelector(selectAllUserSavedDiets);
    return(<ScrollView>
        {(userSavedDiets.length < 5 && <TextInputModal title="Save diet" setInput={props.setInput}/>)}
        {(userSavedDiets.length >= 5 && <DeleteUserSavedDiets />)}
    </ScrollView>)
};

export default SaveDietModal;