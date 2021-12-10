import React, { useState, useEffect } from 'react'
import Img from '../asset/img/avatar.png'
import Camera from '../components/svg/Camera'
import Trash from '../components/svg/Trash'
import { storage, db, auth } from '../firebaseConfig'
import { ref, getDownloadURL, uploadBytes, deleteObject } from '@firebase/storage'
import { getDoc, doc, updateDoc } from '@firebase/firestore'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [img, setImg] = useState('')
    const [user, setUser] = useState('')

    const navigate = useNavigate();

    useEffect(() => {   
        getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
            if(docSnap.exists) {
                setUser(docSnap.data());
            }
        });
        if(img){
            const uploadImg = async () => {
            const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
            const snap = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
            
            try {
                if (user.avatarPath){
                    await deleteObject(ref(storage, user.avatarPath));
                }
                await updateDoc(doc(db, 'users',auth.currentUser.uid),{
                avatar: url,
                avatarPath: snap.ref.fullPath,
                })
                setImg("");
                console.log(url)
                } catch (error) {
                console.log('ERROR')
                }
            };
            uploadImg();
        }
    }, [img])

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Delete Avatar?')
            if (confirm){
                await deleteObject(ref(storage, user.avatarPath));
                await updateDoc(doc(db, 'users', auth.currentUser.uid),{
                    avatar:'',
                    avatarPath:'',
                })
                navigate("/");
            }
        } catch (error) {
            
        }
    }
    return user ? (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || Img} alt="avatar"/>
                    <div className="overlay">
                        <label htmlFor="photo">
                            <Camera/>
                        </label>
                        {user.avatar ? <Trash deleteImage={deleteImage}/> : null}
                        <input type="file" accept='image/*' style={{display: "none" }} id='photo' onChange={e=> setImg(e.target.files[0])}/>
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr/>
                    <small>Join on : {user.createAt.toDate().toDateString()}</small>
                </div>
            </div>
        </section>
    ) : null;
}

export default Profile
