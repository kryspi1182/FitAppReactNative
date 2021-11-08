import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { List, Chip } from 'react-native-paper';

import { selectAllUserSavedDiets } from '../../store/userSavedDietsSlice';
import WeekDietBox from '../diet/WeekDietBox';

const UserSavedDiets: React.FC = () => {
    const dispatch = useDispatch();
    const userDiets = useSelector(selectAllUserSavedDiets);
    return(<ScrollView contentContainerStyle={styles.container}>
        {userDiets.map(userDiet => {
            let breakfasts = [] as EntityId[];
            let secondBreakfasts = [] as EntityId[];
            let lunches = [] as EntityId[];
            let snacks = [] as EntityId[];
            let dinners = [] as EntityId[];
            for(var i = 0; i < userDiet.meals.length; i++) {
                switch(i%5) {
                    case 0:
                        breakfasts.push(userDiet.meals[i].id);
                    break;
                    case 1:
                        secondBreakfasts.push(userDiet.meals[i].id);
                    break;
                    case 2:
                        lunches.push(userDiet.meals[i].id);
                    break;
                    case 3:
                        snacks.push(userDiet.meals[i].id);
                    break;
                    case 4:
                        dinners.push(userDiet.meals[i].id);
                    break;
                };
            }
            return (<List.Accordion title={userDiet.name}>
                <WeekDietBox 
                    breakfasts={breakfasts}
                    secondBreakfasts={secondBreakfasts}
                    lunches={lunches}
                    snacks={snacks}
                    dinners={dinners}
                    key={userDiet.name}
                />
            </List.Accordion>)
            /*return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{userDiet.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <WeekDietBox
                            breakfasts={breakfasts}
                            secondBreakfasts={secondBreakfasts}
                            lunches={lunches}
                            snacks={snacks}
                            dinners={dinners}
                        />
                    </AccordionDetails>
            </Accordion>
            
            
            )*/
        })}
    </ScrollView>);
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
    },
    button: {
        width: '75%',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: '#4c8bf5'
    },
    formControl: {
        width: '33%'
    }
  });

export default UserSavedDiets;