import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { fetchBreakfast, fetchLunch, fetchDinner, fetchSnack, selectAllUserMeals } from '../../store/userMealsSlice';
import { selectUserMacros, fetchUserMacros } from '../../store/userMacrosSlice';
import { fetchProducts } from '../../store/productsSlice';
import DietResult from './DietResult';

const UserDiet: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenOption, setChosenOption] = React.useState("none");
    const [startDietProcess, setStartDietProcess] = React.useState(false);
    const [generateDiet, setGenerateDiet] = React.useState(false);

    const macros = useSelector(selectUserMacros);
    const meals = useSelector(selectAllUserMeals);
    React.useEffect(() => {
        dispatch(fetchUserMacros(null));
        dispatch(fetchProducts());
    }, [dispatch]);
    React.useEffect(() => {
        //console.log("macros: ");
        //console.log(macros);
        if (macros.calories > 0 && startDietProcess) {
            dispatch(fetchBreakfast(macros));
            dispatch(fetchLunch(macros));
            dispatch(fetchDinner(macros));
            dispatch(fetchSnack(macros));
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
    <View>
    <Text>User diet component</Text>
        {(chosenOption === "none" && <>
            <Button onPress={() => {setChosenOption("data")}}>Generate diet based on your data (recommended for beginners)</Button>
            <Button onPress={() => {setChosenOption("form")}}>Generate diet based on macros of your choice</Button>
        </>)}
        {(chosenOption === "data" && <>
            <Button onPress={() => {setChosenOption("none")}}>Back</Button>
            <Button onPress={() => {setStartDietProcess(true)}}>Generate diet</Button>
        </>)}
        {(chosenOption === "form" && <>
            <Button onPress={() => {setChosenOption("none")}}>Back</Button>
            <h3>Form will be here</h3>
        </>)}
        {(generateDiet && <DietResult generateDiet={generateDiet} setGenerateDiet={setGenerateDiet}/>)}

    </View>
        
    </>)
};

export default UserDiet;

