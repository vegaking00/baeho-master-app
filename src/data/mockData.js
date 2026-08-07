export const ACADEMY_INFO = {
  name: "리더스아트",
  subText: "창의 감성 어린이 미술전문 • 신연정 원장",
  phone: "02-555-7890",
  address: "서울시 강남구 미술로 123 🎨 2층 리더스아트",
  director: "신연정 원장님",
  teacher: "주미 선생님"
};

export const STUDENTS = [
  {
    id: "s1",
    name: "김우진",
    grade: "초등 3학년",
    class: "융합 조형 & 수채화반",
    avatarColor: "bg-sky-400",
    avatarEmoji: "👦",
    teacher: "신연정 원장님 / 주미 선생님"
  },
  {
    id: "s2",
    name: "배시우",
    grade: "7세 유치부",
    class: "창의 표현 & 클레이반",
    avatarColor: "bg-amber-400",
    avatarEmoji: "👧",
    teacher: "주미 선생님"
  }
];

export const ARTWORKS = [
  {
    id: "art-1",
    studentId: "s1",
    title: "노란 해바라기 병 속의 햇살",
    date: "2026.08.05",
    category: "수채화",
    imageUrl: "/images/artwork_sunflower.jpg",
    materials: "수채화 물감, 파스텔, 4절 캔버스지",
    teacherName: "신연정 원장님",
    teacherAvatar: "👩‍🎨",
    feedback: "우진이가 해바라기의 수술과 꽃잎 결을 세밀하게 관찰하여 완성해주었어요! 붓터치가 끝까지 정성스러웠고, 배경의 보라색 대비 감각이 무척 뛰어납니다. 집에서도 칭찬 많이 해주세요! ❤️",
    tags: ["#색채감각", "#수채화기초", "#명화오마주"],
    likes: 14,
    comments: [
      { id: 1, name: "우진 엄마", date: "2026.08.05 17:30", text: "우와! 우리 우진이 수채화 실력이 정말 많이 늘었네요~ 신연정 원장님 지도 감사드립니다!" },
      { id: 2, name: "신연정 원장님", date: "2026.08.05 18:10", text: "감사합니다 학부모님! 우진이가 관찰력과 색 조합 센스가 아주 뛰어납니다 ^^" }
    ]
  },
  {
    id: "art-2",
    studentId: "s1",
    title: "우주를 여행하는 야옹이 대원",
    date: "2026.07.28",
    category: "일러스트",
    imageUrl: "/images/artwork_space_cat.jpg",
    materials: "아크릴 마카, 동화 드로잉북",
    teacherName: "주미 선생님",
    teacherAvatar: "🎨",
    feedback: "우주복을 입은 고양이의 무중력 수염 표현과 신비로운 행성들의 조합이 상상력이 넘칩니다! 어두운 바탕 우주색을 칠할 때 끝까지 포기하지 않고 집중력을 발휘해준 우진이 대단해요!",
    tags: ["#상상화", "#우주여행", "#아크릴화"],
    likes: 19,
    comments: [
      { id: 1, name: "우진 엄마", date: "2026.07.28 18:05", text: "고양이 표정이 너무 귀여워요~ 주미 선생님 꼼꼼한 지도 감사해요!" }
    ]
  },
  {
    id: "art-3",
    studentId: "s1",
    title: "돌고래가 도약하는 붉은 노을 바다",
    date: "2026.07.14",
    category: "오일파스텔",
    imageUrl: "/images/artwork_city_sunset.jpg",
    materials: "오일파스텔, 블렌딩 휴지, 페인팅 나이프",
    teacherName: "신연정 원장님",
    teacherAvatar: "👩‍🎨",
    feedback: "오일파스텔을 손가락과 휴지로 부드럽게 문질러 핑크와 보라 그라데이션을 다채롭게 만든 기법이 멋져요! 나이프로 파도의 흰 거품을 긁어낸 우진이의 표현력이 훌륭합니다.",
    tags: ["#오일파스텔", "#노을풍경", "#그라데이션"],
    likes: 22,
    comments: []
  },
  {
    id: "art-4",
    studentId: "s2",
    title: "신나는 미소 짓는 초록 공룡 친구",
    date: "2026.08.02",
    category: "조소/만들기",
    imageUrl: "/images/artwork_clay_dino.jpg",
    materials: "천사점토, 아크릴 물감, 오르골 받침대",
    teacherName: "주미 선생님",
    teacherAvatar: "🎨",
    feedback: "우리 시우가 공룡의 등가시와 눈동자를 혼자 힘으로 꼼꼼하게 빚어 완성했어요! 입체에 대한 공간 감각과 손끝 성형력이 7세 수준 이상으로 아주 뛰어납니다!",
    tags: ["#클레이아트", "#입체조형", "#7세창의반"],
    likes: 11,
    comments: [
      { id: 1, name: "시우 아빠", date: "2026.08.02 19:40", text: "시우 공룡 너무 멋지다!! 주미 선생님 칭찬에 시우가 너무 좋아해요~" }
    ]
  }
];

