import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateStart, updateFailure, updateSuccess, deleteUserFailure , deleteUserStart, deleteUserSuccess, signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const DashProfile = () => {
    const {currentUser, error} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ });
    const dispatch = useDispatch();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImageFile(e.target.files[0]);
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'blogapp');
        data.append('cloud_name', 'doeicc3sy');

        const response = await fetch('https://api.cloudinary.com/v1_1/doeicc3sy/image/upload', {
            method: 'POST',
            body: data
        });
        const jsonResponse = await response.json();
        setImageFileUrl(jsonResponse.url);
        setFormData({...formData, profilePicture: jsonResponse.url});
        console.log(jsonResponse.url);
    };
   useEffect(() => {
    if(imageFile){
        uploadImage();
    }
   }, [imageFile]);
    const uploadImage = async () => {
    };


    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
        return;
    }
    try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok){
            dispatch
            (updateFailure(data.message));  
        } else {
            dispatch(updateSuccess(data));
        }
    } catch (error) {
        dispatch(updateFailure(error.message));
    }
  }
const handleDeleteUser = async () => {
    setShowModal(false);
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok){
            dispatch(deleteUserFailure(data.message));  
        } else {
            dispatch(deleteUserSuccess(data));
        }
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
};

const handleSignout = async () => {
    try{
        const res = await fetch('/api/user/signout', {
            method: 'POST',
        });
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        } else {
            dispatch(signoutSuccess());
        }
    } catch (error) {
        console.log(error.message);
    }
}
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} 
            hidden
            />
            <div className='w-32 h-32 self-center curser-pointer shadow-md overflow-hidden rounded-full' onClick={()=> filePickerRef.current.click()}>
    <img src={imageFileUrl ||  currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}  onChange={handleChange}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}  onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
            {
                currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                     <Button 
                    type='button'
                    gradientDuoTone='purpleToPink' className='w-full'>
                        Create a post
                    </Button>
                    </Link>
                )
            }
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
        </div>
        {error && (
            <Alert color='failure' className='mt-5'>
                {error}
            </Alert>
        )}
        <Modal show={showModal} 
        onClose={() => setShowModal(false)}
        popup
        size='md'    
        >
        <Modal.Header  />
        <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                <div className='flex justify-center gap-4'>
                    <Button color='failure' onClick={handleDeleteUser}>Yes, I'm Sure</Button>
                    <Button onClick={() => setShowModal(false)} color='gray'>No, Cancel</Button>
                </div>
            </div>
        </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashProfile