import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainingList from './TrainingList';
import { selectAllUserSavedTrainings } from '../../store/userSavedTrainingsSlice';
import { selectAllTrainings } from '../../store/trainingsSlice';

const UserSavedTrainings: React.FC = () => {
    const allTrainings = useSelector(selectAllTrainings);
    const savedTrainings = useSelector(selectAllUserSavedTrainings);
    const userTrainings = allTrainings.filter(training => savedTrainings.some(savedTraining => savedTraining.trainingId === training.id));
    //console.log(userTrainings);
    return(<TrainingList trainings={userTrainings} />);
};

export default UserSavedTrainings;