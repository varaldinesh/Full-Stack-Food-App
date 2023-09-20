import React, { useState } from 'react'
import { LoginBg, Logo } from '../assets'
import Logininput from './Logininput'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { buttonClick } from '../Animations'
import { FcGoogle } from 'react-icons/fc'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from '../Config/firebase.config'

const Login = () => {

    const [userEmail, setuserEmail] = useState("");
    const [isSignup, setisSignup] = useState(false);
    const [Password, setPassword] = useState("");
    const [Confirm_password, setConfirm_password] = useState("");

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then(userCred => {
            firebaseAuth.onAuthStateChanged(Cred => {
                if (Cred) {
                    Cred.getIdToken().then((token) => {
                        console.log(token);
                    }
                    )
                }
            })
        })


    }
    return (
        <div className='w-screen h-screen relative overflow-hidden flex'>

            {/* background image */}
            <img src={LoginBg} className='w-full h-full object-cover absolute top-0 left-0' alt="" />

            {/* content Box */}

            <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6'>
                {/* Top Logo Section */}
                <div className='flex items-center justify-start gap-4 w-full'>
                    <img src={Logo} className='w-8' alt="logo" />
                    <p className='text-headingColor font-semibold text-2xl'>City</p>
                </div>

                {/* Welcom Text */}
                <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
                <p className='text-xl text-textColor -mt-6'>{isSignup ? "Sign Up" : "Sign In"} with following</p>

                {/* Input Section */}
                <div className='w-ful flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
                    <Logininput placeHolder={"Email Here"} icon={<FaEnvelope className='text-xl text-textColor' />} inputState={userEmail} inputStateFunc={setuserEmail} type="email" isSignup={isSignup} />

                    <Logininput placeHolder={"Password Here"} icon={<FaLock className='text-xl text-textColor' />} inputState={Password} inputStateFunc={setPassword} type="password" isSignup={isSignup} />

                    {isSignup && (
                        <Logininput placeHolder={"Confirm Password Here"} icon={<FaLock className='text-xl text-textColor' />} inputState={Confirm_password} inputStateFunc={setConfirm_password} type="password" isSignup={isSignup} />
                    )}

                    {!isSignup ? <p>Doesn't have account: {" "} <motion.button {...buttonClick} className='text-red-700 underline bg-transparent' onClick={() => setisSignup(true)}>Create One</motion.button> </p> : <p>Already Have Account: {" "}<motion.button {...buttonClick} className='text-red-700 underline bg-transparent ' onClick={() => setisSignup(false)}>Sign-In Here</motion.button> </p>}


                    {/* Button Section */}

                    {isSignup ? <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-700 cursor-pointer text-white text-xl capitalize hover:bg-red-800 transition-all duration-150'>
                        Sign Up
                    </motion.button> : <motion.button {...buttonClick} className='w-full px-4 py-2 rounded-md bg-red-700 cursor-pointer text-white text-xl capitalize hover:bg-red-800 transition-all duration-150'>
                        Log In
                    </motion.button>}
                </div>

                <div className='flex items-center justify-between gap-16'>
                    <div className='w-24 h-[1px] rounded-md bg-white'></div>
                    <p className='text-white'>or</p>
                    <div className='w-24 h-[1px] rounded-md bg-white'></div>
                </div>

                <motion.div {...buttonClick} className='flex items-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4' onClick={loginWithGoogle}> <FcGoogle className='text-3xl' />
                    <p className='capitalize text-base text-headingColor'>Signin with Google</p>

                </motion.div>

            </div>
        </div>
    )
}

export default Login