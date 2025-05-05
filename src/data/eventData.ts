export interface EventData {
  id: number;
  title: string;
  publishDate: string;
  author: string;
  price: number;
  status: "open" | "closed";
  thumbnail?: string;
  participationCount: number;
  maxParticipants: number;
}

export const eventData: EventData[] = [
  {
    id: 1,
    title: "[모집] 신선한 해산물로 만드는 해물 파스타",
    publishDate: "2025-05-15",
    author: "오션뷰 키친",
    price: 25000,
    status: "open" as const,
    participationCount: 3,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    title: "[모집] 프렌치 쉐프의 가정식 요리 클래스",
    publishDate: "2025-05-20",
    author: "르 마농",
    price: 35000,
    status: "open" as const,
    participationCount: 2,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    title: "[모집] 제철 과일을 이용한 타르트 디저트",
    publishDate: "2025-05-10",
    author: "달콤 베이커리",
    price: 18000,
    status: "open" as const,
    participationCount: 4,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  },
  {
    id: 4,
    title: "[모집] 한강뷰 루프탑 BBQ 가오픈 파티",
    publishDate: "2025-06-01",
    author: "스카이 그릴",
    price: 45000,
    status: "open" as const,
    participationCount: 3,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
  },
  {
    id: 5,
    title: "[모집] 로컬 농장 식자재로 만드는 브런치",
    publishDate: "2025-05-12",
    author: "팜투테이블",
    price: 22000,
    status: "open" as const,
    participationCount: 5,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1513442542250-854d436a73f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 6,
    title: "[마감] 베트남 쉐프의 진정한 쌀국수",
    publishDate: "2025-05-02",
    author: "사이공 부엌",
    price: 20000,
    status: "closed" as const,
    participationCount: 5,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 7,
    title: "[마감] 수제 햄버거 팝업 스토어",
    publishDate: "2025-04-28",
    author: "버거 마스터",
    price: 16000,
    status: "closed" as const,
    participationCount: 5,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
  },
  {
    id: 8,
    title: "[마감] 계절 코스 요리 시식회",
    publishDate: "2025-04-20",
    author: "사계절 다이닝",
    price: 50000,
    status: "closed" as const,
    participationCount: 5,
    maxParticipants: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];
