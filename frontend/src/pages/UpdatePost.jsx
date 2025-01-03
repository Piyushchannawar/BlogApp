import {Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
const  UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData);
  const {postId} = useParams();
  const navigate = useNavigate();
  
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);


  const handleImageUpload = async () =>{
    if(file){
      const data = new FormData();
      const fileName = new Date().getTime() + file.name;
      data.append('file', file);
      data.append('upload_preset', 'blogapp');
      data.append('cloud_name', 'doeicc3sy');
      const response = await fetch('https://api.cloudinary.com/v1_1/doeicc3sy/image/upload', {
        method: 'POST',
        body: data
      });
      const jsonResponse = await response.json();
      setFormData({...formData, image: jsonResponse.url});
      console.log(jsonResponse.url);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      setPublishError(data.message);
      return;
    }
    if(data.slug){
      navigate(`/post/${data.slug}`);
    }
  } catch (error) {
    setPublishError(error.message);
  }
};




  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
          />
          <Select
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='Webdevelopment'>Web Development</option>
            <option value='Dsa'>DSA</option>
            <option value='MachineLearning'>Machine Learning</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleImageUpload}
          >
          UploadImage
          </Button>
        </div>
       {formData.image && <img src={formData.image} alt='post' className='w-full h-72 object-cover' />}
        <ReactQuill
         value={formData.content}
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update post
        </Button>
        {publishError && <p className='text-red-500'>{publishError}</p>}
      </form>
    </div>
  );
}

export default UpdatePost;