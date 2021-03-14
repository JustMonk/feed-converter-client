import React from "react";

export function Divider(props) {
   return <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
      <p style={{ margin: '10px', fontWeight: 100, color: '#94979c' }}>ИЛИ</p>
      <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
   </div>
}
export default Divider;