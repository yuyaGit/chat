const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

//ルートにアクセス
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//クライアント側でアクセスがあった場合に実行
io.on("connection", (socket) => {
    console.log("ゆーざーが接続しました");

    //クライアント側からのメッセージを受信
    socket.on("chat massage", (msg) => {
        //クライアント全員にメッセージを送信
        io.emit("chat message", msg);
    });
});

//サーバーを立てる
server.listen(PORT, () => {
    console.log("listening on 3000");
});
