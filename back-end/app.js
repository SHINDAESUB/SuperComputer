const express = require("express")
const history = require("connect-history-api-fallback")
const path = require("path")
const apiRouter = require("./routes/index")
const app = express();

const publicPath = path.resolve(__dirname, "public")

app.use(express.static(publicPath))

app.use("/api", apiRouter); // '/api' 로 시작하는 URL은 라우터로 전송

app.use(history) //REST API 서버로서 사용한다면 라우터 뒤에 실행하게 한다. 그렇치 않으면 요청이 들어오지 않는다.

app.listen(3000, () => {
    console.log("Super Web Server start")
})

