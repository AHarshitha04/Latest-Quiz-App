// import React from 'react'
import React, { useEffect, useRef, useState } from 'react';
import './Instructions.scss'
import { useNavigate } from "react-router-dom";

const Instructions = ({ seconds }) => {

    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            alert("End");
        }
    }, [countdown]);
    const navigate = useNavigate();
    const startCountdown = () => {
        timerId.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        navigate('/Paper');
    };



    return (
        <div>
            <div id="ins1Text" className="contentClass">
                <div className="insDiv">

                    <p align="center">
                        <strong>Please read the following instructions carefully.</strong>
                    </p>

                    <p>
                        <strong>General Instructions:</strong>
                    </p>

                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;1. Total time available for this test will be displayed on the next. <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;2. The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam. When the clock runs out the exam ends by default - you are not required to end or submit your. <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;3. The question palette at the right of screen shows one of the following statuses of each of the questions numbered: <br />
                    </p>

                    <p>&nbsp;</p>

                    <div>&nbsp;</div>

                    <div>
                        <div className="grayDiv">1.</div>
                        <div >You have not visited the question yet.</div>
                    </div>

                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>
                        <div className="orangeDiv">3</div>
                        <div >You have not answered the question.</div>
                    </div>

                    <div >&nbsp;</div>
                    <div >&nbsp;</div>
                    <div >
                        <div className="greenDiv">5</div>
                        <div >You have answered the question.</div>
                    </div>

                    <div >&nbsp;</div>
                    <div >&nbsp;</div>
                    <div >
                        <div className="purpleDiv">7</div>
                        <div >You have NOT answered the question but have marked the question for review.</div>
                    </div>

                    <div>&nbsp;</div>
                    <div >&nbsp;</div>
                    <div >
                        <div className="purpleTickDiv">9</div>
                        <div>You have answered the question but marked it for review.</div>
                    </div>

                    <div >&nbsp;</div>
                    <p>&nbsp;</p>
                    <p>The Marked for Review status simply acts as a reminder that you have set to look at the question again. If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</p>

                    <p ><strong>Navigating to a question:</strong></p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;4. To select a question to answer, you can do one of the following: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Click on the question number on the question palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Click on Save and Next to save answer to current question and to go to the next question in sequence. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Click on Mark for Review and Next to save answer to current question, mark it for review, and to go to the next question in sequence.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;5. You can view the entire paper by clicking on the <strong>Question Paper</strong> button.</p>

                    <p ><strong>Answering questions:</strong></p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;6. For multiple choice type question :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. To select your answer, click on one of the option buttons &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. To change your answer, click the another desired option button &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. To save your answer, you MUST click on <strong>Save &amp; Next</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. To deselect a chosen answer, click on the chosen option again or click on the <strong>Clear Response</strong> button. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. To mark a question for review click on Mark for Review &amp; Next. If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;7. To change an answer to a question, first select the question and then click on the new answer option followed by a click on the <strong>Save &amp; Next</strong> button.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;8. Questions that are saved or marked for review after answering will ONLY be considered for evaluation.</p>

                    <p><strong>Navigating through sections:</strong></p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;9. Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;10. After clicking the Save &amp; Next button on the last question for a section, you will automatically be taken to the first question of the next section.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;11. You can move the mouse cursor over the section names to view the status of the questions for that section.</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;12. You can shuffle between sections and questions anytime during the examination as per your convenience.</p>
                </div>
                <div className='test-btn'>
                    <button onClick={startCountdown} className='play-btn'>
                        Next<span class="material-symbols-outlined">
                            double_arrow
                        </span>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Instructions
