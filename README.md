# 블로그에 백엔드를 넣기위한 욕망의 레포

### 블로그에 백엔드를 넣으면 쩔겟다라는 단순한 생각에서 시작된 스불재 입니다

### 참고자료

[✨ 블로그만들기](https://www.mongodb.com/developer/languages/javascript/gatsby-modern-blog/)

### 진행 상황

1. 몽고 아틀라스에 데이터 추가완료
2. 몽고 아틀라스 -갯츠비 연결완료
3. 현재 데이터를 프론트로 보여주는 것(완료)

### 시행착오

### 🌈 몽고디비 설치 부터 시작된 우당탕탕

튜토리얼과 최대한 비슷하게 진행해 주고 싶어서, 일단은 몽고디비 아틀라스를 이용해 주었는데 이과정에서 문제가 발생했었다.

🙃 첫번째 : 이 사람은 몽고디비를 깔지 않았다
🙃 두번째 : 깔더라도, 이후로 이걸 어떻게 이용해주어야하는지 당연히 문서에는 없었다

설치 과정에서 data 폴더를 만들지 않아서 실행도 안되었고, 설치하고 보니 다들 이야기하는 `mongo.exe` 가 없었다. 확인 해 보니 지금 사용하는 버전에는 `mongosh` 를 사용해 줘야한다! 라는게 있어서 우당탕탕 진행해주게 되었다. 설치 후에는 다행히 커멘드라인이 적혀있어서 무사히 디비를 내가 볼수 있음! 정도의 첫단계가 마무리 되었다.

### 🌈 그런데 그거아시나요 데이터도 넣어주셔야해요

그렇습니다, 튜토리얼에서는 데이터가 500개정도라는데 그걸 일일이 넣어야하나? 설마 했는데 다행히 `mongoimport` 라는 친구덕분에 일단 무사히 해결되었습니다. 그런데 문제는 그것을 실행하는 과정에서도 엄청난 ... 시행착오를 겪었습니다.

1.  혹시 `mongoimport`를 이용 방법이 튜토리얼이나 블로그 자료에 있었나요?

너무 슬프게도 참고용 블로그는 .. 그냥 임포트하면 된다라는 말만있어서, 일단 일일이 찾아보게 되었습니다. 그런데 하면서 앗 했던건 **나는 커멘드라인을 모르지** 였습니다..네.. 어쩔수 없었습니다 일단해보고 싶어서 지른거라, 몽고디비 커멘드라인을 검색하며 다녔습니다. 그런데 그런말아시나요 찾으려하면 안보인다고? 그렇습니다 아틀라스 디비 확인하는 페이지에 커멘트라인툴이 존재하는 것이었습니다

2. 무사히 데이터를 넣다

다행히 데이터를 넣을 수 있었습니다. ㅠㅠ 올려놓은 데이터를 별개의 `json` 으로 받아서

```shell
mongoimport --uri mongodb+srv://<유저명>:<PASSWORD><클러스터주소>/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
```

위의 커멘드라인을 이용해 주었습니다 그런데 아마 파일이 있는 폴더에서 진행을 해준것 같습니다. 그래서 진짜 호들갑을떨며 어케저케 데이터를 올려주고 이제는 갯츠비를 연결해 보았습니다

### 🌈 갯츠비 설정을 못하겠어요 살려주세요

그렇습니다 갯츠비 설정을 블로그글대로 해보았으나 안되었습니다. 그래서 일단은 이리저리 글을 찾아보았는데 안되더라구요^^... 그래서 이슈페이지나 갯츠비 공식 페이지 까지 봤는데 넘 슬프게 블로그 글안에 답이 있더라고요..ㅋㅋㅋㅋ  
읽어보면서 한번 조금씩 조금씩 변경을하면서 어디에서 에러가 터질까 하면서 확인해주었는데, 알고보니.. 제가 `env` 파일을 잘못사용해 주었던 것입니다..

[🙃 보고나서 비명지른 갯츠비 문서](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/)

계속해서 읽혀오지도 못하니 당연히 연결이 안되었던 것입니다.. 그래서 일단 수정을 해주고 아래과 같이 사용해주니 해결이 되었습니다

```JavaScript
 {
      resolve: "gatsby-source-mongodb",
      options: {
        dbName: "gatsby",
        collection: "books",
        server: {
          address: process.env.GATSBY_MONGO_ADDRESS,
          port: 27017,
        },
        auth: {
          user: process.env.GATSBY_MONGO_USER,
          password: process.env.GATSBY_MONGO_PASSWORD,
        },
        extraParams: {
          ssl: true,
          authSource: "admin",
          retryWrites: true,
        },
      },
    },

```

그런데 여전히 ` extraParams` 이 부분은 좀 물음표 상태이지만 일단 연결이 되었다는거에 만족하기로 했습니다.

🙃 그리고 그다음날 다시 에러가 발생한거 아시나요 ㅋㅋㅋㅋㅋ... 웃긴건 디비 주소를 바꾸니 되어서 조금 당황스러웠습니다 ㅠㅠ

### 🌈 데이터를 사용하기

다행히 데이터를 사용하는 부분은 갯츠비나 그래프큐엘을 정말 얼레벌레 사용해 보아서 쿼리는 괜찮았으나, 이후에 노드부분을 수정하는게 조금 새로운 부분이 있어서 그부분은 정말로 그냥 따라하기만 했다는데에 가까운것 같습니다 그래서 노드 수정이나 그래프큐엘 부분을 좀더 공부하고 싶다는 생각이 들었습니다😀
