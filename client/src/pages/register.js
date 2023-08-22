import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
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
  

const Register = () => {

    const { t, i18n } = useTranslation();
  
    const handleLanguageChange = (selectedLanguage) => {
      i18n.changeLanguage(selectedLanguage.value);
    };



    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = { 
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
      <>
      <Navbar/>
      <div className='main_auth_page'>
      <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">JobPoint</h3>

                <div className="form-group">
                    <label htmlFor="fullname">{t('fullname')}</label>
                    <input type="text" className="form-control" id="fullname" name="fullname"
                    onChange={handleChangeInput} value={fullname}
                    style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">{t('username')}</label>
                    <input type="text" className="form-control" id="username" name="username"
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                    style={{background: `${alert.username ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.username ? alert.username : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">{t('email')}</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email}
                    style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">{t('Password')}</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"
                        style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">{t('Confirm Password')}</label>

                    <div className="pass">
                        
                        <input type={ typeCfPass ? "text" : "password" } 
                        className="form-control" id="cf_password"
                        onChange={handleChangeInput} value={cf_password} name="cf_password"
                        style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <div className="row justify-content-between mx-0 mb-1">
                    <label htmlFor="male">
                    {t('Male')}: <input type="radio" id="male" name="gender"
                        value="male" defaultChecked onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="female">
                    {t('Female')}: <input type="radio" id="female" name="gender"
                        value="female" onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="other">
                    {t('Other')}: <input type="radio" id="other" name="gender"
                        value="other" onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                {t('register')}
                </button>

                <p className="my-2">
                {t('Already')} <Link to="/" style={{color: "crimson"}}>{t('Login now')}</Link>
                </p>
            </form>
        </div>
        <img width={500} height={500} src='./logo4.png'></img>
      </div>
        <Footer/>
       </>
    )
}

export default Register
