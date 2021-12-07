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
            <List.Item title="Calories" description={props.macros.calories} />
            <List.Item title="Carbohydrates" description={props.macros.carbohydrates} />
            <List.Item title="Protein" description={props.macros.protein} />
            <List.Item title="Fat" description={props.macros.fat} />
            <List.Item title="Sugar" description={props.macros.sugar} />
            <List.Item title="Fibre" description={props.macros.fibre} />
            <List.Item title="Salt" description={props.macros.salt} />
        </List.Accordion>
    </ScrollView>);
};

export default MacrosBox;