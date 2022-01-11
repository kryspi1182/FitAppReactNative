//Program powstał na Wydziale Informatyki Politechniki Białostockiej

import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { authorizeSrv } from "./AuthorizeSrv";
import { userApi } from "../api_communication/UserApi";
import { UserIdentityInfo } from "../../models/UserIdentityInfo";
import { fetchUser, selectUser } from "../../store/userSlice";
import { fetchUserSavedDiets } from "../../store/userSavedDietsSlice";
import { fetchProducts } from "../../store/productsSlice";
import { fetchMedicalConditions } from "../../store/medicalConditionsSlice";
import { fetchMeals } from "../../store/mealsSlice";
import { fetchExercises } from "../../store/exercisesSlice";
import { fetchBodyTargets } from "../../store/bodyTargetsSlice";
import { fetchTrainings } from "../../store/trainingsSlice";
import { fetchTrainingCategories } from "../../store/trainingCategoriesSlice";
import { fetchDifficulties } from "../../store/difficultiesSlice";
import { fetchTrainingConditions } from "../../store/trainingConditionsSlice";
import { fetchTrainingConditionSeverities } from "../../store/trainingConditionSeveritiesSlice";
import { fetchUserSavedTrainings } from "../../store/userSavedTrainingsSlice";

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

const Authorize: React.FC = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {},
    button: {
      maxWidth: "75%",
      alignSelf: "center",
      marginTop: "50%",
      marginBottom: "50%",
    },
  });
  const [ready, setReady] = React.useState(false);
  const [acc_token, setAcc_token] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({} as UserIdentityInfo);
  const [showButton, setShowButton] = React.useState(true);
  const discovery = AuthSession.useAutoDiscovery("http://192.168.0.26:25415");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (discovery) setReady(true);
  }, [discovery]);
  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "FitAppReactNative",
      redirectUri,
      scopes: ["openid", "profile", "FitAppReactAPI", "offline_access"],
    },
    discovery
  );

  React.useEffect(() => {
    if (result && request && result.params && result.params.code) {
      var test = AuthSession.exchangeCodeAsync(
        {
          clientId: "FitAppReactNative",
          scopes: ["openid", "profile", "FitAppReactAPI", "offline_access"],
          code: result.params.code,
          redirectUri: redirectUri,
          extraParams: { code_verifier: request.codeVerifier },
        },
        discovery as AuthSession.DiscoveryDocument
      ).then((response) => {
        setAcc_token(response.accessToken);
        return response;
      });
    }
  }, [result]);

  React.useEffect(() => {
    if (acc_token && discovery && discovery.userInfoEndpoint) {
      authorizeSrv
        .getUserInfo(acc_token, discovery.userInfoEndpoint)
        .then((response) => {
          if (response) setUserInfo(response);
        });
    }
  }, [acc_token]);

  React.useEffect(() => {
    if (userInfo.sub) {
      dispatch(fetchUser(userInfo.sub as string));
      dispatch(fetchUserSavedDiets(userInfo.sub));
      dispatch(fetchUserSavedTrainings(userInfo.sub));
      dispatch(fetchProducts());
      dispatch(fetchMedicalConditions());
      dispatch(fetchMeals());
      dispatch(fetchExercises());
      dispatch(fetchBodyTargets());
      dispatch(fetchTrainings());
      dispatch(fetchTrainingCategories());
      dispatch(fetchDifficulties());
      dispatch(fetchTrainingConditions());
      dispatch(fetchTrainingConditionSeverities());
    }
  }, [userInfo]);

  React.useEffect(() => {
    if (user.id !== "0") setShowButton(false);
  }, [user]);

  return (
    <View style={styles.container}>
      {ready && showButton && (
        <Button
          style={styles.button}
          disabled={!request}
          onPress={() => promptAsync({ useProxy })}
          theme={theme}
          mode="contained"
        >
          Login
        </Button>
      )}
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
};

export default Authorize;
