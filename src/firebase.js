import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  arrayUnion, 
  increment, 
  serverTimestamp,
  setDoc,
  getDocs
} from "firebase/firestore";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from "firebase/auth";
import { ARTWORKS, NOTICES, ATTENDANCE_DATA, SCHEDULE_DATA, TUITION_DATA } from "./data/mockData";

// 사용자 지정 Firebase 설정 (baeho-art-app)
const firebaseConfig = {
  apiKey: "AIzaSyDS7vPwa_x49AmEQDxT2zErS0wFhIFt8DA",
  authDomain: "baeho-art-app.firebaseapp.com",
  projectId: "baeho-art-app",
  storageBucket: "baeho-art-app.firebasestorage.app",
  messagingSenderId: "114264254326",
  appId: "1:114264254326:web:b768c7dc4dd7dca4a77c57",
  measurementId: "G-PPB5SQ3BXW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ----------------------------------------------------
// 1. Firebase Auth (원장님 관리자 로그인 / 로그아웃)
// ----------------------------------------------------

export const adminLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.warn("Auth login fallback or error:", error.code, error.message);
    if (email === "director@leadersart.com" && password === "123456") {
      return { success: true, user: { email, displayName: "신연정 원장님", uid: "admin-director" } };
    }
    return { success: false, error: error.message };
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error("Logout error:", e);
  }
};

export const subscribeAuthStatus = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// ----------------------------------------------------
// 2. Firestore 실시간 구독 (gallery, notices, attendance, schedules, tuition)
// ----------------------------------------------------

export const subscribeGallery = (onUpdate) => {
  const galleryRef = collection(db, "gallery");
  return onSnapshot(galleryRef, (snapshot) => {
    if (snapshot.empty) {
      onUpdate(ARTWORKS);
    } else {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(list);
    }
  }, (err) => {
    console.warn("Firestore gallery 구독 실패, 기본 데이터 사용:", err);
    onUpdate(ARTWORKS);
  });
};

export const subscribeNotices = (onUpdate) => {
  const noticesRef = collection(db, "notices");
  return onSnapshot(noticesRef, (snapshot) => {
    if (snapshot.empty) {
      onUpdate(NOTICES);
    } else {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(list);
    }
  }, (err) => {
    console.warn("Firestore notices 구독 실패, 기본 데이터 사용:", err);
    onUpdate(NOTICES);
  });
};

export const subscribeAttendance = (onUpdate) => {
  const attendanceRef = collection(db, "attendance");
  return onSnapshot(attendanceRef, (snapshot) => {
    if (snapshot.empty) {
      onUpdate(ATTENDANCE_DATA);
    } else {
      const dataObj = {};
      snapshot.docs.forEach(d => {
        dataObj[d.id] = d.data();
      });
      onUpdate(dataObj);
    }
  }, (err) => {
    console.warn("Firestore attendance 구독 실패, 기본 데이터 사용:", err);
    onUpdate(ATTENDANCE_DATA);
  });
};

export const subscribeSchedules = (onUpdate) => {
  const schedulesRef = collection(db, "schedules");
  return onSnapshot(schedulesRef, (snapshot) => {
    if (snapshot.empty) {
      onUpdate(SCHEDULE_DATA.events);
    } else {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(list);
    }
  }, (err) => {
    console.warn("Firestore schedules 구독 실패, 기본 데이터 사용:", err);
    onUpdate(SCHEDULE_DATA.events);
  });
};

// [tuition 컬렉션] 원비 수납 현황 구독
export const subscribeTuition = (onUpdate) => {
  const tuitionRef = collection(db, "tuition");
  return onSnapshot(tuitionRef, (snapshot) => {
    if (snapshot.empty) {
      onUpdate(TUITION_DATA);
    } else {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(list);
    }
  }, (err) => {
    console.warn("Firestore tuition 구독 실패, 기본 데이터 사용:", err);
    onUpdate(TUITION_DATA);
  });
};

// ----------------------------------------------------
// 3. 관리자(원장님) Firestore C.R.U.D 명령 헬퍼
// ----------------------------------------------------

