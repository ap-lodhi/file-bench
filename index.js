
const http =require('http')
const fs =require('fs')
const {open} = require('fs/promises')

const port  =process.env.PORT|| 3000;

const server =http.createServer((req,res)=>{
    console.log(req.url)
    let ans =""
    res.statusCode =200;
    if(req.url == '/'){
        ans ='<h1> hi...<h1>'
        res.end(ans)
    }
    else if (req.url === '/textsync') {
        const data = fs.readFileSync('file.txt')
        
       ans = data;
        res.end(ans)
    }
    else if (req.url === '/textasync') {
         fs.readFile('file.txt', (err, data) => {
          
            ans= data
            res.end(ans)
        })
    }
    else if (req.url === '/textstream') {
        var data =''
        var reader = fs.createReadStream('file.txt')
        reader.setEncoding('UTF8');
        reader.on('data', function(chunk) {
            data += chunk;
         });
         
         reader.on('end',function() {
          ans = data;
            res.end(ans)
         });
         
         reader.on('error', function(err) {
            console.log(err.stack);
         });
         
    }
    else if (req.url === '/textpromise') {
      
        (async function() {
            try {
               ans = await open('file.txt');
                res.end(ans)
              } finally {
                await filehandle?.close();
              }
          })
   }
   
})
server.listen(port, () => {
    console.log(`server is listining on ${port}`)
})