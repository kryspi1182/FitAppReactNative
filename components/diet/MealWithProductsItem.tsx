import * as React from 'react';
import { List, Chip } from 'react-native-paper';

import { MealWithProducts } from '../../models/MealWithProducts';

type Props = {
    meal: MealWithProducts,
    label: string
};

const MealWithProductsItem: React.FC<Props> = (props) => {
    return (<List.Item
        title={props.label}
        description={props.meal.meal.name}
    >
        {props.meal.products.map(product => {
            return <Chip>{product.name}</Chip>
        })}

    </List.Item>);
};

export default MealWithProductsItem;