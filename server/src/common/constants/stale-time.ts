// 임시로 하루부터 한시간까지 만들어놨음
// market-stream에서 사용되는 데이터 TTL인데
// 아직 운영단계가 아니라서 일단 만들어 둠
export const STALE_TIME = {
  ONE_DAY: 24 * 60 * 60 * 1000, // 24시간
  HALF_DAY: 12 * 60 * 60 * 1000, // 12시간
  QUARTER_DAY: 6 * 60 * 60 * 1000, // 6시간
  ONE_HOUR: 60 * 60 * 1000,
} as const;
