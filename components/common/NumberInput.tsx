import { PROPERTY_TYPES } from '@babel/types';
import { setNestedObjectValues } from 'formik';
import * as React from 'react';
import { Button, Text, View, TextInput } from 'react-native';

type Props = {
    value: number,
    setValue: Function
};



const NumberInput: React.FC<Props> = (props) => {
    //const [number, setNumber] = React.useState(props.value);
    const [error, setError] = React.useState(false);
    const onChanged = (input: string) => {
        if(!isNaN(parseInt(input))) {
            props.setValue(parseInt(input));
            setError(false);
        }
            
        else
            setError(true);
    };
    return (
        <View>
            <TextInput 
                keyboardType = 'numeric'
                onChangeText = {(text)=> onChanged(text)}
                value = {props.value.toString()}
            />
            {(error && <Text>
                Please provide a numeric value.
            </Text>)}
        </View>
        
         
    )   
}

export default NumberInput;