import React, { Component } from 'react';

import classes from './Breed.module.css';
import BreedDetails from './BreedDetails/BreedDetails';

function Breed(props) {
    const breedDetails = props.selected ? <BreedDetails breed={props.breed} selSubBreed={(subbread) => props.selSubBreed(subbread)} /> : null;
    const style = props.selected ? { color: 'white', backgroundColor: 'blue' } : { color: 'black', backgroundColor: 'white' };
    return (
        <li className={classes.Breed} style={style} onClick={() => props.breedClick()} id={'idBreed' + props.breed.id} >
            {props.breed.name}
            {breedDetails}
        </li>
    );
}


export default Breed;