import React, {useEffect, useState} from 'react'
import Img from '../asset/img/avatar.png'
import { onSnapshot, doc } from '@firebase/firestore'
import { db } from '../firebaseConfig'

const User = ( {user, selectUser, userO, chat} ) => {
    const userN = user?.uid
    const [data, setData] = useState('')

    useEffect(() => {
        const id = userO > userN ? `${userO + userN}` : `${userN + userO}`
        let unsub = onSnapshot(doc(db,'lastMessg', id),(doc) => {
            setData(doc.data());

        })
        return () => {
            unsub()
        }
    }, []);
    console.log(data);

    return (
        <div className={`user_wrapper ${chat.name === user.name && 'selected_user'}`} onClick={() => selectUser(user)}>
            <div className='user_info'>
                <div className='user_detail'>
                    <img src={user.avatar || Img} alt='avatar' className='avatar'/>
                    <h4>{user.name}</h4>
                    {data?.from !== userO && data?.unread && <small className="unread">New</small>}
                </div>
                <div className={`user_status ${user.isOnline? 'online':'offline'}` }></div>
            </div>
            {data && (
                <p className="truncate">
                    <strong>{data.from === userO ? 'Me:' : null}</strong>
                    {data.text}
                </p>
            )}
        </div>
    )
}

export default User
