import React, { createContext, useReducer, useContext, useState } from "react";
import { ThemeProvider } from 'react-jss';
import { lightTheme, darkTheme } from '../themes/mainTheme';

export const CustomThemeContext = createContext();

const getCurrentTheme = () => {
   //bishop-client: {theme: 'light'}
   let currentSettings;
   try {
      currentSettings = JSON.parse(localStorage.getItem('bishop-client'));
   } catch (e) {
      currentSettings = { theme: 'light' };
      localStorage.setItem('bishop-client', JSON.stringify(currentSettings));
   }

   if (!currentSettings || !currentSettings.theme) {
      currentSettings = { theme: 'light' };
      localStorage.setItem('bishop-client', JSON.stringify(currentSettings));
   }

   return currentSettings.theme;
}

export const CustomThemeProvider = props => {
   const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

   const toggleTheme = () => {
      let newValue = currentTheme === 'light' ? 'dark' : 'light';
      setCurrentTheme(newValue);
      localStorage.setItem('bishop-client', JSON.stringify({ theme: newValue }) );
   }

   const themeData = { currentTheme, toggleTheme };
   return (
      <CustomThemeContext.Provider value={themeData}>
         <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            {props.children}
         </ThemeProvider>
      </CustomThemeContext.Provider>
   );
};

export const useThemeContext = () => {
   return useContext(CustomThemeContext);
};