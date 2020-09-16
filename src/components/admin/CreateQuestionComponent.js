import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Service from '../../services/api-fetch.service';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));

function CrateQuestionComponent({ history }) {
    const classes = useStyles();

    const [question, setQuestion] = useState('');
    const [answersArray, setAnswersArray] = useState([]);
    const [answersString, setAnswersString] = useState('');
    const [mangaeAnswersStatus, setManageAnswersStatus] = useState(false);

    async function createQuestion() {
        const url = 'questions'
        const apiFetch = new Service();
        const payload = { text: question, answers: answersArray }
        const response = await apiFetch.post(url, payload);
        if (response) {
            history.push('/')
        }
    }

    console.log(answersArray);

    async function manageAnswers() {
        if (question === '' || answersString === '') {
            return;
        }
        const payload = buildPayload(question, answersString);
        setAnswersArray(payload.answers);
        setManageAnswersStatus(true);
    }

    const handleQuestionInput = (e) => {
        setQuestion(e.target.value);
    };

    const handleAnswersInput = (e) => {
        setAnswersString(e.target.value);
    };

    const handleCorrectStatus = (id) => {
        answersArray[id].isCorrect = !answersArray[id].isCorrect;
        console.log(answersArray)

    }


    const buildPayload = (question, answers) => {
        const answersArray = answers.split(',');
        let final = []

        answersArray.forEach((part, idx) => {
            answersArray[idx] = { text: answersArray[idx].trim(), isCorrect: false, id: idx };
            final = answersArray.filter(a => {
                return a !== '';
            });
        })

        const totalQuestion = {
            text: question,
            answers: final,
        };
        return totalQuestion;
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Question" onChange={handleQuestionInput} />
            <TextField id="standard-basic" label="Answers (Provide all the answers separated by comma)" onChange={handleAnswersInput} />
            <Button onClick={manageAnswers}>Continue</Button>
            {
                mangaeAnswersStatus && (
                    answersArray.map(a => {
                        return (
                            <span>
                                <Paper>{a.text}</Paper>
                                <p>Is correct?</p>
                                <Checkbox onChange={() => handleCorrectStatus(a.id)} />
                            </span>
                        )
                    })
                )
            }
            <div>
                {answersArray && answersArray.length > 0 && (
                    <Button color="primary" onClick={createQuestion}>Create question!</Button>

                )}
            </div>
        </form >
    );
}

export default withRouter(CrateQuestionComponent)