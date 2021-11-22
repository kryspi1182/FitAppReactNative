import * as React from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Button, Text, View } from 'react-native';

import DayDietBox from './DayDietBox';
import { Meal } from '../../models/Meal';
import { DietMeals } from '../../models/DietMeals';
import { Product } from '../../models/Product';
import { MealWithProducts } from '../../models/MealWithProducts';
import { selectAllUserMeals } from '../../store/userMealsSlice';
import { selectAllMeals } from '../../store/mealsSlice';
import { selectAllProducts } from '../../store/productsSlice';

type Props = {
    breakfasts: EntityId[],
    secondBreakfasts: EntityId[],
    lunches: EntityId[],
    snacks: EntityId[],
    dinners: EntityId[],
};

const WeekDietBox: React.FC<Props> = (props) => {
    const meals = useSelector(selectAllMeals);
    const allProducts = useSelector(selectAllProducts);
    const mapMealToMealWithProducts = (m: Meal) => {
        const prod = allProducts.filter((product) => m.mealProducts.some((mealProduct) => mealProduct.productId === product.id));
        return {meal: m, products: prod} as MealWithProducts;
    };
    const mapIdsToMealsWithProducts = (mealIds: EntityId[]) => {
        return mealIds.map((meal) => {
            return mapMealToMealWithProducts(meals.filter((m) => m.id === meal)[0]);
        });
    };

    const breakfasts = mapIdsToMealsWithProducts(props.breakfasts);
    const secondBreakfasts = mapIdsToMealsWithProducts(props.secondBreakfasts);
    const lunches = mapIdsToMealsWithProducts(props.lunches);
    const snacks = mapIdsToMealsWithProducts(props.snacks);
    const dinners = mapIdsToMealsWithProducts(props.dinners);
    return(<View>
            <DayDietBox meals={[breakfasts[0], secondBreakfasts[0], lunches[0], snacks[0], dinners[0]]} day="Monday" />
            <DayDietBox meals={[breakfasts[1], secondBreakfasts[1], lunches[1], snacks[1], dinners[1]]} day="Tuesday" />
            <DayDietBox meals={[breakfasts[2], secondBreakfasts[2], lunches[2], snacks[2], dinners[2]]} day="Wednesday" />
            <DayDietBox meals={[breakfasts[3], secondBreakfasts[3], lunches[3], snacks[3], dinners[3]]} day="Thursday" />
            <DayDietBox meals={[breakfasts[4], secondBreakfasts[4], lunches[4], snacks[4], dinners[4]]} day="Friday" />
            <DayDietBox meals={[breakfasts[5], secondBreakfasts[5], lunches[5], snacks[5], dinners[5]]} day="Saturday" />
            <DayDietBox meals={[breakfasts[6], secondBreakfasts[6], lunches[6], snacks[6], dinners[6]]} day="Sunday" />
            
    </View>)
};

export default WeekDietBox;