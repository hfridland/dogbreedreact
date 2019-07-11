import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './BreedList.module.css';
import * as actions from '../../store/actions/breeds';
import Spinner from '../UI/Spinner/Spinner';
import Breed from './Breed/Breed';
import ImageContainer from './ImageContainer/ImageContainer';

class BreedList extends Component {

    state = {
        selBreed: null,
        selSubbreed: null,
        searchVal: ''
    }

    componentDidMount() {
        this.props.loadBreeds();
    }

    selBreed = (breed) => {
        this.setState({ selBreed: breed });
    }

    selSubBreed = (subbreed) => {
        this.setState({ selSubbreed: subbreed });
    }

    handleChangeSearchVal = (event) => {
        this.setState({ searchVal: event.target.value });
    }

    searchBreedClick = (event) => {
        try {
            this.searchBreed();
        } finally {
            event.preventDefault();
        }
    }

    searchBreed = () => {
        if (this.props.breedList === null)
            return;
        const startInd = this.state.selBreed !== null ? this.props.breedList.indexOf(this.state.selBreed) + 1 : 0;
        const nextSelInd = this.props.breedList.findIndex((breed, index) => {
            if (index < startInd)
                return false;
            return (breed.name.indexOf(this.state.searchVal) >= 0);
        })
        if (nextSelInd >= 0) {
            this.selBreed(this.props.breedList[nextSelInd]);
            if (nextSelInd > 0) {
                const scrollId = 'idBreed' + this.props.breedList[nextSelInd - 1].id;
                const elt = document.getElementById(scrollId);
                if (elt !== null) {
                    elt.scrollIntoView();
                }
            }
        }
            
    }

    searchKeyUp = (event) => {
        try {
            if (event.keyCode === 13) {
                this.searchBreed();
            }
        } finally {
            event.preventDefault();
        }
    }

    render() {
        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }
        let error = null;
        if (this.props.error) {
            error = <h3>{this.props.error}</h3>
        }

        let liBreed = null;
        if (this.props.breedList) {
            if (this.state.selBreed === null) {
                setTimeout(() => {
                    this.selBreed(this.props.breedList[0]);
                }, 10);
            }


            liBreed = this.props.breedList.map(breed => {
                let sel = false;
                if (this.state.selBreed !== null)
                    sel = breed.id === this.state.selBreed.id;
                return <Breed key={breed.name + sel} breed={breed} selected={sel} breedClick={() => this.selBreed(breed)} selSubBreed={(subbread) => this.selSubBreed(subbread)} />
            })
        }

        return (
            <div className={classes.BreedList}>
                <div className={classes.Center}>
                    <h2>Dog Breeds</h2>
                    <p>For viewing breed detail pleace click on the breed</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <div>
                        <input type='text' value={this.state.searchVal} onChange={(event) => this.handleChangeSearchVal(event)} onKeyUp={(event) => this.searchKeyUp(event)} />
                        <button onClick={(event) => this.searchBreedClick(event)} >Search</button>
                        <div className={classes.ScrollContainer}>
                            <ul>
                                {spinner}
                                {error}
                                {liBreed}
                            </ul>
                        </div>
                    </div>
                    <ImageContainer breed={this.state.selBreed} subbreed={this.state.selSubbreed} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        breedList: state.breeds.breeds,
        loading: state.breeds.loading,
        error: state.breeds.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadBreeds: () => dispatch(actions.loadBreeds())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BreedList);