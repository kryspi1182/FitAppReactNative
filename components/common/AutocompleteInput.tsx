import * as React from "react";
import { View, StyleSheet } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { AutocompleteItem } from "./AutocompleteItem";

type Props = {
  items: AutocompleteItem[];
  id: string;
  title: string;
  setSelected: Function;
  selectedValues: AutocompleteItem[];
};

const AutocompleteInput: React.FC<Props> = (props) => {
  const handleChange = (selectedItems: AutocompleteItem[]) => {
    props.setSelected(selectedItems);
  };

  React.useEffect(() => {
    console.log(props.selectedValues);
  }, [props.selectedValues]);

  return (
    <View style={styles.container}>
      <MultiSelect
        hideTags
        items={props.items}
        uniqueKey="id"
        onSelectedItemsChange={handleChange}
        selectedItems={props.selectedValues}
        selectedItemTextColor="#000"
        selectedItemIconColor="#000"
        hideSubmitButton
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default AutocompleteInput;
