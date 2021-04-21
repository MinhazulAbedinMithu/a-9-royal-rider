import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const {title, description, imgUrl, maxPerson, costPerKm} = props.vehicle;
    console.log(title, description, imgUrl, maxPerson, costPerKm);
    // console.log(props);

    const titleStyle={
        textDecoration: 'none',
    }

    return (
        <div className='col-md-3 mb-3' style={titleStyle}>
            <Link to='/destination'>
                <div className="m-3 shadow rounded h-100 text-center p-2">
                    <img src={imgUrl} className='img-fluid w-75' alt="Vehicle img"/>
                    <h4 className="p-1 pt-3">{title}</h4>
                </div>
            </Link>
        </div>
        
    );
};

export default Vehicle;