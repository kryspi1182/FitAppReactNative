import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { fetchBreakfast, fetchLunch, fetchDinner, fetchSnack, selectAllUserMeals } from '../../store/userMealsSlice';
import { selectUserMacros, fetchUserMacros } from '../../store/userMacrosSlice';
import { fetchProducts } from '../../store/productsSlice';
import { selectUser } from '../../store/userSlice';
import DietResult from './DietResult';

const UserDiet: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenOption, setChosenOption] = React.useState("none");
    const [startDietProcess, setStartDietProcess] = React.useState(false);
    const [generateDiet, setGenerateDiet] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [title, setTitle] = React.useState("Generate diet based on your:");

    const macros = useSelector(selectUserMacros);
    const meals = useSelector(selectAllUserMeals);
    const user = useSelector(selectUser);

    React.useEffect(() => {
        switch(step) {
            case 1:
                setTitle("Generate diet based on your:");
                break;
            case 2:
                setTitle("Almost there:");
                break;
            case 3:
                setTitle("Weekly diet:");
                break;
        }
    }, [step]);
    React.useEffect(() => {
        switch(chosenOption) {
            case "data":
                setStep(2);
                break;
            case "form":
                setStep(2);
                break;
            case "none":
                setStep(1);
                break;
        }
    }, [chosenOption]);
    React.useEffect(() => {
        if(user.id !== "0") {
            dispatch(fetchUserMacros(null));
            dispatch(fetchProducts());
        }       
    }, [dispatch]);
    React.useEffect(() => {
        if (user.id !== "0" && macros.calories > 0 && startDietProcess) {
            dispatch(fetchBreakfast(macros));
            dispatch(fetchLunch(macros));
            dispatch(fetchDinner(macros));
            dispatch(fetchSnack(macros));
            setStep(3);
            //setTimeout(() => setGenerateDiet(true), 500);
        }
    }, [startDietProcess]);
    React.useEffect(() => {
        if(meals.some((meal) => meal.mealCategoryId === 1) 
        && meals.some((meal) => meal.mealCategoryId === 2)
        && meals.some((meal) => meal.mealCategoryId === 3))
            setGenerateDiet(true);
    }, [meals]);
    return(<>
    <ScrollView contentContainerStyle={styles.container}>
        <Text>{title}</Text>
        {(chosenOption === "none" && <>
            <Button 
                mode="contained"
                compact={true}
                style={styles.button}
                onPress={() => {setChosenOption("data")}}
            >Your data</Button>
            <Button 
                mode="contained"
                compact={true}
                style={styles.button}
                onPress={() => {setChosenOption("form")}}
            >Macros of your choice</Button>
        </>)}
        {(chosenOption === "data" && <>
            <Button 
                mode="contained"
                compact={true}
                style={styles.button}
                onPress={() => {setChosenOption("none")}}
            >Back</Button>
            <Button 
                mode="contained"
                compact={true}
                style={styles.button}
                onPress={() => {setStartDietProcess(true)}}
            >Generate diet</Button>
        </>)}
        {(chosenOption === "form" && <>
            <Button 
                mode="contained"
                compact={true}
                style={styles.button}
                onPress={() => {setChosenOption("none")}}
            >Back</Button>
            <h3>Form will be here</h3>
        </>)}
        {(generateDiet && <DietResult generateDiet={generateDiet} setGenerateDiet={setGenerateDiet}/>)}

    </ScrollView>
        
    </>)
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
    }
  });

export default UserDiet;

