import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useTestAuthStore } from "store"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        console.log(event);
        event.preventDefault();

        try {
            let resoponse = await signInWithEmailAndPassword(
                auth, email, password);

            console.log('resoponse:', resoponse);
            return resoponse;

        } catch (err) {
            console.log(err.message);
        }

    }

    const googleLoginWithPopup = async (event) => {
        // Sign in using a popup.
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const result = await signInWithPopup(auth, provider);

        // The signed-in user info.
        const user = result.user;
        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        console.log("구글로그인");
        console.log(user);
    }

    return (
        <div className="p-10 bg-carousel flex flex-col gap-10 items-center">
            {/* 이메일 로그인은 추후 사용 */}
            {/* <form className='flex gap-2' onSubmit={onSubmit}>
                <input className=" border-gray-500 border-[1px] outline-none rounded-md px-2" onChange={onChange}
                    type="text" name="email" placeholder='Email' value={email} required />
                <input className=" border-gray-500 border-[1px] outline-none rounded-md px-2" onChange={onChange}
                    type="password" name="password" placeholder='Password' value={password} required />
                <button className=" bg-gray-500 p-1 rounded-md" type="submit">LogIn</button>
            </form> */}

            <div className=' h-[600px]'>
                <span className=' font-extrabold text-2xl'> URL 관리를 쉽게, URL TAG </span>
            </div>

            <button className=' bg-red-300 px-20 py-2 rounded-md font-bold' onClick={googleLoginWithPopup}>구글 계정으로 로그인</button>
        </div>
    )
}

export const TestLogin = () => {
    const [email, setEmail] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        } 
    }

    const { setTestAuthLogin } = useTestAuthStore();


    return (
        <div className="p-10 bg-carousel flex flex-col gap-10 items-center">
            {/* 이메일 로그인은 추후 사용 */}
            {/* <form className='flex gap-2' onSubmit={onSubmit}>
                <input className=" border-gray-500 border-[1px] outline-none rounded-md px-2" onChange={onChange}
                    type="text" name="email" placeholder='Email' value={email} required />
                <input className=" border-gray-500 border-[1px] outline-none rounded-md px-2" onChange={onChange}
                    type="password" name="password" placeholder='Password' value={password} required />
                <button className=" bg-gray-500 p-1 rounded-md" type="submit">LogIn</button>
            </form> */}

            <div className=' h-[500px]'>
                <span className=' font-extrabold text-2xl'> URL 관리를 쉽게, URL TAG </span>
            </div>

            <input type="text" name="email" placeholder='E-mail' onChange={onChange} value={email}
                className='px-2 w-[250px] h-8 rounded-md outline-none border-gray-300 border-[1px]' />

            <button className=' bg-red-300 px-20 py-2 rounded-md font-bold' onClick={() => {setTestAuthLogin(email)}}>테스트 로그인</button>
        </div>
    )
}