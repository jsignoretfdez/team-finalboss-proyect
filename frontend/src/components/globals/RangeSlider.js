import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const RangeSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 10,
        width: 10,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -3,
        marginLeft: 0,
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 4,
        background: '#9da6b2'
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 4,
    },
})(Slider);

export function RangeSliderComponent(props) {
    return (
        <span {...props}>
        </span>
    );
}

export default RangeSlider;