const expess =require("express");
const mysql=require("mysql2");
const cors=require('cors');

const app=expess();

app.use(cors());
app.use(expess.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"itbridge"
});

db.connect((err)=>{
    if (err) throw err;
    console.log("Connection to mysql is Sucessfull")
});


//Add new expense
app.post("/add", (req,res)=>{
   const {amount,category,date} =req.body;
    const query= `INSERT INTO expenses (amount,category,date,created_at) VALUES(?,?,?,NOW())`;

    db.query(query,[amount,category,date],(err,result)=>{
        if(err) return res.status(500).json({message:err});
        
        res.json({message:"Added Sucessfully"})
    })
});


 //GET all Expenses
app.get("/view",(req,res)=>{
    const query="SELECT * FROM expenses";
    db.query(query,(err,result)=>{
        if(err) return res.status(400).json({message:"Failed to fetch data."});

        res.json(result)
    })
})

//GET the Particular Expense
app.get("/viewDetails/:id",(req,res)=>{
    const{id}= req.params;
    db.query(`SELECT * FROM expenses WHERE id=?`,[id],(err,result)=>{
         if (err) return res.status(500).json({ error: "Database error" });
      if (result.length === 0) return res.status(404).json({ error: "Post not found" });
  
      res.status(200).json(result[0]);
    })

});

//Update Expense
app.put("/update/:id",(req,res)=>{
    const {amount,category,date}=req.body;
    const {id}=req.params;

    db.query("UPDATE expenses SET  amount=?,category=?,date=? WHERE id=?",[amount,category,date,id],(err,result)=>{
        if (err) return res.status(500).json({message:err})

            res.json({message:"Sucessfully Updated"})
    })
});

// Delete Expense
app.delete("/deleteExpense/:id",(req,res)=>{
const {id}=req.params
    db.query("DELETE FROM expenses WHERE id=?",[id],(err,result)=>{
        if (err) return res.status(500).json({message:err})

            res.json({message:"Deleted Sucessfully"})

    })
})



//GET Total expenses
app.get("/totalExpenses",(req,res)=>{
    db.query("SELECT SUM(amount) as totalexpense FROM expenses",(err,result)=>{
        if (err) return res.status(500).json({message:"Error fetching Total Expense"});

    res.json(result[0]);
});
})

app.listen("9009");
console.log("App sucessfully running on port 9009");