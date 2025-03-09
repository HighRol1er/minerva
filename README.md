client : 3010
server : 3000

- 후에 spot 이랑 future/dervatives 추가할 예정

## 거래소 더 추가할 때는 아래 프로세스로 하면 됨

1. exchange.client.ts 작성
2. collector.service 추가
3. market-stream.service 작성

메타마스크를 어떻게 로그인에 쓸지?..
메타마스크를 쓴다면

1. swap 기능, swap을 하면 uniswap, sushi, pancake 이런거
   -> 이런건 한곳에서 바로 가능하게 하면 좋은점 : 따로 비교를 할 필요가 없음
   개굿
2. validation으로 갈꺼면 뭐 그런걸로 할 수 바로 갈 수 있게끔
3. 거래소 레퍼럴,
4. 파생상품 관련해서 alert가 있으면 좋을꺼같긴한데 (돈문제)
5.
