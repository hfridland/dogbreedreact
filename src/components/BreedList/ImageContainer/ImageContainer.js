import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './ImageContainer.module.css';
import * as actions from '../../../store/actions/imagelink';

class ImageContainer extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.breed === null)
            return;
        if (prevProps.breed !== this.props.breed || prevProps.subbreed !== this.props.subbreed)
            this.props.loadImage(this.props.breed.id, this.props.subbreed == null ? '-1' : this.props.subbreed.name);
    }

    reloadImage = (event) => {
        this.props.loadImage(this.props.breed.id, this.props.subbreed == null ? '-1' : this.props.subbreed.name);
        event.preventDefault();
    }

    render() {
        let caption = this.props.breed !== null ? this.props.breed.name : '';
        if (this.props.subbreed !== null)
            caption += ' ' + this.props.subbreed.name;
        return (
            <div className={classes.ImageContainer}>
                <h3>{caption}</h3>
                <img src={this.props.imagelink} alt={caption} width='500' />
                <div>
                    <button onClick={(event) => this.reloadImage(event)}>Another Image</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        imagelink: state.imagelink.imagelink,
        loading: state.imagelink.loading,
        error: state.imagelink.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadImage: (breedId, subbreed) => dispatch(actions.loadImagelink(breedId, subbreed))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer);