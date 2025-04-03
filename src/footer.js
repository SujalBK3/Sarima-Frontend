import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f5f5f5',
      padding: '20px 0',
      textAlign: 'center',
      borderTop: '1px solid #e0e0e0',
      marginTop: '30px',
      fontFamily: 'Arial, sans-serif',
      color: "white",
      backgroundColor :'black'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <p style={{ margin: '0' }}>© 2025 All Rights Reserved.</p>
        
        
        <div style={{ 
    margin: '0', 
    fontStyle: 'italic', 
    fontSize: '0.9em' 
}}>
   <Link to = "profiles" style = {{
    textDecoration : 'none',
    color : 'white'
   }}><p>Developers :</p></Link> 
    <p>Aaron Dias</p>
    <p>Praneel Gore</p>
    <p>Sujal Kashid</p>
    <p>Shashank Khot</p>
</div>
        
      </div>
    </footer>
  );
};

export default Footer;