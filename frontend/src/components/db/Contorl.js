
import { getFirestore, addDoc, collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const USERS_COLLECTION_NAME = "users"
const MYURLS_COLLECTION_NAME = "myUrls"

/*
Doc 에 접근하기 위해서는 Ref가 필요한데,
query에서 Doc ref 를 한번에 리턴해주는 기능이 없음
때문에 쿼리로 쿼리 스냅샷 데이터들을 가져와서, Doc id를 찾고
Doc id로 다시 Doc ref를 찾아야 함
*/
const getUserDocById = async (userId) => {

    const db = getFirestore();
    const q = query(collection(db, USERS_COLLECTION_NAME), where("userId", "==", userId));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 1) {
            console.log(`DB에 동일한 ID="${userId}", ${querySnapshot.size}개 있는 상태로 문제 해결이 필요함`);
        }

        if (querySnapshot.empty) { // ID 가 DB에 존재 하지 않음
            console.log("ID does not exist.! create empty user document!");
            const newDocRef = await addDoc(collection(db, USERS_COLLECTION_NAME), { userId: userId });
            console.log(`created document id => ${newDocRef.id}`);
            return { docRef: newDocRef, docData: null };

        } else { // ID 가 DB에 존재함, 현재 여러개가 있을경우 마지막것을 가져오게 되어 있음.(수정필요)
            let docId = "";
            let docData = "";
            querySnapshot.forEach((docSnap) => {
                docId = docSnap.id;
                docData = docSnap.data();
            });
            const docRef = doc(db, USERS_COLLECTION_NAME, docId);
            console.log(`document id => ${docRef.id}`);
            return { docRef: docRef, docData: docData };
        }
    } catch (error) {
        console.log("error getUserDocById :", error);
    }
}

const getMyUrlsDocs = async (userDbRef) => {

    try {
        const querySnapshot = await getDocs(collection(userDbRef, MYURLS_COLLECTION_NAME));

        let res = [];
        querySnapshot.forEach((docSnap) => {
            let docData = docSnap.data();
            let docRef = doc(userDbRef, MYURLS_COLLECTION_NAME, docSnap.id);
            res.push({ docRef: docRef, docData: docData });
        })

        return res;
    } catch (error) {
        console.log('error getMyUrlsDocs :', error);
    }

}

/*
기존 데이터에
속성이 없으면 추가,
속성이 있으면 교체
*/
const updateUserDoc = async (userDbRef, userData) => {
    try {
        await updateDoc(userDbRef, userData); // promise void return
        console.log("udateUserDoc");
    } catch (e) { console.log(e); }
}

/*
기존 데이터를 지우고
새로운 데이터를 넣음
새로운 데이터의 기존에 있던 속성이 정의되어 있지않으면 사라짐
*/
const setUserDoc = async (userDbRef, userData) => {
    try {
        const response = await setDoc(userDbRef, userData);
        console.log("setUserDoc : ", response);
        return response;
    } catch (e) { console.log(e); }
}

const getUserDoc = async (DocRef) => {
    const docSnap = await getDoc(DocRef);

    console.log("getUserDoc: ", docSnap.data());

    return docSnap.data();
}

const addMyUrlsDoc = async (userDbRef, urlData) => {

    const newUrlRef = await addDoc(collection(userDbRef, MYURLS_COLLECTION_NAME), urlData);

    return newUrlRef;
}

export { getUserDocById, updateUserDoc, setUserDoc, addMyUrlsDoc, getMyUrlsDocs }