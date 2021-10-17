import * as React from 'react';
import { List, Chip } from 'react-native-paper';
import { Button, Text, View, StyleSheet } from 'react-native';

import { MealWithProducts } from '../../models/MealWithProducts';

type Props = {
    meal: MealWithProducts,
    label: string
};

const MealWithProductsItem: React.FC<Props> = (props) => {
    return (<List.Accordion
        title={props.label}
        style={styles.accordion}
    >
        <List.Item title="Name" description={props.meal.meal.name}/>
        <List.Item title="Description" description={props.meal.meal.description}/>
        <List.Item title="Recipe" description={props.meal.meal.recipe}/>
        <Text>Products</Text>
        <View style={styles.container}>
            
            {props.meal.products.map(product => {
                return <Chip key={product.id + " " + props.meal.meal.id} style={styles.chip}>{product.name}</Chip>
            })}
        </View>
    </List.Accordion>);
};

const styles = StyleSheet.create({
    chip: {
      alignSelf: 'center',
      margin: 5,
      flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center'
    },
    accordion: {
        paddingLeft: 20,
        backgroundColor: '#e3e6e4'
    }
  });

export default MealWithProductsItem;