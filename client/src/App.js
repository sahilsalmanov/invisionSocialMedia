import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import About from './pages/extra/About.js'
import Collaborations from './pages/extra/Collaborations'
import Contact from './pages/extra/Contact'
import ContactInformation from './pages/extra/ContactInformation'
import FrequentlyAsked from './pages/extra/FrequentlyAsked'
import HelpAndSupport from './pages/extra/HelpAndSupport'
import HelpCenter from './pages/extra/HelpCenter'
import HowItWork from './pages/extra/HowItWorks'
import Press from './pages/extra/Press'
import Privacy from './pages/extra/Privacy'
import Sources from './pages/extra/Sources'
import TermsOfUse from './pages/extra/TermsOfUse'
import Vacancies from './pages/extra/Vacancies'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'

function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

 
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])


  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/howitwork" component={HowItWork} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/contactinformation" component={ContactInformation} />
          <Route exact path="/frequentlyasked" component={FrequentlyAsked} />
          <Route exact path="/helpandsupport" component={HelpAndSupport} />
          <Route exact path="/termsmofuse" component={TermsOfUse} />
          <Route exact path="/about" component={About} />
          <Route exact path="/sources" component={Sources} />
          <Route exact path="/helpandsupport" component={HelpAndSupport} />
          <Route exact path="/vacancies" component={Vacancies} />
          <Route exact path="/press" component={Press} />
          <Route exact path="/helpcenter" component={HelpCenter} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/collaborations" component={Collaborations} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;
