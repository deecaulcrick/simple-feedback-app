import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState(null)

    const {addFeedback, feedbackEdit} = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10){
            setBtnDisabled(true)
            setMessage('You need to enter at least 10 characters')
        } else{
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }
            addFeedback(newFeedback)
            setText('')
            
        }

        
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service today?</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input 
                type='text' 
                placeholder='Write a review' onChange={handleTextChange}
                value={text}></input>
                <Button isDisabled={btnDisabled} type='submit'>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm