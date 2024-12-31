import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'

const Header = () => {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme);
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
        <Navbar className='border-b-2'>
            <Link
                to='/'
                className='self-center text-sm sm:text-xl font-semibold dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300'
            >
                Blogyfy
            </Link>
            <form className='hidden lg:block'>
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray'>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 items-center md:order-3'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown 
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                        alt='user'
                        img={currentUser.profilePicture}
                        rounded
                        />
                    }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                       <Dropdown.Item onClick={handleSignout}>
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/signin' className='hidden sm:inline'>
                    <Button gradientDuoTone='purpleToBlue'>
                        Sign In
                    </Button>
                </Link>
                )}
                
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className='md:order-2'>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
