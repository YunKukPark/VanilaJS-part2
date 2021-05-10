// CONSTANT 선언부
const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')

const brush = document.querySelector('.ic-brush')
const paint = document.querySelector('.ic-paint')

const INITIAL_COLOR = '#2e2e2e'
const CANVAS_SIZE = 700

// Variable 선언부
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

// #1. Context 의 default 값 설정
ctx.strokeStyle = '#2e2e2e'
ctx.fillStyle = ''
ctx.lineWidth = 2.5

brush.style.color = INITIAL_COLOR
paint.style.color = INITIAL_COLOR

// #2. painting, filling boolean 선언
let painting = false
let filling = false

function startPainting() {
  painting = true
}

function stopPainting() {
  painting = false
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
  brush.style.color = color
  paint.style.color = color
}

function handleRangeChange(event) {
  const strokeWidth = event.target.value
  ctx.lineWidth = strokeWidth
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
    canvas.style.cursor = 'pointer'
    brush.style.display = 'block'
    paint.style.display = 'none'
  } else {
    filling = true
    mode.innerText = 'Paint'
    canvas.style.cursor = 'copy'
    brush.style.display = 'none'
    paint.style.display = 'block'
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }
}

// EventListenr

// #1. Canvas
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvasClick)
}

// #2. Color-picker
Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
)

// #3. Range input
if (range) {
  range.addEventListener('input', handleRangeChange)
}

// #4. Fill - Paint button Mode
if (mode) {
  mode.addEventListener('click', handleModeClick)
}
