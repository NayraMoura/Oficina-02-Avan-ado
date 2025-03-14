const express = require("express");  
const { PrismaClient } = require("@prisma/client");  
const cors = require("cors");  
const bodyParser = require("body-parser");  


const app = express();  
const prisma = new PrismaClient();  
app.use(cors());  
app.use(bodyParser.json()); 

// Rotas para Alunos  
app.get("/alunos", async (req, res) => {  
  const alunos = await prisma.aluno.findMany();  
  res.json(alunos);  
});  

app.post("/alunos", async (req, res) => {  
  const { nome, idade, email } = req.body;  
  const aluno = await prisma.aluno.create({  
    data: { nome, idade, email },  
  });  
  res.json(aluno);  
});  

app.put("/alunos/:id", async (req, res) => {  
  const { id } = req.params;  
  const { nome, idade, email } = req.body;  
  const aluno = await prisma.aluno.update({  
    where: { id: Number(id) },  
    data: { nome, idade, email },  
  });  
  res.json(aluno);  
});  

app.delete("/alunos/:id", async (req, res) => {  
  const { id } = req.params;  
  await prisma.aluno.delete({ where: { id: Number(id) } });  
  res.json({ message: "Aluno deletado com sucesso." });  
});  

// Rotas para Professores  
app.get("/professores", async (req, res) => {  
  const professores = await prisma.professor.findMany();  
  res.json(professores);  
});  

app.post("/professores", async (req, res) => {  
  const { nome, email, disciplina } = req.body;  
  const professor = await prisma.professor.create({  
    data: { nome, email, disciplina },  
  });  
  res.json(professor);  
});  

app.put("/professores/:id", async (req, res) => {  
  const { id } = req.params;  
  const { nome, email, disciplina } = req.body;  
  const professor = await prisma.professor.update({  
    where: { id: Number(id) },  
    data: { nome, email, disciplina },  
  });  
  res.json(professor);  
});  

app.delete("/professores/:id", async (req, res) => {  
  const { id } = req.params;  
  await prisma.professor.delete({ where: { id: Number(id) } });  
  res.json({ message: "Professor deletado com sucesso." });  
});  

// Rotas para Boletins  
app.get("/boletins", async (req, res) => {  
  const boletins = await prisma.boletim.findMany();  
  res.json(boletins);  
});  

app.post("/boletins", async (req, res) => {  
  const { alunoId, professorId, disciplina, nota } = req.body;  
  const boletim = await prisma.boletim.create({  
    data: { alunoId, professorId, disciplina, nota },  
  });  
  res.json(boletim);  
});  

app.put("/boletins/:id", async (req, res) => {  
  const { id } = req.params;  
  const { alunoId, professorId, disciplina, nota } = req.body;  
  const boletim = await prisma.boletim.update({  
    where: { id: Number(id) },  
    data: { alunoId, professorId, disciplina, nota },  
  });  
  res.json(boletim);  
});  

app.delete("/boletins/:id", async (req, res) => {  
  const { id } = req.params;  
  await prisma.boletim.delete({ where: { id: Number(id) } });  
  res.json({ message: "Boletim deletado com sucesso." });  
});  

// Iniciar servidor  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
  console.log(`Servidor em execução na porta ${PORT}`);  
});