const http = require('http');
const { readFile } = require('fs');

// const errorMsg = (
//   `
//   <h1>Oops!</h1>
//   <p>We can't seem to find the page you are looking for</p>
//   <a href="/">back home</a>
//   `
// );

// // create a custom promise
// const readFilePromise = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf-8', (error, data) => {
//       if (error) reject(error)
//       else resolve(data)
//     })
//   })
// };

// const startLoad = async (res, filePath) => {
//   try {
//     const data = await readFile(filePath, 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(data);
//   } catch (error) {
//     console.log(error);
//     const data = await readFile('./404.html', 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(data);
//   }
// };

const server = http.createServer((req, res) => {

  const filePath = (req.url === '/' ? './index.html' : `.${req.url}.html`);

  // //using one liner async await func
  // startLoad(res, filePath);

  //using a callback function
  readFile(filePath, (error, data) => {
    if (error) {
      if (error.code == "ENOENT") {
        readFile('./404.html', 'utf-8', (error, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content);
          })
      }
      res.writeHead(500);
      res.end(`Server Error: ${error.code}`);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });

  // //using a custom promise
  // readFilePromise(filePath)
  //   .then(data => {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     return res.end(data)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.end(errorMsg)
  //   });

  // // using a promise from fs promises
  // readFile(filePath, 'utf-8')
  //   .then(data => {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.end(errorMsg)
  //   });
})

server.listen(5000)