import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, View, ScrollView } from 'react-native';

import { fetchUser, selectUser } from '../../store/userSlice';
import Authorize from '../api_authorization/Authorize';
import UserData from './UserData';

const UserProfile: React.FC = () => {
    const user = useSelector(selectUser);
    return (
        <ScrollView>
            <Authorize />
            {(user.id !== "0") && <UserData />}
        </ScrollView>
        );
};

export default UserProfile;