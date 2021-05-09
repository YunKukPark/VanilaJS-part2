const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')

canvas.width = 700
canvas.height = 700

//Context 의 default 값 설정
ctx.strokeStyle = '#2e2e2e'
ctx.lineWidth = 2.5

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
}

function handleRangeChange(event) {
  console.log(event.target.value)
  const strokeWidth = event.target.value
  ctx.lineWidth = strokeWidth
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
    window.setComputedStyle(mode, '::before').content = 'Fill'
  } else {
    filling = true
    mode.innerText = 'Paint'
    window.setComputedStyle(mode, '::before').content = 'Paint'
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
)

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick)
}
