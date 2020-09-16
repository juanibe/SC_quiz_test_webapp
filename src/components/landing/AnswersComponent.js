import React, { useState } from 'react'

import MenuComponent from './MenuComponent';

import useStyles from './styles/useStyles';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';


import Service from '../../services/api-fetch.service';


function AnswersComponent({ data, handleRespondedQuestion }) {
    const classes = useStyles();


    return (
        <div >
            <div className={classes.answers}>
                {data && data.map(d => {
                    return (
                        <div key={d._id}>
                            <Checkbox onChange={() => handleRespondedQuestion(d)}></Checkbox>
                            <Paper className={classes.answersText}>{d.text}</Paper>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default AnswersComponent;