export const NOTICES = [
  {
    id: 1,
    title: "[필독] 리더스아트 8월 여름방학 특강 및 원내 전시회 일정 안내",
    date: "2026.08.01",
    tag: "중요",
    category: "행사",
    isRead: false,
    content: `안녕하세요, 리더스아트 미술학원 원장 신연정입니다. 🎨

8월 18일(화)부터 22일(토)까지 우리 아이들이 한 학기 동안 땀 흘려 완성한 결실을 모아 '리더스아트 꼬마 아티스트 여름 전시회'를 개최합니다.

• 일시: 2026년 8월 18일(화) ~ 8월 22일(토) 매일 14:00~19:00
• 장소: 리더스아트 2층 갤러리 홀 및 3층 실기실
• 담당: 신연정 원장, 주미 선생님
• 안내사항: 
 - 학부모님께서는 편하신 시간에 방문하시어 자유 관람 가능합니다.
 - 아이들의 작품이 도록으로 제작되어 1권씩 무료 증정됩니다.
 - 전시 기간 동안 도슨트(아이들의 직접 작품 설명) 프로그램도 운영되오니 많은 참석 바랍니다!

감사합니다.`,
    views: 45
  },
  {
    id: 2,
    title: "8월 입체 조형 수업 재료 준비 및 수강 안내 (주미 선생님)",
    date: "2026.07.25",
    tag: "안내",
    category: "수업",
    isRead: true,
    content: `안녕하세요. 리더스아트 주미 선생님입니다. 8월 둘째 주부터 진행되는 입체 조형(클레이 및 목공 아티스트) 커리큘럼 안내입니다.

수업에 필요한 천사점토, 목재, 아크릴 페인트 등 모든 재료비는 리더스아트에서 지원되오니 별도 구매하실 필요가 없습니다.

단, 물감이 옷에 묻을 수 있으니 김우진, 배시우 학생 등 개인 미술 앞치마와 팔토시를 8월 10일(월) 수업 전까지 학원에 챙겨 보내주시면 감사하겠습니다.`,
    views: 72
  },
  {
    id: 3,
    title: "광복절(8/15) 법정공휴일 리더스아트 휴원 안내",
    date: "2026.07.20",
    tag: "휴원",
    category: "일정",
    isRead: true,
    content: `8월 15일(토) 광복절은 법정 공휴일로 인해 리더스아트 미술학원 전체 휴원입니다.

해당 토요일 수강생의 보강 수업은 8월 29일(토) 동일한 시간대에 진행될 예정입니다. 일정에 차질이 없으시길 바랍니다.`,
    views: 94
  },
  {
    id: 4,
    title: "🎉 2026 전국 어린이 미술 실기 대회 수상 소식!",
    date: "2026.07.10",
    tag: "소식",
    category: "축하",
    isRead: true,
    content: `기쁜 소식을 전합니다! 🎈
지난 6월 개최된 '제24회 전국 어린이 창의 미술대회'에서 우리 리더스아트 재원생들이 우수상 및 장려상을 수상하였습니다.

- 최우수상: 김우진 (초등 3학년) - 수채화 부문
- 장려상: 배시우 (7세) - 입체 클레이 부문

신연정 원장님과 주미 선생님의 지도로 정성껏 준비해 준 우리 아이들과 늘 응원해주신 학부모님께 감사드립니다!`,
    views: 128
  }
];

