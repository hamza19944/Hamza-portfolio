const { urlencoded } = require("body-parser")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const data = require("./public/script").projects

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use(express.static("public"))

let active = ""

app.get("/",(req, res) => {
    active = "home"
    res.render("app", {data: data, active: active})
})
app.get("/resume", (req, res) => {
    active = "resume"
    res.render("resume", {head: data, active: active})
})
app.get("/:projecttitle", (req, res) => {
    active = "project"
    data.forEach(proj => {
        if(req.params.projecttitle.trim() === proj.title.trim()){
            res.render("project", {projp: proj, active: active})
        }
    })
})
app.listen(3000, () => {
    console.log("Server is Running");
})