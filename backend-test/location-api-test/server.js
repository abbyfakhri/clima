const http =  require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const PORT = process.env.PORT || 3000;



const server = http.createServer((req,res)=>{
    console.log('\n',req.method,'=>',req.url);
    console.log('----------------------------');


    // to log the request and response
    fs.appendFile(path.join(__dirname,'log.txt'),'\n'+req.method+'=>'+req.url,(err) =>{
        if (err) throw err;
    })
    
   let extension = path.extname(req.url);
   //let basename = path.basename(req.url);

    let contentType;

    // to add content type
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
        default:
            contentType = 'text/html';
            break;
    }

    // biar ngga perlu pake extension lagi
    if(!extension && req.url.slice(-1) !== '/'){
        req.url += '.html';
    }



    let filePath;

    if (fs.existsSync(path.join(__dirname,req.url)) === false){ // check if file exist or not
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname,'notFound.html');
        fs.readFile(filePath,(err,data) =>{
            res.end(data);
        });
    }
    
    else{
        
        if(req.url === '/'){
            res.statusCode = 200;
            res.setHeader('Content-Type',contentType);
            filePath = path.join(__dirname,'index.html');
            fs.readFile(filePath,(err,data)=>{
    
                res.end(data);
            
            });
        }
        else{
            
            res.statusCode = 200;
            res.setHeader('Content-Type',contentType);
            filePath = path.join(__dirname,req.url);
            fs.readFile(filePath,(err,data)=>{
        
                res.end(data);
            
            });
        }

    }

    
        
    
    

});

server.listen(PORT,()=> console.log('server running on port', PORT));
console.log('---------------------------');






