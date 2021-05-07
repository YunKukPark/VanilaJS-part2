# VanilaJS-part2

> Vanila Javascript Part2 With Nico

바닐라 JS로 그림판 만들기

## 1.0 - 1.2 Project Setup

> 기본 HTML 과 CSS 셋업

### 1. HTML

1. Canvas 생성
2. Controler 생성 (range, buttons, color-picker 모음)
3. Color-picker 모듈 생성
4. Fill, Save 버튼 모듈 생성
5. input -> range 모듈 생성

### 2. CSS

1. **body** 는 `100vh` 로 관리
2. **왠만한 정렬**은 모두 `flex` 로 처리
3. **button** 과 **color-picker** 들은 `transition` 을 주어 스르륵 `hover` 되었다는걸 알림.

:+1:

## 2.0 Canvas Events

> 무엇을 만드려는가?
>
> > **Canvas 위에 mouse 가 올려졌을 때 그걸 인지하게끔 할 것이다.**

1. app.js 에 canvas 불러오기

```javascript
const canvas = document.getElementById('jsCanvas')
```

2. canvas에 mousemove 이벤트 심기

```javascript
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
}
```

<br/>

> addEventListener 에서 자주 쓰이는 이벤트 목록

| Name of Event | Desc                                     |
| ------------- | ---------------------------------------- |
| change        | 변동이 있을 때 발생                      |
| click         | 클릭 시 발생                             |
| focus         | 포커스를 얻었을 때 발생                  |
| keydown       | 키를 눌렀을 때 발생                      |
| load          | 로드가 완료 되었을 때 발생               |
| mousedown     | 마우스를 클릭했을 때 발생                |
| mouseout      | 마우스가 특정 객체 밖으로 나갔을 때 발생 |
| mouseover     | 마우스가 특정 객체 위로 올려졌을 때 발생 |
| mousemove     | 마우스가 움직였을 때 발생                |
| mouseup       | 마우스에서 손을 땟을 때 발생             |
| select        | option 태그 등에서 선택을 했을 때 발생   |

<br/>

> 사용법
>
> > EventListener 에서는 해당 이벤트가 일어났을때, 함수를 호출한다.

```javascript
const target = document.getElementById('target')
target.addEventListener('이벤트종류', 함수이름)
```

<br/>

3. 제대로 잘 작동 하는지 console.log 찍는 함수 만들기

```javascript
function onMouseMove(event) {
  console.log(event)
}
```

<br/>
4. 우리에게는 canvas의 `offsetX,offsetY` 정보가 필요하다.
   -> 함수안에 변수로 정의

```javascript
function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
}
```

<br/>

> 마우스가 캔버스에서 클릭되었을 때도 이벤트로 만들어주어야함. -> 이걸로 그림 그러야하니까 5. `let painting = false` 선언 6. `canvas.addEventListener('mousedown', onMouseDown)` 생성 7. onMouseDown function 생성

```javascript
function onMouseDown(event) {
  painting = true
}
```

<br/>

> 유효성 검사 및 예외 처리 (Stop Painting 을 외칠 자리를 찾아라.)  
> 8. stopPainting Function 만들기

```javascript
function stopPainting() {
  painting = false
}
```

> 언제가 StopPainting 을 외쳐야 하나요?

1. Mouseup 되었을 때
2. mouse 가 canvas를 벗어났을 때 -> `mouseleave`

```javascript
function onMouseUp(event) {
  stopPainting()
}

// mouseleave 는 EventListener 단에서 처리
canvas.addEventListener('mouseleave', stopPainting)
```

<br/>

> 여기까지 통합 javascript 소스코드

```javascript
const canvas = document.getElementById('jsCanvas')

let painting = false

function stopPainting() {
  painting = false
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
}

function onMouseDown(event) {
  painting = true
}

function onMouseUp(event) {
  stopPainting()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', stopPainting)
}
```
