import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'


function App() {

  return (
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/post/:postSlug" element={<PostPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/editpost/:postId' element={<UpdatePost />} />
        </Route>
    </Routes>
    <FooterCom />
  </BrowserRouter>
  )
}

export default App
