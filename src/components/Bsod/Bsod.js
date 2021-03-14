import React from 'react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
   wrapper: {
      background: '#0000ba',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      fontFamily: 'monospace',
      color: '#fff',
      fontSize: '1.5em',
      zIndex: 999
   },
}));

export function Bsod(props) {
   const classes = useStyles();
   return <div className={classes.wrapper}>
      <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
      <p>ÖÆÅÂàðýĂòćÑĦĩķĠĎĬİ</p>
      <p>CЛY4UЛACЬ_CTPAШHAЯ_ХYЙНЯ</p>
      <p>ĦĩķĠĎýĂòćÑĦĩķĠĎĬİ òćÑĦĩ ĠĎýĂòćÑĦĩķĠ ĦĩķĠĎýĂòćÑĦ</p>
      <p>If this is the first time you’ve seen this stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
      <p>Check to be sure you have adequate disk space. If a driver is identified in the stop massage, disable the driver or check with the manufacturer for driver updates. Try changing video adapters.</p>
      <p> Check with your hardware vendor for any BIOS updates. Disable BIOS memory options such as caching or shadowing. If you need to use Save Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
      <br></br>
      <p>Technical information:</p>
      <p>*** STOP: 0x0000005 (0xF73B9D66, 0xF78D9EA0, 0xF78D9B9C)</p>
      <p>*** acpi.sys – Address F73B9D66 base at F73AE000, Date Stamp 480252b1</p>
   </div>
}
export default Bsod;