//box-shadow: 0 0 0 3px #4299e163; для кнопок
export const mainTheme = {
   sizes: {
      container: '850px'
   },
   colors: {
      primary: '#4299e1',
      primaryLight: '#fff',
      secondary: '#818CF8',
      secondaryLight: '#fff',
      green: '#10B981'
   }
}

//active link #2b3044
export const lightTheme = {
   ...mainTheme,
   type: 'light',
   background: {
      default: '#f7fafc',
      paper: '#fff',
      linkHover: '#edf2f7',
      input: '#fff',
   },
   alert: {
      error: '#fff0f3',
      success: '#a7f3d0'
   },
   border: {
      primary: '#e2e2e2',
      input: '#e2e8f0'
   },
   progress: {
      linear: '#e6fffa',
      linearBar: '#bde8e0'
   },
   text: {
      primary: '#000',
      link: '#718096',
      activeLink: '#2b3044',
      outlinedButton: '#4c4f52',
      input: '#4a5568',
   },
   snackbar: {
      background: '#323232',
      text: '#fff'
   },
   blob: 'C7D2FE'
}

export const darkTheme = {
   ...mainTheme,
   type: 'dark',
   background: {
      //был #1f1d2b
      //#1e1c25
      //#161a23
      //#30303a
      default: '#161a23',
      paper: '#252836',
      linkHover: '#1c2633',
      input: '#2d303e',
   },
   alert: {
      error: '#a54a5c',
      success: '#359a6c'
   },
   border: {
      primary: '#43454e',
      input: '#505261'
   },
   progress: {
      linear: '#588e83',
      linearBar: '#32695f'
   },
   text: {
      primary: '#fff',
      link: '#8493a9',
      activeLink: '#9b9fb1',
      outlinedButton: '#fff',
      input: '#cccede',
   },
   snackbar: {
      background: '#fff',
      text: '#000'
   },
   blob: '6373b3'
   //blob: '4c5c9e'
}

