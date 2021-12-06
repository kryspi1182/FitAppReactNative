import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Dialog from "react-native-dialog";

type Props = {
    title: string,
    content: React.ReactNode
};

const ModalWithContent: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(<View style={styles.container}>
        <Dialog.Container visible={open}>
            <Dialog.Title>{props.title}</Dialog.Title>
                {props.content}
            <Dialog.Button label="Close" onPress={handleClose} />
        </Dialog.Container>
        <Button onPress={handleOpen}>{props.title}</Button>
    </View>)
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });

export default ModalWithContent;