import { User } from "firebase/auth";
import { Firestore, Timestamp, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";

const checkUserData = async (user: User, db: Firestore) => {
    const thisUserRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(thisUserRef);
    if (userDoc.exists()) {
        console.log("doc exists", userDoc.data());
    } else {
        const docData = {
            dateCreated: Timestamp.fromDate(new Date()),
            stats: {
                lifetime: {
                    conservative: 0,
                    liberal: 0,
                    neutral: 0,
                }
            }
        };
        await setDoc(thisUserRef, docData);
    }
}

const addArticle = async (user: User, db: Firestore, url: string, name: string, bias: string) => {
    const usersRef = collection(db, 'users');
    const thisUserCollection = collection(usersRef, user.uid, 'articles');
    await setDoc(doc(thisUserCollection, url), 
    {
        name, url, bias,
        lastAccess: Timestamp.fromDate(new Date())
    });
}

const getArticles = async (user: User, db: Firestore, pointLimit = 5) => {
    const usersRef = collection(db, 'users');
    const thisUserCollection = collection(usersRef, user.uid, 'articles');
    const q = query(thisUserCollection, orderBy("lastAccess"), limit(pointLimit));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

const getUserData = async (user: User, db: Firestore) => {
    const thisUserRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(thisUserRef);
    return userDoc;
}

export {checkUserData, addArticle, getArticles, getUserData}