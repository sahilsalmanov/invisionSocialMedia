import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './extra/Navbar/Navbar'
import Footer from './extra/Footer/Footer'
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Select from 'react-select';
import enTranslation from '../i18n/en/translation.json';
import trTranslation from '../i18n/tr/translation.json';
import rusTranslation from '../i18n/rus/translation.json';


const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'tr', label: 'Türkçe' },
    {value: 'rus', label: 'Русский'}
    // Diğer dilleri buraya ekleyebilirsiniz
  ];
  
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      tr: { translation: trTranslation },
      rus: {translation: rusTranslation}
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });


const Login = () => {

    const { t, i18n } = useTranslation();
  
    const handleLanguageChange = (selectedLanguage) => {
      i18n.changeLanguage(selectedLanguage.value);
    };

    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        
      <>
      <Navbar/>
       <div style={{display: 'flex', justifyContent: 'space-between'}} className='general_auth_page'>
       <div className="auth_page">
            <form style={{height: '400px'}} onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">JobPoint</h3>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">{t('email')}</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />
                    
                    <small id="emailHelp" className="form-text text-muted">
                    {t('we')}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">{t('Password')}</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                   
                </div>
                
                <button type="submit" className="btn btn-dark w-100"
                disabled={email && password ? false : true}>
                   {t('loginn')}
                </button>
 
                <p className="my-2">
                {t('account')} <Link to="/register" style={{color: "crimson"}}>{t('Register Now')}</Link>
                </p>
            </form>
        </div>
        <img width={500} height={500} src='./logo4.png'></img>
       </div>
        <Footer/>
        </>
    )
}

export default Login
