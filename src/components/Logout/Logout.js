import React from 'react';
import Welcome from '../Welcome/Welcome';

function Logout() {

    return (
        <div >
            <Welcome></Welcome>
            <div style={{ color: 'green', textAlign: 'center' }} >You have been logged out....</div>

        </div>
    );
}

export default Logout;
