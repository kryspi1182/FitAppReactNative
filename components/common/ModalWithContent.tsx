import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Dialog from "react-native-dialog";

type Props = {
    title: string | React.ReactNode,
    content: React.ReactNode
};

const ModalWithContent: React.FC<Props> = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(<View style={styles.container}>
        <Dialog.Container visible={open}>
            <Dialog.Title>{typeof props.title === "string" ? props.title : "Help" }</Dialog.Title>
                {props.content}
            <Dialog.Button label="Close" onPress={handleClose} />
        </Dialog.Container>
        <Button onPress={handleOpen} theme={theme}>{props.title}</Button>
    </View>)
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });

export default ModalWithContent;