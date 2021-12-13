import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {selectUser, updateUser} from '../../store/userSlice';
import {selectUserMacros, fetchUserMacros} from '../../store/userMacrosSlice';
import { UserParams } from '../../models/UserParams';
import NumberInput from '../common/NumberInput';
import { selectAllMedicalConditions } from '../../store/medicalConditionsSlice';
import { selectAllProducts } from '../../store/productsSlice';
import { selectAllTrainingConditions } from '../../store/trainingConditionsSlice';
import { selectAllTrainingConditionSeverities } from '../../store/trainingConditionSeveritiesSlice';
import { selectAllBodyTargets } from '../../store/bodyTargetsSlice';
import { AutocompleteItem } from '../common/AutocompleteItem';
import { UserMedicalCondition } from '../../models/UserMedicalCondition';
import { UserUnwantedProduct } from '../../models/UserUnwantedProduct';
import { UserTrainingCondition } from '../../models/UserTrainingCondition';
import { DifficultyEnum } from '../../models/enums/DifficultyEnum';
import AutocompleteInput from '../common/AutocompleteInput';
import LoadingModal from '../common/LoadingModal';
import { WeightTargetEnum } from '../../models/enums/WeightTargetEnum';

const UserData: React.FC = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const medicalConditions = useSelector(selectAllMedicalConditions);
    const products = useSelector(selectAllProducts);
    const trainingConditions = useSelector(selectAllTrainingConditions);
    const trainingConditionSeverities = useSelector(selectAllTrainingConditionSeverities);
    const bodyTargets = useSelector(selectAllBodyTargets);

    const [firstRender, setFirstRender] = React.useState(true);
    const [loaded, setLoaded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const mappedMedicalConditions = medicalConditions.map(x => {
        return {id: x.id, name: x.name} as AutocompleteItem;
    });
    const mappedProducts = products.map(x => {
        return {id: x.id, name: x.name} as AutocompleteItem;
    });
    const mappedTrainingConditions = trainingConditions.map(trainingCondition => {
        var trainingConditionSeverity = trainingConditionSeverities.find(severity => severity.id === trainingCondition.trainingConditionSeverityId);
        var bodyTarget = bodyTargets.find(target => target.id === trainingCondition.bodyTargetId);
        var result = {} as AutocompleteItem;
        result.id = trainingCondition.id;
        if (trainingConditionSeverity && bodyTarget) {
            result.name = trainingConditionSeverity.name + "(" + bodyTarget.target + ")";
        }
        return result;
    });

    const [selectedMedicalConditions, setSelectedMedicalConditions] = React.useState(user.medicalConditions);
    const [selectedUnwantedProducts, setSelectedUnwantedProducts] = React.useState(user.unwantedProducts);
    const [selectedTrainingConditions, setSelectedTrainingConditions] = React.useState(user.trainingConditions);
    const [selectedMappedMedicalConditions, setSelectedMappedMedicalConditions] = React.useState(user.medicalConditions ? mappedMedicalConditions.filter(mapped => user.medicalConditions.some(med => med.medicalConditionId === mapped.id)): [] as AutocompleteItem[]);
    const [selectedMappedUnwantedProducts, setSelectedMappedUnwantedProducts] = React.useState(user.unwantedProducts ? mappedProducts.filter(mapped => user.unwantedProducts.some(prod => prod.productId === mapped.id)): [] as AutocompleteItem[]);
    const [selectedMappedTrainingConditions, setSelectedMappedTrainingConditions] = React.useState(user.trainingConditions ? mappedTrainingConditions.filter(mapped => user.trainingConditions.some(cond => cond.trainingConditionId === mapped.id)): [] as AutocompleteItem[]);
    const mapItemsToMedicalConditions = (items: AutocompleteItem[]) => {
        setSelectedMappedMedicalConditions(items);
        const medCons = medicalConditions.filter(medCon => items.some(item => item.id === medCon.id));
        const userMedCons = medCons.map(medCon => {
            return { userId: user.id, medicalConditionId: medCon.id } as UserMedicalCondition;
        });
        setSelectedMedicalConditions(userMedCons);
    };
    const mapItemsToUnwantedProducts = (items: AutocompleteItem[]) => {
        setSelectedMappedUnwantedProducts(items);
        const unProds = products.filter(prod => items.some(item => item.id === prod.id));
        const userUnProds = unProds.map(prod => {
            return { userId: user.id, productId: prod.id } as UserUnwantedProduct;
        });
        setSelectedUnwantedProducts(userUnProds);
    };
    const mapItemsToTrainingConditions = (items: AutocompleteItem[]) => {
        setSelectedMappedTrainingConditions(items);
        const conditions = trainingConditions.filter(condition => items.some(x => x.id === condition.id));
        const userTrainingConditions = conditions.map(cond => {
            return {userId: user.id, trainingConditionId: cond.id} as UserTrainingCondition;
        });
        setSelectedTrainingConditions(userTrainingConditions);
    };

    const [age, setAge] = React.useState(user.age);
    const [weight, setWeight] = React.useState(user.weight);
    const [height, setHeight] = React.useState(user.height*100);
    const [activity, setActivity] = React.useState(user.activity);
    const [gender, setGender] = React.useState(user.gender);
    const [difficulty, setDifficulty] = React.useState(user.difficultyId);
    const [weightTargetId, setWeightTargetId] = React.useState(user.weightTargetId);
    const [genderText, setGenderText] = React.useState("");
    const [activityText, setActivityText] = React.useState("");

    React.useEffect(() => {
        formik.setFieldValue("age", age);
    }, [age]);

    React.useEffect(() => {
        formik.setFieldValue("weight", weight);
    }, [weight]);

    React.useEffect(() => {
        formik.setFieldValue("height", height/100);
    }, [height]);

    React.useEffect(() => {
        formik.setFieldValue("difficulty", difficulty);
    }, [difficulty]);

    React.useEffect(() => {
        formik.setFieldValue("weightTargetId", weightTargetId);
    }, [weightTargetId]);

    React.useEffect(() => {
        formik.setFieldValue('medicalConditions', selectedMedicalConditions);
    }, [selectedMedicalConditions]);

    React.useEffect(() => {
        formik.setFieldValue('unwantedProducts', selectedUnwantedProducts);
    }, [selectedUnwantedProducts]);

    React.useEffect(() => {
        formik.setFieldValue('trainingConditions', selectedTrainingConditions);
    }, [selectedTrainingConditions]);

    React.useEffect(() => {
        switch(activity) {
            case 1.2:
                setActivityText("None");
                break;
            case 1.35:
                setActivityText("Light");
                break;
            case 1.55:
                setActivityText("Moderate");
                break;
            case 1.75:
                setActivityText("High");
                break;
        }
        formik.setFieldValue("activity", activity);
    }, [activity]);

    React.useEffect(() => {
        //console.log(gender);
        if (gender === 1)
            setGenderText("Male");
        else if (gender === 2)
            setGenderText("Female");

        formik.setFieldValue("gender", gender);
    }, [gender]);

    React.useEffect(() => {
        if(user.weight !== 1) {
            dispatch(fetchUserMacros(null));
            if (firstRender)
                setFirstRender(false);
            else
                setLoaded(true);
        } //TODO: first login logic to ensure data has been filled
            
    }, [user]);

    const formik = useFormik({
        initialValues: {
            activity: activity,
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            difficulty: difficulty,
            weightTargetId: weightTargetId,
            unwantedProducts: selectedUnwantedProducts,
            medicalConditions: selectedMedicalConditions,
            trainingConditions: selectedTrainingConditions
        } as UserParams,
        validationSchema: Yup.object({
            age: Yup.number()
                .min(10, "Little children should have their diets checked by an expert.")
                .max(130, "Are you sure you're that old?")
                .required("Providing your age is mandatory"),
            activity: Yup.number()
                .required("Providing your activity is mandatory"),
            weight: Yup.number()
                .min(30, "Are you sure you weigh less than 30 kg?")
                .max(500, "Are you sure you're providing your weight in kilograms?")
                .required("Providing your weight is mandatory"),
            height: Yup.number()
                .min(1, "Are you sure your height is less than a meter?")
                .max(2.5, "Are you sure you're that tall? Why aren't you in the NBA?")
                .required("Providing your height is mandatory"),
            gender: Yup.number()
                .required("Providing your gender is mandatory")
        }),
        validateOnChange: false,
        onSubmit: (values) => {
            setLoaded(false);
            handleOpen();
            dispatch(updateUser(values));
        }
    });
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*Did not use ModalWithContent here due to modal showing on a submit button, not a dedicated modal button*/}
            <LoadingModal open={open} setOpen={setOpen} loaded={loaded} />
                <Text>Age:</Text>
                <NumberInput 
                    value={age}
                    setValue={setAge}
                />
                <Divider />
                <Text>Height (cm):</Text>
                <NumberInput 
                    value={height}
                    setValue={setHeight}
                />
                <Divider />
                <Text>Weight (kg):</Text>
                <NumberInput 
                    value={weight}
                    setValue={setWeight}
                />
                <Divider />
                <Text>Gender:</Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={setGender}
                >
                    <Picker.Item label="Male" value={1}/>
                    <Picker.Item label="Female" value={2}/>
                </Picker>
                <Divider />
                <Text>Activity:</Text>
                <Picker
                    selectedValue={activity}
                    onValueChange={setActivity}
                >
                    <Picker.Item label="None" value={1.2}/>
                    <Picker.Item label="Light" value={1.35}/>
                    <Picker.Item label="Moderate" value={1.55}/>
                    <Picker.Item label="High" value={1.75}/>
                </Picker>
                <Divider />
                <Text>Target:</Text>
                <Picker
                    selectedValue={weightTargetId}
                    onValueChange={setWeightTargetId}
                >
                    <Picker.Item label="Lose weight" value={WeightTargetEnum.LoseWeight}/>
                    <Picker.Item label="Maintain weight" value={WeightTargetEnum.MaintainWeight}/>
                    <Picker.Item label="Gain weight" value={WeightTargetEnum.GainWeight}/>
                </Picker>
                <Divider />
                <Text>Medical conditions:</Text>
                <AutocompleteInput 
                    items={mappedMedicalConditions}
                    id="medical-conditions"
                    title="Medical conditions"
                    setSelected={mapItemsToMedicalConditions}
                    selectedValues={selectedMappedMedicalConditions}
                />
                <Divider />
                <Text>Unwanted products:</Text>
                <AutocompleteInput 
                    items={mappedProducts}
                    id="unwanted-products"
                    title="Unwanted products"
                    setSelected={mapItemsToUnwantedProducts}
                    selectedValues={selectedMappedUnwantedProducts}
                />
                <Divider />
                <Text>Difficulty:</Text>
                <Picker
                    selectedValue={difficulty}
                    onValueChange={setDifficulty}
                >
                    <Picker.Item label="Beginner" value={DifficultyEnum.Beginner} />
                    <Picker.Item label="Intermediate" value={DifficultyEnum.Intermediate} />
                    <Picker.Item label="Advanced" value={DifficultyEnum.Advanced} />
                    <Picker.Item label="Professional" value={DifficultyEnum.Professional} />
                </Picker>
                <Divider />
                <Text>Noteworthy conditions:</Text>
                <AutocompleteInput 
                    items={mappedTrainingConditions}
                    id="user-training-conditions"
                    title="Noteworthy conditions"
                    setSelected={mapItemsToTrainingConditions}
                    selectedValues={selectedMappedTrainingConditions}
                />
                <Divider />
                <Button 
                    mode="contained"
                    compact={true}
                    style={styles.button}
                    onPress={formik.handleSubmit}
                >Submit</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    button: {
        maxWidth: '75%',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: '#4c8bf5'
    }
});

export default UserData;