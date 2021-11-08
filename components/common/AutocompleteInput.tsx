import * as React from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { AutocompleteItem } from './AutocompleteItem';


type Props = {
    items: AutocompleteItem[],
    id: string,
    title: string,
    setSelected: Function,
    selectedValues: AutocompleteItem[]
};

const AutocompleteInput: React.FC<Props> = (props) => {
    const [selectedValues, setSelectedValues] = React.useState(props.selectedValues);
    const [mappedSelectedValues, setMappedSelectedValues] = React.useState(props.selectedValues.map(item => {
        return {
            id: item.id.toString(),
            name: item.name
        } as AutocompleteItem;
    }));
    const [mappedItems, setMappedItems] = React.useState(props.items.map(item => {
        return {
            id: item.id.toString(),
            name: item.name
        } as AutocompleteItem;
    }));

    const handleChange = (selectedItems: AutocompleteItem[]) => {
        setMappedSelectedValues(selectedItems);
    };

    React.useEffect(() => {
        props.setSelected(selectedValues);
    }, [selectedValues]);

    return (
        <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={mappedItems}
          uniqueKey="id"
          onSelectedItemsChange={handleChange}
          selectedItems={mappedSelectedValues}
        />
        </View>
    );
  };

export default AutocompleteInput;