export const ATTENDANCE_DATA = {
  s1: {
    summary: {
      totalDays: 12,
      presentDays: 10,
      lateDays: 1,
      absentDays: 0,
      makeupDays: 1,
      attendanceRate: 92
    },
    days: {
      "2026-08-03": { status: "present", timeIn: "15:28", timeOut: "17:02", memo: "우진 정시 등원 / 신연정 원장님 수채화 스케치 지도" },
      "2026-08-05": { status: "present", timeIn: "15:30", timeOut: "17:00", memo: "수채화 채색 및 명암 수업 완료 (주미 선생님)" },
      "2026-08-07": { status: "late", timeIn: "15:48", timeOut: "17:15", memo: "학교 행사로 18분 지각 등원 / 연장 실기 진행" },
      "2026-08-10": { status: "present", timeIn: "15:25", timeOut: "17:00", memo: "입체 조형 아티스트 1차 과정" },
      "2026-08-12": { status: "present", timeIn: "15:30", timeOut: "17:05", memo: "클레이 성형 완성 (신연정 원장님 피드백)" },
      "2026-08-14": { status: "makeup", timeIn: "14:00", timeOut: "15:30", memo: "광복절 사전 보강 수업 진행" },
      "2026-08-17": { status: "present", timeIn: "15:29", timeOut: "17:00", memo: "전시회 작품 캡션 및 설명지 작성" },
      "2026-08-19": { status: "present", timeIn: "15:31", timeOut: "17:00", memo: "전시 작품 액자 디스플레이" },
      "2026-08-21": { status: "present", timeIn: "15:30", timeOut: "17:00", memo: "자유 크로키 및 표현 기법 연습" },
      "2026-08-24": { status: "present", timeIn: "15:28", timeOut: "17:00", memo: "9월 신규 주제 브레인스토밍" }
    }
  },
  s2: {
    summary: {
      totalDays: 8,
      presentDays: 7,
      lateDays: 0,
      absentDays: 0,
      makeupDays: 1,
      attendanceRate: 100
    },
    days: {
      "2026-08-04": { status: "present", timeIn: "16:00", timeOut: "17:20", memo: "시우 정시 등원 / 주미 선생님 손도장 물감놀이" },
      "2026-08-06": { status: "present", timeIn: "15:58", timeOut: "17:25", memo: "공룡 클레이 반죽 빚기 지도" },
      "2026-08-11": { status: "present", timeIn: "16:02", timeOut: "17:30", memo: "아크릴 물감 공룡 채색 완성" },
      "2026-08-13": { status: "present", timeIn: "16:00", timeOut: "17:20", memo: "동화책 읽고 그리기 (신연정 원장님 지도)" },
      "2026-08-18": { status: "makeup", timeIn: "15:00", timeOut: "16:20", memo: "리더스아트 전시회 체험 세션 참여" }
    }
  }
};

export const SCHEDULE_DATA = {
  monthlyTheme: {
    title: "리더스아트 8월 실기 테마 🎨",
    subtitle: "감성 스토리가 있는 입체 조형 & 명화 오마주 (신연정 원장 / 주미 선생님)",
    description: "다양한 질감의 오일파스텔, 수채화, 천사점토를 활용하여 김우진, 배시우 학생 등 우리 아이만의 동화 속 한 장면을 입체 캔버스에 구현해보는 창의적인 달입니다.",
    tags: ["#수채화기법", "#입체클레이", "#명화오마주", "#리더스아트전시회"]
  },
  events: [
    {
      id: 1,
      date: "2026.08.01",
      day: "금",
      title: "8월 리더스아트 수강료 / 원비 납부 안내",
      category: "원비안내",
      color: "bg-amber-100 text-amber-800 border-amber-300",
      description: "매월 1일~5일은 이달의 수강료 납부 기간입니다. 모바일 앱 또는 원내 결제 가능합니다.",
      dDay: "D-6"
    },
    {
      id: 2,
      date: "2026.08.07",
      day: "금",
      title: "여름맞이 클레이 입체 특강 (주미 선생님)",
      category: "특강수업",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "천사점토와 아크릴 페인트를 이용한 입체 오르골 공룡/동물 제작 수업",
      dDay: "오늘"
    },
    {
      id: 3,
      date: "2026.08.15",
      day: "토",
      title: "광복절 (리더스아트 공식 휴원일)",
      category: "휴원",
      color: "bg-rose-100 text-rose-800 border-rose-300",
      description: "법정 공휴일로 수업이 진행되지 않으며, 8월 29일(토) 보강이 실시됩니다.",
      dDay: "D+8"
    },
    {
      id: 4,
      date: "2026.08.18 - 08.22",
      day: "화-토",
      title: "🏆 리더스아트 꼬마 아티스트 여름 작품 전시회",
      category: "학원행사",
      color: "bg-purple-100 text-purple-800 border-purple-300",
      description: "학원 2층 갤러리홀 / 학부모님 관람 가능 (14:00~19:00), 신연정 원장님 상담 가능",
      dDay: "D+11"
    },
    {
      id: 5,
      date: "2026.08.25",
      day: "화",
      title: "9월 학기 수강 신청 및 신연정 원장님 1:1 상담주간",
      category: "상담",
      color: "bg-sky-100 text-sky-800 border-sky-300",
      description: "김우진, 배시우 학생 관찰 기록지 전달 및 2학기 진도 상담 진행",
      dDay: "D+18"
    }
  ]
};
