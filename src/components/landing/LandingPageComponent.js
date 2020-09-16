import React, { useState, useEffect } from 'react'

import MenuComponent from './MenuComponent';
import QuestionComponent from './QuestionComponent';
import AnswersComponent from './AnswersComponent';

import useStyles from './styles/useStyles';

import Grid from '@material-ui/core/Grid';

import Service from '../../services/api-fetch.service';
import { getJwt, getUserJwt } from '../../helpers'

function LandingPageComponent(props) {

    const classes = useStyles();

    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answerStatus, setAnswerStatus] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState('');
    const [warning, setWarning] = useState(false);

    async function fetchApi() {
        const url = 'questions'
        const apiFetch = new Service();
        const response = await apiFetch.get(url);
        if (!response) {
            setQuestions([])
        } else {
            setQuestions(response.questions)
        }
    }

    const handleAnswerStatus = (answersArray) => {
        if (user && user.id) {
            setAnswerStatus(!answerStatus);
            setAnswers(answersArray)
            setResult('')
        } else {
            setWarning(true)
        }

    };

    const handleRespondedQuestion = (answer) => {
        console.log("donde pija estza", user)
        if (!answer.isCorrect) {
            setResult('Wrong :(')
            setAnswers([])
            setAnswerStatus(!answerStatus);
        } else {
            setResult('Correct :)')
            setAnswers([])
            setAnswerStatus(!answerStatus);
        }

    }

    useEffect(() => {
        fetchApi()
        const jwt = getJwt()
        if (jwt) {
            const user = getUserJwt(jwt)
            setUser(user)
        }
    }, [])

    return (
        <div >
            <div className={classes.menuBar}>
                <MenuComponent />
            </div>
            <h2>Questions</h2>
            <Grid container spacing={10}>
                <Grid item>
                    {questions && questions.length > 0 && (
                        <QuestionComponent data={questions} handleAnswerStatus={handleAnswerStatus} user={user} />
                    )}
                </Grid>
                {warning && (
                    <h1>You must be logged in to answer questions</h1>
                )}
                {!warning && answerStatus && (
                    <Grid item>
                        {answers && answers.length > 0 && (
                            <AnswersComponent data={answers} handleRespondedQuestion={handleRespondedQuestion} />
                        )}
                    </Grid>
                )}
                {<h2 style={{ color: result === 'Correct :)' ? 'green' : 'red', textAlign: 'center' }}>{result}</h2>}

            </Grid>
        </div>
    )
}

export default LandingPageComponent;