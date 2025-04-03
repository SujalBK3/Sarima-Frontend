

import React from 'react';
import {Link} from 'react-router-dom'
import './Profile.css'; // Import the CSS file

const Profiles = () => {
    return (
        <div className="background-container"> {/* New container for background image */}
            <div>
                <h1 className="header">LinkedIn Profiles</h1>
            </div>
            <div className="profiles-container">
                {/* Sujal Kashid Profile */}
                <div className="profile-card">
                    <img 
                        src="/Sujal.jpg" 
                        alt="Sujal Kashid" 
                        className="profile-image" 
                    />
                    <a 
                        href="https://www.linkedin.com/in/sujal-kashid-105ba4290/" 
                        target="__main" 
                        className="profile-link"
                    >
                        Sujal Kashid
                    </a>
                </div>

                {/* Aaron Dias Profile */}
                <div className="profile-card">
                    <img 
                        src="/Aaron.jpg" 
                        alt="Aaron Dias" 
                        className="profile-image" 
                    />
                    <a 
                        href="https://www.linkedin.com/in/aaron-dias-959194322/" 
                        target="__main" 
                        className="profile-link"
                    >
                        Aaron Dias
                    </a>
                </div>

                {/* Praneel Gore Profile */}
                <div className="profile-card">
                    <img 
                        src="/Praneel.jpg" 
                        alt="Praneel Gore" 
                        className="profile-image" 
                    />
                    <a 
                        href="https://www.linkedin.com/in/praneel-gore/" 
                        target="__main" 
                        className="profile-link"
                    >
                        Praneel Gore
                    </a>
                </div>

                {/* Shashank Khot Profile */}
                <div className="profile-card">
                    <img 
                        src="/Shashank.jpg" 
                        alt="Shashank Khot" 
                        className="profile-image" 
                    />
                    <a 
                        href="https://www.linkedin.com/in/shshahank/" 
                        target="__main" 
                        className="profile-link"
                    >
                        Shashank Khot
                    </a>
                </div>
            </div>
            <div style = {{
                display : 'flex',
                justifyContent : 'center',
                marginTop : '100px'
            }}>
            <Link to="/">
           < button className='button' style = {{}}>Home</button>
           </Link>
            </div>
           
        </div>
    );
}

export default Profiles;