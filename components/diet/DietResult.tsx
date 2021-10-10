import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Button, Text, View } from 'react-native';

import { fetchBreakfast, fetchSnack, fetchDinner, fetchLunch, selectAllUserMeals } from '../../store/userMealsSlice';
import WeekDietBox from './WeekDietBox';

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

type Props = {
    generateDiet: boolean,
    setGenerateDiet: Function
};

const DietResult: React.FC<Props> = (props) => {
    const dispatch = useDispatch();

    const [dietReady, setDietReady] = React.useState(false);
    const [breakfastDinners, setBreakfastDinners] = React.useState(Array<EntityId>());
    const [lunches, setLunches] = React.useState(Array<EntityId>());
    const [snacks, setSnacks] = React.useState(Array<EntityId>());
    const [dietBreakfast, setDietBreakfast] = React.useState(Array<EntityId>());
    const [dietSecondBreakfast, setDietSecondBreakfast] = React.useState(Array<EntityId>());
    const [dietLunch, setDietLunch] = React.useState(Array<EntityId>());
    const [dietSnack, setDietSnack] = React.useState(Array<EntityId>());
    const [dietDinner, setDietDinner] = React.useState(Array<EntityId>());

    const meals = useSelector(selectAllUserMeals);

    const pickDietMeals = () => {
        const breakfastDinnerIds = breakfastDinners.length;
        const lunchIds = lunches.length;
        const snackIds = snacks.length;
        for(var i = 0; i < 7; i++) {
            setDietBreakfast(old => [...old, breakfastDinners[getRandomInt(breakfastDinnerIds)]]);
            setDietSecondBreakfast(old => [...old, snacks[getRandomInt(snackIds)]]);
            setDietLunch(old => [...old, lunches[getRandomInt(lunchIds)]]);
            setDietSnack(old => [...old, snacks[getRandomInt(snackIds)]]);
            setDietDinner(old => [...old, breakfastDinners[getRandomInt(breakfastDinnerIds)]]);          
        }
        setDietReady(true);
    };

    React.useEffect(() => {
        if(breakfastDinners.length > 0
            && lunches.length > 0
            && snacks.length > 0) {
                pickDietMeals();
            }
    }, [breakfastDinners, lunches, snacks]);

    React.useEffect(() => {
        if(props.generateDiet && meals.length > 0) {
            setBreakfastDinners(meals.filter((meal) => meal.mealCategoryId === 1).map((meal) => meal.id));
            setLunches(meals.filter((meal) => meal.mealCategoryId === 2).map((meal) => meal.id));
            setSnacks(meals.filter((meal) => meal.mealCategoryId === 3).map((meal) => meal.id));
        }
            
    }, [props.generateDiet]);

    return (<View>
        {((dietReady 
        && dietBreakfast.length === 7
        && dietSecondBreakfast.length === 7
        && dietLunch.length === 7
        && dietSnack.length === 7
        && dietDinner.length === 7) && 
        <WeekDietBox 
            breakfasts={dietBreakfast}
            secondBreakfasts={dietSecondBreakfast}
            lunches={dietLunch}
            snacks={dietSnack}
            dinners={dietDinner}/>)}
    </View>)
};

export default DietResult;