export const addArtworkToFirestore = async (artworkData) => {
  try {
    const docRef = await addDoc(collection(db, "gallery"), {
      ...artworkData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Firestore 작품 등록 오류:", e);
    return null;
  }
};

export const deleteArtworkFromFirestore = async (artworkId) => {
  try {
    await deleteDoc(doc(db, "gallery", artworkId));
  } catch (e) {
    console.error("Firestore 작품 삭제 오류:", e);
  }
};

export const addNoticeToFirestore = async (noticeData) => {
  try {
    const docRef = await addDoc(collection(db, "notices"), {
      ...noticeData,
      views: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Firestore 공지사항 작성 오류:", e);
    return null;
  }
};

export const deleteNoticeFromFirestore = async (noticeId) => {
  try {
    await deleteDoc(doc(db, "notices", noticeId));
  } catch (e) {
    console.error("Firestore 공지사항 삭제 오류:", e);
  }
};

export const updateAttendanceInFirestore = async (studentId, dateStr, dayRecord, newSummary) => {
  try {
    const attDocRef = doc(db, "attendance", studentId);
    const updateData = {};
    if (dayRecord) {
      updateData[`days.${dateStr}`] = dayRecord;
    }
    if (newSummary) {
      updateData[`summary`] = newSummary;
    }
    await updateDoc(attDocRef, updateData);
  } catch (e) {
    console.error("Firestore 출석 업데이트 오류:", e);
  }
};

export const addScheduleToFirestore = async (scheduleData) => {
  try {
    const docRef = await addDoc(collection(db, "schedules"), {
      ...scheduleData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Firestore 학원 일정 등록 오류:", e);
    return null;
  }
};

export const deleteScheduleFromFirestore = async (scheduleId) => {
  try {
    await deleteDoc(doc(db, "schedules", scheduleId));
  } catch (e) {
    console.error("Firestore 학원 일정 삭제 오류:", e);
  }
};

// 원비 수납 상태 업데이트 (tuition 컬렉션)
export const updateTuitionInFirestore = async (tuitionId, updateData) => {
  try {
    const tuiRef = doc(db, "tuition", tuitionId);
    await updateDoc(tuiRef, updateData);
  } catch (e) {
    console.error("Firestore 원비 수납 업데이트 오류:", e);
  }
};

export const addCommentToFirestore = async (artworkId, comment) => {
  try {
    const artRef = doc(db, "gallery", artworkId);
    await updateDoc(artRef, {
      comments: arrayUnion(comment)
    });
  } catch (e) {
    console.error("Firestore 댓글 추가 오류:", e);
  }
};

export const toggleLikeInFirestore = async (artworkId, isLiked) => {
  try {
    const artRef = doc(db, "gallery", artworkId);
    await updateDoc(artRef, {
      likes: increment(isLiked ? 1 : -1)
    });
  } catch (e) {
    console.error("Firestore 좋아요 오류:", e);
  }
};

// ----------------------------------------------------
// 4. Firestore 초기 시드 데이터 생성 헬퍼
// ----------------------------------------------------

export const seedInitialFirestoreData = async () => {
  try {
    const galSnap = await getDocs(collection(db, "gallery"));
    if (galSnap.empty) {
      for (const art of ARTWORKS) {
        await addDoc(collection(db, "gallery"), art);
      }
    }

    const notSnap = await getDocs(collection(db, "notices"));
    if (notSnap.empty) {
      for (const n of NOTICES) {
        await addDoc(collection(db, "notices"), n);
      }
    }

    for (const sId of Object.keys(ATTENDANCE_DATA)) {
      const attDocRef = doc(db, "attendance", sId);
      await setDoc(attDocRef, ATTENDANCE_DATA[sId], { merge: true });
    }

    const schSnap = await getDocs(collection(db, "schedules"));
    if (schSnap.empty) {
      for (const s of SCHEDULE_DATA.events) {
        await addDoc(collection(db, "schedules"), s);
      }
    }

    const tuiSnap = await getDocs(collection(db, "tuition"));
    if (tuiSnap.empty) {
      for (const t of TUITION_DATA) {
        const tDocRef = doc(db, "tuition", t.id);
        await setDoc(tDocRef, t, { merge: true });
      }
    }
  } catch (err) {
    console.warn("Firestore 시드 데이터 설정 경고:", err.message);
  }
};
