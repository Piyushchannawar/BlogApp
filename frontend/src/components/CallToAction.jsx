import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/Piyushchannawar" target='_blank' rel='noopener noreferrer'>
                     JavaScript Projects
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://th.bing.com/th/id/R.535e92c65ddaff1a55f11df10c680c75?rik=f%2biBg6VYkZpFAQ&riu=http%3a%2f%2fradicalhub.com%2fwp-content%2fuploads%2f2018%2f07%2fjavascript.jpg&ehk=%2f8TEVGmLi%2bQfePoivY3xtjLzdul2sHZ8uuJe38nC3L4%3d&risl=&pid=ImgRaw&r=0" />
        </div>
    </div>
  )
}

export default CallToAction;