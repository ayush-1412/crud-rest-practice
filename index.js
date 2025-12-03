const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "microsoft",
        content : "We love Windows"
    },
    {
        id : uuidv4(),
        username : "apple",
        content : "We love macOS"
    },
    {
        id : uuidv4(),
        username : "linux",
        content : "We love Shell, WTF is GUI"
    }
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let id  = req.params.id;
    let post = posts.find(p => p.id === id);
    res.render("show.ejs",{post});
});

app.get("/posts/edit/:id",(req,res)=>{
    let {id}= req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
});
