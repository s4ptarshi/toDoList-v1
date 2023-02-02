const express = require("express")
const bodyParser = require("body-parser")
const date = require(`${__dirname}/date.js`)

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const items = ["Buy food", "Cook food", "Eat food"]
const workItems = []

app.get("/", (_req, res) => {
    const day = date.getDate()
    res.render('list', { listTitle: day, newListItems: items })
})

app.get("/work", (_req, res) => {
    res.render("list", { listTitle: "Work list", newListItems: workItems })
})

app.get("/about", (_req,res) => {
    res.render("about");
})

app.post("/", (req, res) => {
    const item = req.body.newItem
    if (req.body.list === "Work list") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})
