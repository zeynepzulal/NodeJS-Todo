// Todo App - Frontend
// Todo App Api - Backend

/**
 *   /todos -GET
 *   /todo - POST
 *   /todo/id -DELETE
 */

const express = require('express');
const app = express();
 
// middleware
app.use(express.json());

app.use(function(req,res,next){
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods","GET,POST,DELETE");
    res.header("Acces-Control-Allow-Headers","Origin,Content-Type,Accept");
    next();
});

let todos = [];

app.get('/',function(req,res){
    res.send("Server is Okay");
});

app.get('/api/todos',function(req,res){
    res.json(todos);
});

//Post - id,title,status, -> todos.push
// 1. asama -> request içerisinde body gelmesi

app.post('/api/todo',function(req,res){
    const todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    res.json({todoId : todo.id});
    // res.send("Todo eklendi");
});


app.delete("/api/todo/:id",function(req,res){   // api ve todo statik ,  :id dinamik bir parametre
    const todoId = req.params;
    // yakalanan todoId array de mevcut mu ?
    const todoIndex = todos.findIndex(
        (todo) => todo.id === parseInt(todoId.id)
    )

    if(todoIndex === -1){
        res.status(404).json({error: "Todo not found."});
        return;
    }  

    todos.splice(todoIndex,1)
    res.json({message: "Todo deleted."}); // message yerine baska bir sey de yazilabilir msg yazsan da önemli degil.

    res.send(todoId.id);

});  



const port = 8011;

app.listen(port,function(){
    console.log(`API listening on http://localhost:${port}`);
});