import React from 'react';
import {Link} from 'react-router-dom';
const Error = () => {
    return (
        <div>
            <h1>
                Page Not found
            </h1>
            <Link to='/'>
                <h1>Back to Home</h1>
            </Link>
        </div>
    )
}
export default Error;
