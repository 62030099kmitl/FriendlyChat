import React, {useEffect, useState} from 'react';
import {db, auth, storage} from '../firebaseConfig'
import {collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [messg, setMessg] = useState([]);

    const userO = auth.currentUser.uid

    useEffect(() => {
        const usersRef = collection(db, 'users');

        //Create Query
        const q = query(usersRef, where('uid', 'not-in', [userO]));
        //Execute Query
        const unSub = onSnapshot(q, (QuerySnapshot) => {
            let users = []
            QuerySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUsers(users);
        })
        return () => unSub();
    }, [])
    
    const selectUser = async (user) => {
        setChat(user)
        console.log(user);

        const userN = user.uid
        const id = userO > userN ? `${userO + userN}` : `${userN + userO}`

        const messgRef = collection(db, 'messages', id, 'chat')
        const q = query(messgRef, orderBy('createdAt','asc'))

        onSnapshot(q, QuerySnapshot => {
            let messg = []
            QuerySnapshot.forEach(doc => {
                messg.push(doc.data())
            })
            setMessg(messg);
        })

        const docSnap = await getDoc(doc(db, "lastMessg", id));
        if (docSnap.data() && docSnap.data().from !== userO) {
            await updateDoc(doc(db, "lastMessg", id), { unread: false });
        }
    }
    console.log(messg)

    const handleSubmit = async e => {
        e.preventDefault()

        const userN = chat.uid
        
        const id = userO > userN ? `${userO + userN}` : `${userN + userO}`

        let url;
        if(img){
            const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`)
        ;
            const snap = await uploadBytes(imgRef, img)
            const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = dlurl;
        }

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: userO,
            to: userN,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
        })
        setText("");

        await setDoc(doc(db, 'lastMessg', id), {
            text,
            from: userO,
            to: userN,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
            unread: true,
        })
        
    }

    return (
        <div className="home_container">
            <div className="users_container">
                {users.map(users => <User key={users.uid} user={users} selectUser={selectUser} userO={userO} chat={chat}/>)}
            </div>
            <div className="message_container">
                {chat ? (
                    <>
                    <div className="messages_user">
                    <h3>{chat.name}</h3>
                    </div>
                    <div className="messages">
                        {messg.length ? messg.map((messg, i) => <Message key={i} messg={messg} userO={userO} />) : null}
                    </div>
                    <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg}/>
                    </>
                    ) : (<h3 className="no_conv">Select User To Chat</h3>)} 
            </div>
        </div>
    )
};


export default Home;

