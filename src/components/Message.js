import React, {useRef, useEffect} from 'react';
import Moment from 'react-moment';

const Message = ({messg, userO}) => {
    const scrollRef = useRef()

    useEffect (() => {
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    }, [messg]);
    return <div className={`message_wrapper ${messg.from === userO ? 'own' : ''}`}
            ref={scrollRef} >
        <p className={messg.from === userO ? 'me' : 'friend'}>
            {messg.media ? <img src={messg.media} alt={messg.text}/> : null}
            {messg.text}
            <br/>
            <small>
                <Moment fromNow>{messg.createdAt.toDate()}</Moment>
            </small>
        </p>
    </div>
}

export default Message
