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

const UserData: React.FC = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [age, setAge] = React.useState(user.age);
    const [weight, setWeight] = React.useState(user.weight);
    const [height, setHeight] = React.useState(user.height*100);
    const [activity, setActivity] = React.useState(user.activity);
    const [gender, setGender] = React.useState(user.gender);
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

    /*React.useEffect(() => {
        if(user.weight !== 1) //TODO: first login logic to ensure data has been filled
            dispatch(fetchUserMacros(null));
    }, [user]);*/

    const formik = useFormik({
        initialValues: {
            activity: activity,
            weight: weight,
            height: height,
            age: age,
            gender: gender
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
            dispatch(updateUser(values));
        }
    });
    return (
        <ScrollView contentContainerStyle={styles.container}>
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