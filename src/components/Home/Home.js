import React, { useState } from 'react';
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const vehicles = [
        {
            title: 'Bike',
            description: 'Fast & Safe Journey for Single person',
            imgUrl: 'https://i.ibb.co/LYHfGnr/bike.png',
            maxPerson: 1,
            costPerKm: 15
        },
        {
            title: 'Car',
            description: 'Standard & Safe Journey for maximum Four Person',
            imgUrl: 'https://i.ibb.co/nQCLp4G/car.png',
            maxPerson: 4,
            costPerKm: 20
        },
        {
            title: 'Bus',
            description: 'Safe Journey with family or organization for cultural Program or picnic',
            imgUrl: 'https://i.ibb.co/gJ6RzSH/bus.png',
            maxPerson: 50,
            costPerKm: 10
        },
        {
            title: 'Train',
            description: 'Safe Journey with family or organization for cultural Program or picnic',
            imgUrl: 'https://i.ibb.co/JdvqkCm/train.png',
            maxPerson: 50,
            costPerKm: 8
        }
    ]
    
    return (
        <div className="container">
            <div className='row my-5'>
                {
                    vehicles.map(vehicle => <Vehicle key={vehicle.maxPerson} vehicle={vehicle}></Vehicle>)
                }
            </div>
        </div>
    );
};

export default Home;