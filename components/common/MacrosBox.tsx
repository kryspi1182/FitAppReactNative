import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { List, Chip } from 'react-native-paper';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { EntityId } from "@reduxjs/toolkit";
import { Macros } from "../../models/Macros";

type Props = {
    macros: Macros
};

const MacrosBox: React.FC<Props> = (props) => {
    return(<ScrollView>
        <List.Accordion title="Macros per 100g">
            <List.Item title="Calories" description={props.macros.calories + " kcal"} />
            <List.Item title="Carbohydrates" description={props.macros.carbohydrates + " g"} />
            <List.Item title="Protein" description={props.macros.protein + " g"} />
            <List.Item title="Fat" description={props.macros.fat + " g"} />
            <List.Item title="Sugar" description={props.macros.sugar + " g"} />
            <List.Item title="Fibre" description={props.macros.fibre + " g"} />
            <List.Item title="Salt" description={props.macros.salt + " g"} />
        </List.Accordion>
    </ScrollView>);
};

export default MacrosBox;