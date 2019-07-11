import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './BreedDetails.module.css';
import * as actions from '../../../../store/actions/subbreeds';
import Spinner from '../../../UI/Spinner/Spinner';

class BreedDetails extends Component {

    state = {
        selSubBread: null
    }

    componentDidMount() {
        this.props.loadSubbreeds(this.props.breed.id);
    }

    setSel = (subbreed) => {
        this.setState({ selSubBread: subbreed });
        this.props.selSubBreed(subbreed);
    }

    render() {
        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />
        }

        let error = null;
        if (this.props.error !== '') {
            error = <h3>{this.props.error}</h3>
        }

        let subbreedJsx = <h3>{'No subbread for this bread'}</h3>;
        if (this.props.subbreedList !== null) {
            if (this.props.subbreedList.length > 0) {
                if (this.state.selSubBread === null) {
                    setTimeout(() => {
                        if (this.props.subbreedList !== null) {
                            this.setSel(this.props.subbreedList[0]);
                        } else {
                            this.setSel(null);
                        }
                    }, 10);
                }

                subbreedJsx = this.props.subbreedList.map(subbreed => {
                    const style = this.state.selSubBread === subbreed ? { color: 'white', backgroundColor: 'blue' } : { color: 'black', backgroundColor: 'white' };
                    return (<li key={subbreed.id} style={style} onClick={() => this.setSel(subbreed)}>{subbreed.name}</li>);
                });
                subbreedJsx = <ul>{subbreedJsx}</ul>
            } else {
                subbreedJsx = 'No subbread';
            }

        }

        return (
            <div className={classes.BreedDetails}>
                {spinner}
                {error}
                {subbreedJsx}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subbreedList: state.subbreeds.subbreeds,
        loading: state.subbreeds.loading,
        error: state.subbreeds.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSubbreeds: (breedId) => dispatch(actions.loadSubbreeds(breedId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BreedDetails);