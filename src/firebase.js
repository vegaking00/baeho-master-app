import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  arrayUnion, 
  increment, 
  serverTimestamp 
} from "firebase/firestore";
import { ARTWORKS, NOTICES } from "./data/mockData";

// Firebase 설정 (사용자 지정 Config 또는 환경변수 연동)
// Firebase Storage를 사용하지 않고 Firestore에 이미지 URL을 직접 저장하는 가벼운 구조입니다.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "DEMO_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "leaders-art.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "leaders-art",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "leaders-art.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

let db = null;
let isFirebaseConnected = false;

try {
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "DEMO_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseConnected = true;
    console.log("🔥 Firebase Cloud Firestore가 성공적으로 연결되었습니다.");
  } else {
    console.log("ℹ️ Firebase API Key가 설정되지 않아 로컬 오프라인 데이터 모드로 동작합니다.");
  }
} catch (error) {
  console.warn("Firebase 초기화 중 오류가 발생하여 오프라인 모드로 자동 전환됩니다:", error);
}

export { db, isFirebaseConnected };

// ----------------------------------------------------
// Firestore 데이터 구독 & C.R.U.D 헬퍼 함수
// (Firebase 연결 시 실시간 Firestore 데이터 연동, 비연동 시 Mock Data 연동)
// ----------------------------------------------------

// 1. 작품 목록 실시간 구독
export const subscribeArtworks = (onUpdate) => {
  if (isFirebaseConnected && db) {
    const artworksRef = collection(db, "artworks");
    return onSnapshot(artworksRef, (snapshot) => {
      if (snapshot.empty) {
        onUpdate(ARTWORKS);
      } else {
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        onUpdate(list);
      }
    }, (error) => {
      console.warn("Firestore artworks 구독 실패, 기본 데이터 사용:", error);
      onUpdate(ARTWORKS);
    });
  } else {
    onUpdate(ARTWORKS);
    return () => {};
  }
};

// 2. 작품 신규 추가 (Firebase Storage 대신 외부 이미지 URL 방식 활용)
export const addArtworkToFirestore = async (newArtwork) => {
  if (isFirebaseConnected && db) {
    try {
      const docRef = await addDoc(collection(db, "artworks"), {
        ...newArtwork,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (e) {
      console.error("Firestore 작품 등록 오류:", e);
    }
  }
  return null;
};

// 3. 작품 칭찬 댓글 추가
export const addCommentToFirestore = async (artworkId, comment) => {
  if (isFirebaseConnected && db) {
    try {
      const artRef = doc(db, "artworks", artworkId);
      await updateDoc(artRef, {
        comments: arrayUnion(comment)
      });
    } catch (e) {
      console.error("Firestore 댓글 추가 오류:", e);
    }
  }
};

// 4. 작품 좋아요 토글
export const toggleLikeInFirestore = async (artworkId, isLiked) => {
  if (isFirebaseConnected && db) {
    try {
      const artRef = doc(db, "artworks", artworkId);
      await updateDoc(artRef, {
        likes: increment(isLiked ? 1 : -1)
      });
    } catch (e) {
      console.error("Firestore 좋아요 업데이트 오류:", e);
    }
  }
};
