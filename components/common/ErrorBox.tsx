import React from "react";
import { Text } from "react-native";

type Props = {
    message: string,
};

const ErrorBox: React.FC<Props> = (props) => {
    return(<>
        <Text>Error</Text>
        <Text>Something went wrong while processing your request. Please try again, if the problem persists, contact the administrator and provide them the message below. We apologize for the inconvinience.</Text>
        <Text>{props.message}</Text>
    </>)
};

export default ErrorBox;