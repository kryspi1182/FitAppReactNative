import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllUserTrainings } from '../../store/userTrainingsSlice';
import TrainingList from './TrainingList';

const TrainingResult: React.FC = () => {
    const dispatch = useDispatch();

    const userTrainings = useSelector(selectAllUserTrainings);
    //console.log(userTrainings);
    return(<TrainingList trainings={userTrainings} />);
}

export default TrainingResult;