import './LoginForm.css'
import { useFormik } from 'formik';
import { loginSchema } from '../../Validation/LoginValidation';
import instance from '../../axios';
import requests from '../../requests';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../App';

const LoginForm = ({ signIn }) => {

  const [loginError, setLoginError] = useState(false);

  const handleSignIn = () => {

    instance.post(requests.login, {
        email: `${formik.values.email}`,
        password: `${formik.values.password}`,
    }).then(response => {
      console.log(response);
      sessionStorage.setItem('access', response.data.access);
      sessionStorage.setItem('refresh', response.data.refresh);
      instance.defaults.headers['Authorization'] = 
        'JWT ' + sessionStorage.getItem('access');
      signIn({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    }).catch(error => {
      console.log(error);
      setLoginError(true);
    })
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: () => handleSignIn(),
  })

  return (
    <div className='loginForm'>
      <h1>WALK A DOG</h1>
      
      <svg width="280" height="280" viewBox="0 0 231 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M170.074 150.616C170.074 150.616 208.441 148.049 216.461 133.312C224.525 118.604 234.855 82.0195 196.819 78.4931C158.809 74.974 163.209 98.1317 168.796 103.867C174.423 109.573 194.996 109.53 200.508 107.599C206.019 105.661 214.812 112.631 209.697 124.047C204.597 135.482 170.074 150.63 170.074 150.63" fill="#926C48"/>
        <path d="M45.9149 31.9033C41.5115 34.8377 38.7647 40.2301 36.8554 44.8609C31.7409 57.2122 39.9053 59.8326 40.0027 59.8254C45.489 62.0813 52.04 65.1384 55.0466 36.4258C55.5014 31.8455 50.1884 29.0519 45.9149 31.9033Z" fill="#A87C51"/>
        <path d="M117.121 125.758C115.289 125.641 113.455 125.558 111.62 125.509C104.242 125.354 98.6009 127.31 96.8757 130.638C95.2081 133.864 96.789 139.008 101.333 145.147C107.985 154.135 112.197 155.427 114.767 155.582C117.233 155.755 119.824 154.925 122.816 153.976C124.771 153.316 126.757 152.754 128.768 152.294C138.968 150.132 147.277 152.785 152.561 159.733C162.191 172.405 159.072 195.076 157.448 203.688C159.246 206.045 165.212 211.152 170.886 211.531C172.467 211.632 177.339 211.968 181.512 203.406C182.411 198.952 184.316 171.969 169.204 151.056C158.221 135.871 140.708 127.36 117.121 125.754" fill="#926C48"/>
        <path d="M163.324 124.917C161.422 124.79 159.517 124.704 157.611 124.661C149.962 124.498 144.09 126.541 142.282 129.995C140.571 133.352 142.209 138.701 146.927 145.061C153.835 154.413 158.224 155.734 160.873 155.925C163.451 156.105 166.143 155.254 169.262 154.25C171.289 153.56 173.353 152.984 175.445 152.525C186.045 150.269 194.679 153.012 200.18 160.227C210.192 173.405 206.962 196.978 205.251 205.9C207.131 208.38 213.31 213.671 219.212 214.065C220.861 214.169 225.918 214.527 230.253 205.622C231.209 200.992 233.173 172.958 217.458 151.229C206.063 135.445 187.857 126.599 163.324 124.946" fill="#A87C51"/>
        <path d="M88.7834 152.352C81.9906 142.942 72.6423 136.106 60.9335 131.879C60.8613 136.489 61.3161 141.004 63.0269 145.093C64.8641 149.475 71.1913 159.783 72.1442 161.029C81.774 173.698 78.6699 196.382 77.0313 204.987C78.8396 207.344 84.795 212.444 90.4654 212.83C92.0607 212.939 96.9334 213.264 101.081 204.702C102.019 200.252 103.899 173.264 88.7834 152.352Z" fill="#926C48"/>
        <path d="M82.9289 126.234C81.0263 126.111 79.1213 126.026 77.2153 125.978C69.549 125.816 63.6657 127.844 61.8863 131.309C60.161 134.662 61.7852 140.008 66.5171 146.371C73.4543 155.726 77.8144 157.051 80.4782 157.235C83.0408 157.401 85.737 156.557 88.8555 155.56C90.7938 154.936 92.815 154.286 95.0239 153.824C105.625 151.568 114.273 154.312 119.77 161.541C129.771 174.701 126.552 198.285 124.855 207.214C126.721 209.679 132.919 214.967 138.802 215.371C140.47 215.483 145.508 215.826 149.843 206.929C150.8 202.298 152.752 174.264 137.052 152.536C125.639 136.741 107.433 127.909 82.9289 126.256" fill="#A87C51"/>
        <path d="M106.819 109.757C77.356 107.188 55.8189 104.899 53.9384 126.382C52.0724 147.872 74.4252 167.381 103.871 169.947C120.697 171.42 136.196 167.017 146.735 158.96C148.075 159.098 149.399 159.267 150.767 159.246C167.764 158.975 181.342 146.887 181.111 132.222C180.869 118.362 124.798 111.317 106.819 109.75" fill="#A87C51"/>
        <path d="M167.222 118.806C152.319 116.554 141.394 114.605 140.538 132.071C139.697 149.565 179.704 161.527 189.759 159.329C198.18 157.484 205.175 149.406 205.005 137.456C204.818 126.169 176.354 120.149 167.222 118.792" fill="#A87C51"/>
        <path d="M172.748 111.356C128.927 111.122 147.302 131.757 146.45 149.23C145.599 166.731 185.215 154.081 195.271 151.886C203.677 150.031 210.701 141.96 210.488 130.013C210.318 118.723 181.981 111.385 172.748 111.346V111.356ZM124.668 130.371C126.422 116.161 67.8274 46.7053 56.4867 50.0223C44.7923 53.4693 29.0482 55.8118 29.7304 66.001C32.2678 104.17 70.7618 159.643 80.5504 158.437C94.313 156.705 122.878 144.606 124.671 130.371" fill="#A87C51"/>
        <path d="M67.5856 55.3389C66.0336 55.6241 64.4671 55.8876 62.9006 56.1583C63.2724 57.2916 63.7849 58.3528 64.1675 59.4572C66.5894 58.739 69.3109 58.9447 71.7761 60.9948C87.6465 74.2448 107.408 101.741 110.256 122.643C111.652 132.858 109.032 142.56 103.86 150.713C114.316 145.548 123.675 138.304 124.671 130.363C126.097 118.893 88.2168 71.4765 67.5856 55.3353V55.3389ZM79.3522 143.209C95.7351 137.326 74.7069 115.749 70.4189 109.844C60.06 95.5546 51.9245 76.8941 46.5971 59.385C40.703 60.8649 34.9749 62.8392 29.7305 65.9216V65.9938C31.4269 91.772 49.5315 125.386 64.1495 144.162C69.0799 145.191 74.2232 145.046 79.3522 143.209Z" fill="#926C48"/>
        <path d="M13.2934 92.5913C25.4028 97.6553 39.4613 95.6015 50.8886 92.9089C81.3626 85.7154 73.8118 64.5537 73.6818 64.4021C69.5383 49.4232 65.3766 39.2664 7.95149 74.8404C-1.18384 80.4963 1.59538 87.6898 13.2934 92.5913Z" fill="#A87C51"/>
        <path d="M68.4989 30.4415C62.4568 34.4659 58.7103 41.8399 56.0898 48.1635C49.1093 65.059 60.2623 68.6431 60.3778 68.6287C67.8997 71.7255 76.8762 75.9196 80.9801 36.6316C81.6334 30.3837 74.3389 26.5506 68.4989 30.4415Z" fill="#A87C51"/>
        <path d="M59.2153 68.7032C59.2731 72.457 56.8223 75.5286 53.7146 75.5791C50.6106 75.6369 48.0732 72.6375 48.001 68.8909C47.9432 65.13 50.394 62.0512 53.4981 62.0006C56.5913 61.9501 59.1576 64.9459 59.2153 68.7032Z" fill="#25333A"/>
        <path d="M103.499 95.699C98.7813 115.28 69.6934 126.065 52.7871 127.646C42.8577 128.57 47.6582 136.507 53.841 135.929C74.5408 133.998 110.086 129.147 115.814 105.358C116.612 102.048 104.618 91.1295 103.52 95.699" fill="#BE202E"/>
        <path d="M82.4886 139.185C82.4886 144.469 78.955 148.75 74.6094 148.75C70.2492 148.75 66.7048 144.469 66.7048 139.185C66.7048 133.915 70.2528 129.634 74.6094 129.634C78.955 129.634 82.4886 133.915 82.4886 139.185Z" fill="#F7EC35"/>
        <path d="M0 76.7606C0 69.2062 6.42469 69.3433 15.1991 69.3433C23.9771 69.3433 31.7517 69.2062 31.7517 76.7606C31.7517 84.3258 24.6412 90.4546 15.8668 90.4546C7.11047 90.4546 0 84.3258 0 76.7606Z" fill="#25333A"/>
      </svg>

      <form onSubmit={formik.handleSubmit}>

        {
          formik.errors.email && formik.touched.email
          ? <p className='formError'>{formik.errors.email}</p> 
          : null
        }

        <input 
          name='email' 
          placeholder='E-mail' 
          type="text" 
          onBlur={formik.handleBlur}
          value={formik.values.email} 
          onChange={formik.handleChange}
        />

        {
          formik.errors.password && formik.touched.password
          ? <p className='formError'>{formik.errors.password}</p> 
          : null
        }

        <input 
          name='password' 
          placeholder='Password' 
          type="password" 
          onBlur={formik.handleBlur}
          value={formik.values.password} 
          onChange={formik.handleChange}
        />

        

        <a href='' style={{color: '#577590'}}>Forgot your password?</a>

        <div className='buttonsContainer'>
          <Link to={'/register'} className='button' >Sign Up!</Link>
          <button className='button' type='submit'>Sign in!</button>
        </div>

        {loginError && <p style={{color: 'red', marginTop: '20px', textAlign: 'center', fontSize: '21px'}}>Invalid e-mail address or password.</p>}
      </form>
    </div>
  )
}

export default LoginForm;