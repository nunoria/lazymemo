import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Dashboard () {

    const auth = getAuth();

    return (
        <div>
            <span>대쉬보드</span>
        </div>
    )
}