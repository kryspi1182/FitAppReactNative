import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { List, Chip } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import { EntityId } from "@reduxjs/toolkit";

import { selectAllProducts } from "../../store/productsSlice";
import { selectMealById } from "../../store/mealsSlice";
import { RootState } from "../../store/configureStore";
import { MealWithProducts } from "../../models/MealWithProducts";
import { Macros } from "../../models/Macros";
import { ScrollView } from "react-native-gesture-handler";
import MacrosBox from "../common/MacrosBox";

type Props = {
    mealId : EntityId
};

const MealDetails: React.FC<Props> = (props) => {
    const products = useSelector(selectAllProducts);
    let meal = useSelector((state: RootState) => selectMealById(state, props.mealId)); 
    let mealProducts = meal !== undefined ? products.filter(product => meal.mealProducts.some(mealProduct => mealProduct.productId === product.id)) : [];
    let mealWithProducts = {
        meal: meal,
        products: mealProducts
    } as MealWithProducts;
    let macros = {
        calories : 0,
        fat : 0,
        carbohydrates : 0,
        sugar : 0,
        fibre : 0,
        protein : 0,
        salt : 0,
    } as Macros;

    mealWithProducts.products.forEach(product => {
        macros.calories += product.calories;
        macros.fat += product.fat;
        macros.carbohydrates += product.carbohydrates;
        macros.sugar += product.sugar;
        macros.fibre += product.fibre;
        macros.protein += product.protein;
        macros.salt += product.salt;
    });

    return (<ScrollView>
        <View>
            <Text>Details</Text>
        </View>
        <View>
            <MacrosBox macros={macros} />
        </View>
        <View>
            <Text>{mealWithProducts.meal.name}</Text>
            <Text>Description: {mealWithProducts.meal.description}</Text>
            <Text>Recipe: {mealWithProducts.meal.recipe}</Text>
            <Text>Products:</Text>
            <View>
                {mealWithProducts.products.map(product => {
                    let quantity = mealWithProducts.meal.mealProducts.find(mp => mp.productId === product.id);
                    if (quantity) {
                        return <Chip key={product.id + "" + quantity.mealId} >{product.name + " " + quantity.quantity * 100 + "g"}</Chip>
                    }
                })}
            </View>
        </View>
    </ScrollView>);
};

export default MealDetails;