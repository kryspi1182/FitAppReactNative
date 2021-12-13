import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Dialog from "react-native-dialog";

type Props = {
    loaded: boolean,
    open: boolean,
    setOpen: Function
};

const LoadingModal: React.FC<Props> = (props) => {

    const handleClose = () => {
        props.setOpen(false);
    };

    return(<View style={styles.container}>
        <Dialog.Container visible={props.open}>
                <View>
                    {(!props.loaded && <View>
                        <Text>Loading...</Text>
                    </View>)}
                    {(props.loaded && <View>
                        <Text>Done</Text>
                    </View>)}
                </View>
            <Dialog.Button label="Close" onPress={handleClose} />
        </Dialog.Container>
    </View>)
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });

export default LoadingModal;