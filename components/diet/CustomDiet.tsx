import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";

import { useFormik } from "formik";
import * as Yup from "yup";
import { userInfo } from "os";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { selectAllMedicalConditions } from "../../store/medicalConditionsSlice";
import { selectAllProducts } from "../../store/productsSlice";
import {
  fetchMatchingCustomMeals,
  resetCustomMeals,
} from "../../store/customMealsSlice";
//import { AutocompleteItem } from '../common/Autocomplete/AutocompleteItem';
//import AutocompleteInput from '../common/Autocomplete/AutocompleteInput';
import { Macros } from "../../models/Macros";
import { dietApi } from "../api_communication/DietApi";
import { UserDietParams } from "../../models/UserDietParams";
import { MealCategoryEnum } from "../../models/enums/MealCategoryEnum";
import { fetchMatchingMeals } from "../../store/userMealsSlice";
import { AutocompleteItem } from "../common/AutocompleteItem";
import NumberInput from "../common/NumberInput";
import { Button, Divider, useTheme } from "react-native-paper";
import AutocompleteInput from "../common/AutocompleteInput";

type Props = {
  setStartProcess: Function;
};

const CustomDiet: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const medicalConditions = useSelector(selectAllMedicalConditions);
  const products = useSelector(selectAllProducts);
  const mappedMedicalConditions = medicalConditions.map((x) => {
    return { id: x.id, name: x.name } as AutocompleteItem;
  });
  const mappedProducts = products.map((x) => {
    return { id: x.id, name: x.name } as AutocompleteItem;
  });
  const [selectedMedicalConditions, setSelectedMedicalConditions] =
    React.useState([] as EntityId[]);
  const [selectedUnwantedProducts, setSelectedUnwantedProducts] =
    React.useState([] as EntityId[]);
  const [selectedMappedMedicalConditions, setSelectedMappedMedicalConditions] =
    React.useState([] as AutocompleteItem[]);
  const [selectedMappedUnwantedProducts, setSelectedMappedUnwantedProducts] =
    React.useState([] as AutocompleteItem[]);
  const mapItemsToMedicalConditions = (items: AutocompleteItem[]) => {
    setSelectedMappedMedicalConditions(items);
    setSelectedMedicalConditions(items.map((x) => x.id));
  };
  const mapItemsToUnwantedProducts = (items: AutocompleteItem[]) => {
    setSelectedMappedUnwantedProducts(items);
    setSelectedUnwantedProducts(items.map((x) => x.id));
  };
  React.useEffect(() => {
    formik.setFieldValue("conditionIds", selectedMedicalConditions);
  }, [selectedMedicalConditions]);

  React.useEffect(() => {
    formik.setFieldValue("unwantedProductIds", selectedUnwantedProducts);
  }, [selectedUnwantedProducts]);

  const [calories, setCalories] = React.useState(0);
  const [carbohydrates, setCarbohydrates] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [sugar, setSugar] = React.useState(0);
  const [salt, setSalt] = React.useState(0);
  const [fibre, setFibre] = React.useState(0);

  React.useEffect(() => {
    formik.setFieldValue("calories", calories);
  }, [calories]);
  React.useEffect(() => {
    formik.setFieldValue("carbohydrates", carbohydrates);
  }, [carbohydrates]);
  React.useEffect(() => {
    formik.setFieldValue("protein", protein);
  }, [protein]);
  React.useEffect(() => {
    formik.setFieldValue("fat", fat);
  }, [fat]);
  React.useEffect(() => {
    formik.setFieldValue("sugar", sugar);
  }, [sugar]);
  React.useEffect(() => {
    formik.setFieldValue("salt", salt);
  }, [salt]);
  React.useEffect(() => {
    formik.setFieldValue("fibre", fibre);
  }, [fibre]);

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
      conditionIds: [] as EntityId[],
    },
    validationSchema: Yup.object({
      calories: Yup.number().min(1000).max(10000).required(),
      carbohydrates: Yup.number().min(10).max(1000).required(),
      protein: Yup.number().min(10).max(1000).required(),
      fat: Yup.number().min(10).max(1000).required(),
      sugar: Yup.number().min(10).max(1000).required(),
      salt: Yup.number().min(1).max(100).required(),
      fibre: Yup.number().min(1).max(100).required(),
    }),
    onSubmit: (values) => {
      dispatch(resetCustomMeals());
      const macros = {
        calories: formik.values.calories,
        fat: formik.values.fat,
        carbohydrates: formik.values.carbohydrates,
        sugar: formik.values.sugar,
        fibre: formik.values.fibre,
        protein: formik.values.protein,
        salt: formik.values.salt,
      } as Macros;
      var dietParams = {
        macros: macros,
        unwantedProductIds: selectedUnwantedProducts,
        conditionIds: selectedMedicalConditions,
        mealCategory: MealCategoryEnum.Breakfast,
      } as UserDietParams;
      dispatch(fetchMatchingCustomMeals(dietParams));
      dietParams.mealCategory = MealCategoryEnum.Lunch;
      dispatch(fetchMatchingCustomMeals(dietParams));
      dietParams.mealCategory = MealCategoryEnum.Snack;
      dispatch(fetchMatchingCustomMeals(dietParams));
      dietParams.mealCategory = MealCategoryEnum.SecondBreakfast;
      dispatch(fetchMatchingCustomMeals(dietParams));
      dietParams.mealCategory = MealCategoryEnum.Dinner;
      dispatch(fetchMatchingCustomMeals(dietParams));
      props.setStartProcess(true);
    },
  });
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Calories:</Text>
            <NumberInput value={calories} setValue={setCalories} />
            <Divider style={styles.divider} />
          </View>
          <View style={styles.input}>
            <Text>Carbohydrates:</Text>
            <NumberInput value={carbohydrates} setValue={setCarbohydrates} />
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Protein:</Text>
            <NumberInput value={protein} setValue={setProtein} />
            <Divider style={styles.divider} />
          </View>
          <View style={styles.input}>
            <Text>Fat:</Text>
            <NumberInput value={fat} setValue={setFat} />
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Sugar:</Text>
            <NumberInput value={sugar} setValue={setSugar} />
            <Divider style={styles.divider} />
          </View>
          <View style={styles.input}>
            <Text>Salt:</Text>
            <NumberInput value={salt} setValue={setSalt} />
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Fibre:</Text>
            <NumberInput value={fibre} setValue={setFibre} />
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Medical conditions:</Text>
            <AutocompleteInput
              items={mappedMedicalConditions}
              id="medical-conditions"
              title="Medical conditions"
              setSelected={mapItemsToMedicalConditions}
              selectedValues={selectedMappedMedicalConditions}
            />
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.input}>
            <Text>Unwanted products:</Text>
            <AutocompleteInput
              items={mappedProducts}
              id="unwanted-products"
              title="Unwanted products"
              setSelected={mapItemsToUnwantedProducts}
              selectedValues={selectedMappedUnwantedProducts}
            />
            <Divider style={styles.divider} />
          </View>
        </View>
        <Button
          mode="contained"
          compact={true}
          style={styles.button}
          onPress={formik.handleSubmit}
          theme={theme}
        >
          Submit
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    maxWidth: "75%",
    alignSelf: "center",
    margin: 10,
    //backgroundColor: '#4c8bf5'
  },
  input: {
    margin: 10,
    flex: 1,
    minHeight: 30,
  },
  divider: {
    //marginTop: 5,
    backgroundColor: "#000000",
    height: 3,
    borderRadius: 2,
  },
  row: {
    flexDirection: "row",
  },
  picker: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 16,
  },
});

export default CustomDiet;
