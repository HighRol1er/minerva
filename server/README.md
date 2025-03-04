**TODO LIST**

- gateway 네이밍
- gatwway 이벤트 설계
- 받은 메세지를 어디서 client로 emit 할건지도 정해야됨

**3/3TODO LIST**

- 지금 type이 src/type으로 전역적으로 관리 되고 있는데 이 부분을 각 모듈 폴더에 type을 만들어서 사용하는걸로 변경해야 함 (해결)

**3/4 TODO LIST**

- Docker 이미지 만들어봐야겠음 dev용으로 서버 키기 너무 귀찮다 redis-cli 켜야지 redis 켜야지, db켜야지 넘 귀찮..
- newlist / delist 되는 코인 심볼을 DB에서는 삭제시켜주긴하는데 Redis에서도 삭제 시켜줘야 할듯 (TTL 설정으로 하면 될 듯 )
  client에서도 해야될꺼같고 market-stream에서도 해야될꺼같고 쉽지 않네.
