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

> 마우스가 캔버스에서 클릭되었을 때도 이벤트로 만들어주어야함. -> 이걸로 그림 그러야하니까

5.  `let painting = false` 선언
6.  `canvas.addEventListener('mousedown', onMouseDown)` 생성
7.  onMouseDown function 생성

```javascript
function onMouseDown(event) {
  painting = true
}
```

<br/>

> 유효성 검사 및 예외 처리 (Stop Painting 을 외칠 자리를 찾아라.)

8. stopPainting Function 만들기

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

## 2.1 2D Context

> MDN 을 통해 Canvas 를 배우고, 어떤걸 할 수 있는 지 확인하자.

### 1. Context

Context 란, Canvas 요소 안에 graphic 을 렌더링 하는데 사용 할 수 있는 속성과 메소드가 있는 객체이다.  
Context 는 2D 나 3D 가 될 수 있다.

#### Context 의 내장 객체

| Name                              | Category  | Desc                                                                  |
| --------------------------------- | --------- | --------------------------------------------------------------------- |
| `fillRect(x, y, width, height)`   | Draw Rect | 색칠된 직사각형 그림                                                  |
| `strokeRect(x, y, width, height)` | Draw Rect | 직사각형 윤곽선 그림                                                  |
| `clearRect(x, y, width, height)`  | Draw Rect | 특정 부분을 지움. 지운부분은 투명                                     |
| `beginPath()`                     | Draw Path | 신규 경로 생성                                                        |
| `closePath()`                     | Draw Path | 현재 하위 경로의 시작 부분과 연결된 직선 추가                         |
| `stroke()`                        | Draw Path | 윤곽선을 이용하여 도형을 그림                                         |
| `fill()`                          | Draw Path | 경로 내부를 채워서 내부가 채워진 도형을 그림                          |
| `fillStyle`                       | color     | `ctx.fillStyle = #2e2e2e` => 도형을 채우는 색 설정                    |
| `strokeStyle`                     | color     | `ctx.strokeStyle = #2e2e2e` => 도형 윤곽선 색 설정                    |
| `lineWidth`                       | line      | `ctx.lineWidth = 2.5` => 그려질 선의 두께 설정                        |
| `lineCap`                         | line      | `ctx.lineCap = butt, round` => 그려질 선의 끝모양 설정 (기본, 둥글게) |

<br/>

1. Context 변수 생성

```javascript
const ctx = canvas.getContext('2d')
```

2. Context 의 Default 값 설정
   > strokeStyle 은 우리가 지정한 primary black `#2e2e2e`로 설정 <br/>
   > lineWidth 는 2.5 (0~5 까지 지정해놨으므로, 중간값)

```javascript
ctx.strokeStyle = '#2e2e2e'
ctx.lineWidth = 2.5
```

3. Refactor Code
   > `mouseup, mouseleave` 때에는 그때만을 위한 stopPainting 만 호출하면 되므로 다음과 같이 Refatoring

```javascript
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
}
```

4. startPainting 함수 생성

```javascript
function startPainting() {
  painting = true
}
```

5. `onMouseMove` Function 에 `ctx`라인 그리는 명령 선언

```javascript
function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke() // 실제로 Drawing path 를 해주는 녀석.
  }
}
```

> 그런데 Draw 가 실제로 되지 않고 있는데 왜인가요?
>
> > Canvas 에 사이즈를 안 줘서 그런것 같아요...  
> > Canvas Element 는 두개의 size 를 가져야 하는데, CSS size 와 pixel modifier size 가 있다.  
> > 현재 상태는 CSS size 만 준 상태이다.

**bug Fix**

> 변수 선언 부분에 다음과 같이 추가  
> pixel modifier (Canvas) 에 사이즈 명시

```javascript
canvas.width = 700
canvas.height = 700
```
