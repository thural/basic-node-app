const http = require('http');
const { readFile } = require('fs').promises;

// // create load page promise
// const loadPage = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf-8', (error, data) => {
//       if (error) reject(error)
//       else resolve(data)
//     })
//   })
// };

// const startLoad = async (req, res, path) => {
//   try {
//     const data = await loadPage(path);
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(data);
//     return res.end
//   } catch (error) {
//     console.log(error);
//     res.end
//   }
// };

const server = http.createServer((req, res) => {

  // //using a custom promise
  // loadPage(req.url === '/' ? './index.html' : `.${req.url}.html`)
  //   .then(data => {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.write(data);
  //     return res.end
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.end
  //   });

  // startLoad(req, res, (req.url === '/' ? './index.html' : `.${req.url}.html`))


  // using a built in promise from fs promises
  readFile((req.url === '/' ? './index.html' : `.${req.url}.html`), 'utf-8')
    .then(data => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end
    })
    .catch(error => {
      console.log(error);
      res.end
    });

  res.end

  // res.end(`
  //   <h1>Oops!</h1>
  //   <p>We can't seem to find the page you are looking for</p>
  //   <a href="/">back home</a>
  //   `)
})

server.listen(5000)