import { ReactNode, useContext, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import getTheme from "../../styles/customTheme";

import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "../../redux/store";

import Footer from "../footer/Footer";
import NavigationBar from "../navigation/NavBar";
import { useNavigate } from "react-router-dom";
import fetchAcessToken from "../../redux/thunks/fetchAccessToken";
import { ATOKEN_URL } from "../../constants";
import ActiveBreadcrumbs from "../breadcrumbs/ActiveBreadcrumbs";
import { ThemeContext } from "../../App";

interface MasterPageProps {
  children: ReactNode;
}

const MasterPage = ({ children }: MasterPageProps) => {
  const themeContext = useContext(ThemeContext);

  const isLoggedIn = useSelector(
    (state: AppState) => state.userReducer.isLoggedIn
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const localRToken = localStorage.getItem("refresh-token");
  const token = {
    refreshToken: localRToken as string,
  };

  useEffect(() => {
    if (!isLoggedIn && localRToken) {
      dispatch(fetchAcessToken({ baseUrl: ATOKEN_URL, token }));
    }
  }, [dispatch, localRToken, isLoggedIn, navigate]);

  return (
    <ThemeProvider theme={getTheme(themeContext.mode)}>
      <NavigationBar
        isLoggedIn={isLoggedIn}
        mode={themeContext.mode}
        toggleColorMode={themeContext.toggleMode}
      />
      <ActiveBreadcrumbs />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default MasterPage;
