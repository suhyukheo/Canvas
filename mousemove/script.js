
//화면 설정및 캔버스 조지기
const canvas=document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const particlearray=[]
let hue=0

canvas.width = window.innerWidth
canvas.height=window.innerHeight



// 리사이즈시
window.addEventListener('resize',function(){
  canvas.width = window.innerWidth
  canvas.height=window.innerHeight
})

canvas.addEventListener('mousemove',(e)=>{
  mouse.x=e.x
  mouse.y=e.y
  init()

})


  canvas.addEventListener('touchmove',(e)=>{
    mouse.x = e.touches[0].screenX
    mouse.y =e.touches[0].screenY
    init()
  })



 function mouse(){
  x=null
  y=null
 }


// 공 만들기 
class Particle{
  constructor(){
    this.x=mouse.x
    this.y=mouse.y
    this.size=Math.random()*10+1
    this.speedx=Math.random()*3-1.5
    this.speedy=Math.random()*3-1.5
    this.color=`hsl(${hue}, 100%, 50%)`
  }
  update(){
    this.x+=this.speedx
    this.y+=this.speedy
    if(this.size > 0.2)  this.size-= 0.05
  }
  draw(){
    ctx.fillStyle=this.color
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
    ctx.fill()
  }
}


//어레이에 넣어두기
function init(){
  for(let i=0 ; i<3; i++){
    let a=new Particle();
    particlearray.push(a)
  }
}


//어레이어 넣은거 생성하기
function animate(){
  // ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle="rgba(0,0,0,1)"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  hue+=0.55
  for (let i=0;i<particlearray.length;i++){
    particlearray[i].update()
    particlearray[i].draw()
    for(let j=i ; j<particlearray.length ; j++){
      const dx =particlearray[i].x - particlearray[j].x
      const dy =particlearray[i].y - particlearray[j].y
      const diff=Math.sqrt(dx*dx + dy*dy)
      if(diff < 100){
        ctx.beginPath()
        ctx.strokeStyle=particlearray[i].color
        ctx.lineWidth=0.5
        ctx.moveTo(particlearray[i].x,particlearray[i].y)
        ctx.lineTo(particlearray[j].x,particlearray[j].y)
        ctx.stroke() 
        ctx.closePath()
      }
    }
    if(particlearray[i].size <= 0.3){
      particlearray.splice(i,1)
      i--
    }
  }
  requestAnimationFrame(animate)
}

animate()