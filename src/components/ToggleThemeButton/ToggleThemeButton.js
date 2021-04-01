import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
import { createUseStyles, useTheme } from 'react-jss';
import { FaRegSun, FaRegMoon, FaMoon } from "react-icons/fa";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

const useStyles = createUseStyles(theme => ({
   button: {
      border: 'none',
      padding: '5px',
      cursor: 'pointer',
      marginLeft: '15px',
      fontSize: (props) => props.size ? props.size : '1.5em',
      display: 'flex',
      borderRadius: '25px',
      color: theme.text.outlinedButton,
      background: (props) => {
         if (props.transparent) return 'transparent';
        return theme.type === 'light' ? '#4d515d' : '#f2f3f5'
      },
      color: (props) => {
         if (props.transparent) return theme.text.activeLink;
        return theme.type === 'light' ? '#fff' : '#000'
      },
      outline: 'none',
      '&:hover': {
         transition: 'transform 0.2s',
         transform: 'scale(1) rotate(0.1turn)',
      },
   },
   '@keyframes roundIn': {
      from: {
         opacity: 0,
         transform: 'rotate(0.5turn)',
      },
      to: {
         opacity: 1,
         transform: 'rotate(0)'
      }
   },
   themeIcon: {
      animation: '$roundIn ease-in 0.4s',
   }
}));

export function ToggleThemeButton(props) {
   const theme = useTheme();
   const classes = useStyles({...props, theme})
   const { currentTheme, toggleTheme } = useThemeContext();
   return <button className={classes.button} onClick={toggleTheme}>
      {/*currentTheme === 'light' ? <FaRegMoon/> : <FaRegSun/>*/}
      {currentTheme === 'light' ? <RiMoonClearLine className={classes.themeIcon} /> : <RiSunLine className={classes.themeIcon} />}
   </button>
}

export default ToggleThemeButton;