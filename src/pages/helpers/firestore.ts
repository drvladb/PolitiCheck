import { User } from "firebase/auth";
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

const checkUserData = async (user: User, db: Firestore) => {
  const thisUserRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(thisUserRef);
  if (userDoc.exists()) {
    // console.log("doc exists", userDoc.data());
    return userDoc.data();
  } else {
    const docData = {
      dateCreated: Timestamp.fromDate(new Date()),
      stats: {
        lifetime: {
          conservative: 0,
          liberal: 0,
          neutral: 0,
        },
      },
    };
    await setDoc(thisUserRef, docData);
    return (await getDoc(thisUserRef)).data(); // only happens once, so not bad
  }
};

/**
 * Quick hash function to hash article URLs
 * @param message Thing to hash
 * @returns hexadecimal hash
 */
async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const addArticle = async (
  user: User,
  db: Firestore,
  url: string,
  name: string,
  bias: string,
) => {
  const usersRef = collection(db, "users");
  const thisUserCollection = collection(usersRef, user.uid, "articles");
  const documentHash = await digestMessage(url);
  await setDoc(doc(thisUserCollection, documentHash), {
    name,
    url,
    bias,
    lastAccess: Timestamp.fromDate(new Date()),
  });
};

const getArticles = async (user: User, db: Firestore, pointLimit = 5) => {
  const usersRef = collection(db, "users");
  const thisUserCollection = collection(usersRef, user.uid, "articles");
  const q = query(
    thisUserCollection,
    orderBy("lastAccess", "desc"),
    limit(pointLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

const getUserData = async (user: User, db: Firestore) => {
  const thisUserRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(thisUserRef);
  return userDoc;
};

// pretty dangerous - not exposed
const setUserData = async (user: User, db: Firestore, data: any) => {
  const thisUserRef = doc(db, "users", user.uid);
  const userDoc = await setDoc(thisUserRef, data);
  return userDoc;
};

const addOneLifetimeStats = async (
  bias: "neutral" | "conservative" | "liberal",
  user: User,
  db: Firestore,
) => {
  // not atomic, but the user shouldn't be browsing from multiple devices
  const thisUserRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(thisUserRef);
  let data = userDoc.data();
  // console.log("A:", data)
  if (!data) data = checkUserData(user, db);
  const newData = {
    ...data,
    stats: {
      ...data.stats,
      lifetime: {
        ...data.stats.lifetime,
        [bias]: data.stats.lifetime[bias] + 1,
      },
    },
  };
  // console.log(newData)
  await setUserData(user, db, newData);
};

const addReadArticle = async (
  article: { url: string; name: string },
  bias: "neutral" | "conservative" | "liberal",
  user: User,
  db: Firestore,
) => {
  await addArticle(user, db, article.url, article.name, bias);
  await addOneLifetimeStats(bias, user, db);
};

const statsSubscribe = async (
  user: User,
  db: Firestore,
  callback: (doc: DocumentSnapshot) => any,
) => {
  return onSnapshot(doc(db, "users", user.uid), callback);
};

const articleSubscribe = async (
  user: User,
  db: Firestore,
  callback: (doc: QuerySnapshot) => any,
  pointLimit = 5,
) => {
  const usersRef = collection(db, "users");
  const thisUserCollection = collection(usersRef, user.uid, "articles");
  const q = query(
    thisUserCollection,
    orderBy("lastAccess", "desc"),
    limit(pointLimit),
  );
  return onSnapshot(q, callback);
};

export {
  checkUserData,
  addReadArticle,
  getArticles,
  getUserData,
  addOneLifetimeStats,
  statsSubscribe,
  articleSubscribe,
};
