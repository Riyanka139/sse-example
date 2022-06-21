const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});
let i = 0;
app.get("/stream", (req, res) => {
  console.log("Client Connected");
  res.setHeader("Content-Type", "text/event-stream"); //imp to set header for event stream

  const interval = setInterval(() => {
    const date = new Date().toLocaleString();

    // can't use send, end (for alive the server and continues write on same tcp connection)
    // /n/n => signal of end of event

    res.write(`data: ${date} ${i++}\n\n`);
  }, 1000);
  res.on("close", () => {
    console.log("Client closed Connetion");
    clearInterval(interval);
    res.end();
  });
});

const send = (res) => {
  res.write("data:" + `heyy${i++}\n\n`);
  setTimeout(() => send(res), 1000);
};

app.listen(8080, () => {
  console.log("Server Listening on Port 8080");
});
