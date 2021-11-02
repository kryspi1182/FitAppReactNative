import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userInfo } from 'os';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

import { selectAllMedicalConditions } from '../../store/medicalConditionsSlice';
import { selectAllProducts } from '../../store/productsSlice';
import { fetchMatchingCustomMeals } from '../../store/customMealsSlice';
//import { AutocompleteItem } from '../common/Autocomplete/AutocompleteItem';
//import AutocompleteInput from '../common/Autocomplete/AutocompleteInput';
import { Macros } from '../../models/Macros';
import { dietApi } from '../api_communication/DietApi';
import { UserDietParams } from '../../models/UserDietParams';
import { MealCategoryEnum } from '../../models/enums/MealCategoryEnum';
import { fetchMatchingMeals } from '../../store/userMealsSlice';
import { AutocompleteItem } from '../common/AutocompleteItem';

type Props = {
    setStartProcess: Function
};

const CustomDiet: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const medicalConditions = useSelector(selectAllMedicalConditions);
    const products = useSelector(selectAllProducts);
    const mappedMedicalConditions = medicalConditions.map(x => {
        return {id: x.id, name: x.name} as AutocompleteItem;
    });
    const mappedProducts = products.map(x => {
        return {id: x.id, name: x.name} as AutocompleteItem;
    });
    const [selectedMedicalConditions, setSelectedMedicalConditions] = React.useState([] as EntityId[]);
    const [selectedUnwantedProducts, setSelectedUnwantedProducts] = React.useState([] as EntityId[]);
    const [selectedMappedMedicalConditions, setSelectedMappedMedicalConditions] = React.useState([] as AutocompleteItem[]);
    const [selectedMappedUnwantedProducts, setSelectedMappedUnwantedProducts] = React.useState([] as AutocompleteItem[]);
    const mapItemsToMedicalConditions = (items: AutocompleteItem[]) => {
        setSelectedMappedMedicalConditions(items);
        setSelectedMedicalConditions(items.map(x => x.id));
    };
    const mapItemsToUnwantedProducts = (items: AutocompleteItem[]) => {
        setSelectedMappedUnwantedProducts(items);
        setSelectedUnwantedProducts(items.map(x => x.id));
    };
    React.useEffect(() => {
        formik.setFieldValue('conditionIds', selectedMedicalConditions);
    }, [selectedMedicalConditions]);

    React.useEffect(() => {
        formik.setFieldValue('unwantedProductIds', selectedUnwantedProducts);
    }, [selectedUnwantedProducts]);

    const formik = useFormik({
        initialValues: {
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            sugar: 0,
            salt: 0,
            fibre: 0,
            unwantedProductIds: [] as EntityId[],
            conditionIds: [] as EntityId[]
        },
        validationSchema: Yup.object({
            calories: Yup.number()
                .min(1000)
                .max(10000)
                .required(),
            carbohydrates: Yup.number()
                .min(10)
                .max(1000)
                .required(),
            protein: Yup.number()
                .min(10)
                .max(1000)
                .required(),
            fat: Yup.number()
                .min(10)
                .max(1000)
                .required(),
            sugar: Yup.number()
                .min(10)
                .max(1000)
                .required(),
            salt: Yup.number()
                .min(1)
                .max(100)
                .required(),
            fibre: Yup.number()
                .min(1)
                .max(100)
                .required(),
        }),
        onSubmit: (values) => {
            //console.log(values);
            const macros = {
                calories: formik.values.calories,
                fat: formik.values.fat,
                carbohydrates: formik.values.carbohydrates,
                sugar: formik.values.sugar,
                fibre: formik.values.fibre,
                protein: formik.values.protein,
                salt: formik.values.salt
            } as Macros;
            var dietParams = {
                macros: macros,
                unwantedProductIds: selectedUnwantedProducts,
                conditionIds: selectedMedicalConditions,
                mealCategory: MealCategoryEnum.BreakfastDinner
            } as UserDietParams;
            dispatch(fetchMatchingCustomMeals(dietParams));
            dietParams.mealCategory = MealCategoryEnum.Lunch;
            dispatch(fetchMatchingCustomMeals(dietParams));
            dietParams.mealCategory = MealCategoryEnum.Snack;
            dispatch(fetchMatchingCustomMeals(dietParams));
            props.setStartProcess(true);
        }
    });
    return(<>
        <ScrollView contentContainerStyle={styles.container}>
            
        </ScrollView>
    </>);
}

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

export default CustomDiet;