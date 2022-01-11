//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, View, ScrollView, StyleSheet } from "react-native";

import { fetchUser, selectUser } from "../../store/userSlice";
import Authorize from "../api_authorization/Authorize";
import UserData from "./UserData";
import { fetchProducts } from "../../store/productsSlice";
import { fetchMedicalConditions } from "../../store/medicalConditionsSlice";
import { fetchMeals } from "../../store/mealsSlice";
import { fetchUserSavedDiets } from "../../store/userSavedDietsSlice";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Authorize />
      {user.id !== "0" && <UserData />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
});

export default UserProfile;
