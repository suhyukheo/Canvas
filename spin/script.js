window.onload = () =>{

  const canvas =document.querySelector('#canvas1')
  const ctx = canvas.getContext('2d')
  let ploygon1 = null
  canvas.width = document.body.clientWidth * window.devicePixelRatio
  canvas.height =document.body.clientHeight * window.devicePixelRatio

  window.addEventListener('resize',()=>{
    canvas.width = document.body.clientWidth * window.devicePixelRatio
    canvas.height =document.body.clientHeight * window.devicePixelRatio
    console.log(canvas.width)
    ploygon1 = new Polygon(canvas.width/2 ,canvas.height/2 ,canvas.width/3,5)
  })

  document.querySelector('#btn').addEventListener('click',()=>{
    let user = Number(document.querySelector('#user_input').value)
    if(user != NaN && user>=3){
      ploygon1 = new Polygon(canvas.width/2 ,canvas.height/2 ,canvas.height/3,user)
    }
    else{
      alert('input_value > 3')
    }
    
  })
  //내일 할꺼 포인터 다운일때 값을 저장하고 무브된 만큼 빼기
  canvas.addEventListener('pointerdown', (e) =>{
    point.on=true
    point.start = e.x
  },false)
  
  canvas.addEventListener('pointermove',function(e){ //mouse이벤트와 touch이벤트를 동시에.. !!
    if(point.on === true){
      point.x=((e.x-point.start)/100)
    } 
  },false)

  canvas.addEventListener('pointerup' , (e)=>{
    point.on =false
  },false)


  function point() {
    start = null
    on =false
    x=0
    y= null
  }



  class Polygon{
    constructor(x,y,radius,sides){
      this.x = x 
      this.y = y
      this.radius = radius
      this.sides = sides
      this.rotate = 0
    }
    draw(){
    ctx.save()
    ctx.fillStyle='black'
    ctx.beginPath()
    const angle =Math.PI*2 / this.sides
    ctx.translate(this.x,this.y)
    ctx.rotate(point.x)
    this.rotate = point.x 
    //rotate는 현재 canvas의 0,0을 기준으로 맞춰서 돌려주는데 위에서 translate를 통해 canvas의 정 가운데를 새로운 0,0 점으로 잡았다
    // 그렇기 때문에 translate 위에서 rotate를 쓸경우 

    for(let i=0 ; i<this.sides ; i++){
      const a = this.radius*Math.cos((angle*i))
      const b = this.radius*Math.sin((angle*i))
      if(i==0){ctx.moveTo(a,b)}
      else if(i>=1){ctx.lineTo(a,b)} 
    }
    ctx.fill()
    ctx.closePath()
    ctx.restore()
    }
  }

  ploygon1 = new Polygon(canvas.width/2 ,canvas.height/2 ,canvas.height/3,5)

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ploygon1.draw()
    requestAnimationFrame(animate)
  }

  animate()
}
