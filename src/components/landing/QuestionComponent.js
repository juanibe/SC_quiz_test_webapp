import React, { useState } from 'react'

import useStyles from './styles/useStyles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


function QuestionComponent({ data, handleAnswerStatus, user }) {
    const classes = useStyles();

    return (
        <div >
            <span className={classes.questions}>
                {data && data.map(q => {
                    return (
                        <div key={q._id}>
                            <Paper className={classes.questionText}>{q.text}</Paper>
                            <Button color='primary' onClick={() => handleAnswerStatus(q.answers)}>Answer</Button>
                            {user && user.role === 1 && (
                                <div>
                                    <Button color='secondary' onClick={() => handleAnswerStatus(q.answers)}>Delete</Button>
                                    <Button color='secondary' onClick={() => handleAnswerStatus(q.answers)}>Unpublish</Button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </span>
        </div>
    )
}

export default QuestionComponent;