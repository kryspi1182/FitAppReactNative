//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainingCondition } from "../../models/TrainingCondition";

import { selectAllUserTrainings } from "../../store/userTrainingsSlice";
import TrainingList from "./TrainingList";

type Props = {
  trainingConditions: TrainingCondition[];
};

const TrainingResult: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const userTrainings = useSelector(selectAllUserTrainings);
  return (
    <TrainingList
      trainings={userTrainings}
      saveEnabled={true}
      deleteEnabled={false}
      trainingConditions={props.trainingConditions}
    />
  );
};

export default TrainingResult;
