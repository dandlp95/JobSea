import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appCSS from './App.module.css'
import { TypeAnimation } from 'react-type-animation'
import Button from './components/button'
import AuthApiService from './utilities/ApiServices/AuthApiService'
import { PathParams } from './customTypes/requestTypes'
import { UserCreateDTO, LoginInfo } from './customTypes/requestTypes'

const params: PathParams = {

}

const App: React.FunctionComponent = () => {
  const [loginName, setLoginName] = useState('')
  const [lPassword, setLPassword] = useState('')
  const [rUsername, setRUsername] = useState('')
  const [rPassword, setRPassword] = useState('')
  const [rPasswordConfirm, setRPasswordConfirm] = useState('')
  const [rEmail, setREmail] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const browserToken = localStorage.getItem('token')
    if (browserToken) {
      navigate('/jobs')
    } else if (token) {
      localStorage.setItem('token', token)
      navigate('/jobs')
    }
  }, [token])

  const buttonStyleRules = {
    padding: '1rem 2.5rem',
    backgroundColor: '#2d3142',
    fontSize: '1.25rem'
  }

  const login = async () => {
    const bodyRequest: LoginInfo = {
      username: loginName,
      password: lPassword
    }
    AuthApiService.auth('users/auth', params, bodyRequest).then(response => {
      if (response.result && response.token) {
        localStorage.setItem('username', response.result.username)
        localStorage.setItem('userId', response.result.userId.toString())
        setToken(response.token)
      }
    })
  }

  const registration = () => {
    try {
      const bodyRequest: UserCreateDTO = {
        username: rUsername,
        email: rEmail,
        password: rPassword,
        confirmPassword: rPasswordConfirm
      }

      AuthApiService.postUser('users', params, bodyRequest).then(response => {

        if (response.result && response.token) {
          localStorage.setItem('username', response.result.username);
          localStorage.setItem('userId', response.result.userId.toString());
          setToken(response.token)
        }
      })
    } catch (err) {
      console.error(err)
      alert('Error logging in')
    }
  }

  return (
    <div className={appCSS.appCSS}>
      <div className={appCSS.appFlexbox}>
        <div className={appCSS.pageTitle}>
          <h2 className={appCSS.title}>JobSea</h2>
          <div className={appCSS.typeAnimation}>
            <TypeAnimation
              sequence={[
                'Easy to use...',
                1000,
                'No more spreadsheets...',
                1000,
                'No more messiness...',
                1000,
                'No more stress...',
                1000
              ]}
              speed={50} // Custom Speed from 1-99 - Default Speed: 40
              style={{ fontSize: '2em' }}
              wrapper='span' // Animation will be rendered as a <span>
              repeat={0} // Repeat this Animation Sequence infinitely
            />
          </div>
        </div>
        <div className={appCSS.registrationDiv}>
          <form onSubmit={e => e.preventDefault()} className={appCSS.loginForm}>
            <div className={appCSS.inFormContainer}>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type='text'
                  onChange={e => setLoginName(e.target.value)}
                  name='loginName'
                />
                <label htmlFor='loginName' className={appCSS.floatingLabel}>
                  Username:{' '}
                </label>
              </div>
              <div className={appCSS.loginInputDiv}>
                <input
                  required
                  type='password'
                  name='lPassword'
                  onChange={e => setLPassword(e.target.value)}
                />
                <label htmlFor='lPassword' className={appCSS.floatingLabel}>
                  Password:
                </label>
              </div>
              <Button
                btnText='Log in'
                styleRules={buttonStyleRules}
                clickAction={login}
              />
            </div>
          </form>
          <form
            onSubmit={e => e.preventDefault()}
            className={appCSS.registrationForm}
          >
            <div className={appCSS.inFormContainer}>
              <div className={appCSS.registrationInputDiv}>
                <input
                  type='text'
                  required
                  name='username'
                  onChange={e => setRUsername(e.target.value)}
                />
                <label className={appCSS.floatingLabel}>Username: </label>
              </div>
              <div className={appCSS.registrationInputDiv}></div>
              <div className={appCSS.registrationInputDiv}>
                <input
                  required
                  type='text'
                  onChange={e => setREmail(e.target.value)}
                  name='rEmail'
                />
                <label className={appCSS.floatingLabel}>Email: </label>
              </div>
              <div className={appCSS.registrationInputDiv}>
                <input
                  required
                  type='password'
                  onChange={e => setRPassword(e.target.value)}
                  name='password'
                />{' '}
                <label className={appCSS.floatingLabel}>Password: </label>
              </div>
              <div>
                <div className={appCSS.registrationInputDiv}>
                  <input
                    required
                    type='password'
                    onChange={e => setRPasswordConfirm(e.target.value)}
                    name='rPasswordConfirm'
                  />
                  <label className={appCSS.floatingLabel}>
                    Confirm Password:{' '}
                  </label>
                </div>
              </div>
              <Button
                btnText='Register'
                clickAction={registration}
                styleRules={buttonStyleRules}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
