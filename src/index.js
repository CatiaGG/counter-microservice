import Router from 'router';
import queryString from 'query-string';
import Q from 'q';
import { env } from './helper';

let counter = 0; // Variabile globale per il contatore : volatile

const app = Router({
  mergeParams: true,
});

mimikModule.exports = (context, req, res) => {
  global.context = context;
  counter++; // Incrementa il contatore per ogni richiesta
  app(req, res, (e) => {
    res.end(JSON.stringify({ code: e ? 400 : 404, message: e || 'Not Found' }));
  });
};

// Sample HTTP Request
app.get('/', (req, res) => {
  res.end('Hello World!');
});

// Sample HTTP Request to return the environment variables
app.get('/env', (req, res) => {
  res.end(JSON.stringify(env()));
});

// Sample HTTP Request with Parameters
app.get('/sayHello/:name', (req, res) => {
  res.end(`Hello ${req.params.name}`);
});

// Sample HTTP Request with Query
app.get('/add', (req, res) => {  //esempio: /add?x=3&y=4
  const query = queryString.parse(req._parsedUrl.query);
  res.end(`result is ${Number(query.x) + Number(query.y)}`);
});

// Nuovo endpoint per visualizzare il valore corrente del contatore
app.get('/counter', (req, res) => {
  const query = queryString.parse(req._parsedUrl.query);
  res.end(`Current counter value is ${Number(query.counter)+1}`);
});

// Sample Promise with Q
app.get('/promise', (req, res) => {
  const simplePromise = Q.Promise((resolve) => {
    resolve('From the Q promise.');
  });
  simplePromise.then((answer) => res.end(answer));
});

// Sample HTTP request with JSON Body and return it
app.post('/form', (req, res) => {
  res.end(req.body);
});

