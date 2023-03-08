Entity Relationship Diagram

```txt

하루들의 집합

하루 {
  할일들...
}

할일 == 읽어야할것(toRead)

```

# 요구사항
### 기획팀의 요구사항과 일치하는지 소통할 때 유용하게 사용할 수 있다.
### 요구사항은 설계를 시작할 때 정의하고 다른팀에게 공유하고 피드백을 받아야한다.
### 요구사항은 개발용어 없이도 읽을 수 있어야한다.
### 요구사항 항목이 곧 테스트 코드와 연결된다.

- 성경책을 어떻게 읽을지 Plan 을 세우고 보여주는 것
- Plan 은 각 날짜(Date)마다 매일매일 무얼 읽을지(toRead) 를 알려줘야 한다.
- 무얼 읽을지는(toRead) 는 무슨 책(Book), 무슨 장(Chapter), 무슨 절(Verse) 로 알 수 있다.
- toRead 에서 읽어야할게(checkItem) 여러개 있고, 이를 체크할 수 있어야한다.



# AS-IS

```txt
Plan

Task: [
  toRead...
]	

toRead {
  toRead_id,
  Book,
  Chapter,
  Verse,
  Content
}
```

# TO-BE

- <key, value>
- 개념 := definition

```txt

Plan := <Date, toRead>

toRead := checkItem[]

checkItem := { Book, Chapter, Verse[], isChecked }

HolyDictionary := <Book, <Chapter, <Verse, Content>>>
```

```js
{
  Plan: {
    "1월1일": [
          {
             isChecked: true,
             Book: "마태복음",
             Chapter: 1,
             Verses: [1,2,3,4,5]
          },
          // ...
        ]
     // ...
  }
}
```

```js
{
  HolyDictionary: {
   "마태복음": {
       1: {
          1: "Content", 
          // ...
       }, 
       // ...
    }, 
    // ...
  }
```


# Sample (Before)
```json
{
    "daysOfMccheyne": [
        {
            "1-1": [
                {
                    "id": 1,
                    "book": "창세기",
                    "verse": "1 : 1",
                    "content": "태초에 하나님이 천지를 창조하시니라"
                },
                {
                    "id": 1,
                    "book": "창세기",
                    "verse": "1 : 2",
                    "content": "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 신은 수면에 운행하시니라"
                },
                {
                    "id": 2,
                    "book": "마태복음",
                    "verse": "1 : 1",
                    "content": "아브라함과 다윗의 자손 예수 그리스도의 세계라"
                },
                {
                    "id": 2,
                    "book": "마태복음",
                    "verse": "1 : 2",
                    "content": "아브라함이 이삭을 낳고 이삭은 야곱을 낳고 야곱은 유다와 그의 형제를 낳고"
                }
            ],
            "1-2": [
                {
                    "id": 1,
                    "book": "창세기",
                    "verse": "2 : 1",
                    "content": "천지와 만물이 다 이루니라"
                },
                {
                    "id": 1,
                    "book": "창세기",
                    "verse": "2 : 2",
                    "content": "하나님의 지으시던 일이 일곱째 날이 이를 때에 마치니 그 지으시던 일이 다하므로 일곱째 날에 안식하시니라"
                },
                {
                    "id": 2,
                    "book": "마태복음",
                    "verse": "2 : 1",
                    "content": "헤롯 왕 때에 예수께서 유대 베들레헴에서 나시매 동방으로부터 박사들이 예루살렘에 이르러 말하되"
                },
                {
                    "id": 2,
                    "book": "마태복음",
                    "verse": "2 : 2",
                    "content": "유대인의 왕으로 나신 이가 어디 계시뇨 우리가 동방에서 그의 별을 보고 그에게 경배하러 왔노라 하니"
                }
            ]
        }
    ]
}
```


# Sample (After)

```json
{
    "plan": {
        "1-1": [
            {
                "isChecked": false,
                "book": "창세기",
                "chapter": 1,
                "verses": [
                    {
                        "verse": 1,
                        "content": "태초에 하나님이 천지를 창조하시니라"
                    },
                    {
                        "verse": 2,
                        "content": "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 신은 수면에 운행하시니라"
                    },
                    {
                        "verse": 3,
                        "content": "하나님이 가라사대 빛이 있으라 하시매 빛이 있었고"
                    }
                ]
            },
            {
                "isChecked": false,
                "book": "마태복음",
                "chapter": 1,
                "verses": [
                    {
                        "verse": 1,
                        "content": "아브라함과 다윗의 자손 예수 그리스도의 세계라"
                    },
                    {
                        "verse": 2,
                        "content": "아브라함이 이삭을 낳고 이삭은 야곱을 낳고 야곱은 유다와 그의 형제를 낳고"
                    },
                    {
                        "verse": 3,
                        "content": "유다는 다말에게서 베레스와 세라를 낳고 베레스는 헤스론을 낳고 헤스론은 람을 낳고"
                    }
                ]
            }
        ],
        "1-2": [
            {
                "isChecked": false,
                "book": "창세기",
                "chapter": 2,
                "verses": [
                    {
                        "verse": 1,
                        "content": "천지와 만물이 다 이루니라"
                    },
                    {
                        "verse": 2,
                        "content": "하나님의 지으시던 일이 일곱째 날이 이를 때에 마치니 그 지으시던 일이 다하므로 일곱째 날에 안식하시니라"
                    },
                    {
                        "verse": 3,
                        "content": "하나님이 일곱째 날을 복 주사 거룩하게 하셨으니 이는 하나님이 그 창조하시며 만드시던 모든 일을 마치시고 이 날에 안식하셨음이더라"
                    }
                ]
            },
            {
                "isChecked": false,
                "book": "마태복음",
                "chapter": 2,
                "verses": [
                    {
                        "verse": 1,
                        "content": "헤롯 왕 때에 예수께서 유대 베들레헴에서 나시매 동방으로부터 박사들이 예루살렘에 이르러 말하되"
                    },
                    {
                        "verse": 2,
                        "content": "유대인의 왕으로 나신 이가 어디 계시뇨 우리가 동방에서 그의 별을 보고 그에게 경배하러 왔노라 하니"
                    },
                    {
                        "verse": 3,
                        "content": "헤롯 왕과 온 예루살렘이 듣고 소동한지라"
                    }
                ]
            }
        ]
    }
}
```

```kotlin
// To parse the JSON, install kotlin's serialization plugin and do:
//
// val json    = Json(JsonConfiguration.Stable)
// val welcome = json.parse(Welcome.serializer(), jsonString)

package quicktype

import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*

@Serializable
data class Plan (
    val plan: Map<String, List<CheckItem>>
)

@Serializable
data class CheckItem (
    val isChecked: Boolean,
    val book: String,
    val chapter: Long,
    val verses: List<Verse>
)

@Serializable
data class Verse (
    val verse: Long,
    val content: String
)
```
