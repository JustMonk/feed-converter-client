import React, { useState, useEffect } from 'react';

export function useBsodCode(handler) {
   // State to hold array of recently pressed keys
   const [keys, setKeys] = useState([]);

   // Convert stored keys to string and match against konami code string
   const isBsodCode = keys.join(' ') === 's e r v e r k i l l';

   useEffect(() => {
      let timeout;

      // When a key is pressed
      window.document.onkeydown = (e) => {
         // Update array of keys in state with new key
         setKeys((currentKeys) => [...currentKeys, getKeyName(e.keyCode)]);

         // Clear 5s timeout since key was just pressed
         clearTimeout(timeout);

         // Reset keys if 5s passes so user can try again
         timeout = setTimeout(() => setKeys([]), 5000);
      };
   }, []);

   // Once konami code is entered call handler function
   // and reset keys so user can do it again.
   useEffect(() => {
      if (isBsodCode) {
         handler();
         setKeys([]);
      }
   }, [isBsodCode, handler]);

   return isBsodCode;
}

const getKeyName = (keyCode) => {
   return {
      75: 'k',
      73: 'i',
      76: 'l',
      83: 's',
      69: 'e',
      82: 'r',
      86: 'v'
   }[keyCode];
};