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
        
        <View style={styles.container}>
            <Text style={styles.text}>Products:</Text>
            <View style={styles.productsContainer}>
                {props.meal.products.map(product => {
                    return <Chip key={product.id + " " + props.meal.meal.id} style={styles.chip}>{product.name}</Chip>
                })}
            </View>
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
    },
    text: {
        flex: 1,
        paddingLeft: 15,
        
    },
    productsContainer: {
        flexWrap: "nowrap",
    }
  });

export default MealWithProductsItem;