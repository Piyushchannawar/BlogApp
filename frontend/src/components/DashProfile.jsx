import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'


const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
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
        setImageFileUrl(jsonResponse.URL);
        console.log(jsonResponse.URL);
    };
   useEffect(() => {
    if(imageFile){
        uploadImage();
    }
   }, [imageFile]);
    const uploadImage = async () => {
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} 
            hidden
            />
            <div className='w-32 h-32 self-center curser-pointer shadow-md overflow-hidden rounded-full' onClick={()=> filePickerRef.current.click()}>
    <img src={imageFileUrl ||  currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile