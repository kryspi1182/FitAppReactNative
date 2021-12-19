import { BodyTargetEnum } from "./enums/BodyTargetEnum";
import { DifficultyEnum } from "./enums/DifficultyEnum";
import { TrainingCategoryEnum } from "./enums/TrainingCategoryEnum";
import { TrainingCondition } from "./TrainingCondition";

export interface UserTrainingParams {
    trainingCategory: TrainingCategoryEnum,
    difficulty: DifficultyEnum,
    trainingConditions: TrainingCondition[],
    bodyTarget: BodyTargetEnum
};