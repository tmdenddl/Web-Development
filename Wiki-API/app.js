//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://admin-kevin:test123@cluster0.qcb3t.mongodb.net/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

//=========== Requests targeting all articles ===========//
app.route("/articles")
.get(function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if(!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err) {
    if(!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

/*
app.get("/articles", function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if(!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

app.post("/articles", function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err) {
    if(!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

app.delete("/articles", function(req, res) {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});
*/

//=========== Requests targeting specific articles ===========//

app.route("/articles/:articleTitle")
.get(function(req, res) {
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if(foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No article matching the title was found!");
    }
  });
})

.put(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err) {
      if(!err) {
        res.send("Successfully replaced the selected articel!");
      }
    }
  );
})

.patch(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err) {
      if(!err) {
        res.send("Successfully updated the selected articel!");
      }
      else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err) {
      if(!err) {
        res.send("Successfully deleted the selected articel!");
      }
      else {
        res.send(err);
      }
    }
  );
});

//====================== Server Port Related ======================//
// Listen on default port specified by MongoDB, otherwise 3000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port " + port + ".");
});
