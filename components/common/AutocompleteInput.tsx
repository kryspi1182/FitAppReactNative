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

    const handleChange = (selectedItems: AutocompleteItem[]) => {
        setSelectedValues(selectedItems);
    };

    React.useEffect(() => {
        props.setSelected(selectedValues);
    }, [selectedValues]);

    return (
        <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={props.items}
          uniqueKey="id"
          onSelectedItemsChange={handleChange}
          selectedItems={selectedValues}
        />
        </View>
    );
  };

export default AutocompleteInput;