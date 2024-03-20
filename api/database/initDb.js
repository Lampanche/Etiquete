const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const os = require('os');



const dbPath = path.resolve('database.db')
const db = new sqlite3.Database(dbPath);

const caminhoRecover = path.join('C:','backupetiquete','restauracao','database.db');






// Função para criar as tabelas
async function createTables() {
  if(!fs.existsSync(caminhoRecover)){    
    console.log("AQUIIIII")
    db.serialize(() => {
      console.log(dbPath);
      db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER  PRIMARY KEY,
          nome TEXT,
          nomeAnterior TEXT,
          ativo BOOLEAN,
          codigo TEXT,
          codigoAnterior TEXT,
          precoCusto DECIMAL,
          precoVenda DECIMAL,
          comNota BOOLEAN,
          descricao TEXT,
          ano TEXT,
          tamanhoid INTEGER,
          modeloid INTEGER,
          fornecedorid INTEGER,
          tipoid INTEGER,
          regiaoid INTEGER,
          estoque INTEGER,
  
                  
          FOREIGN KEY (tamanhoid) REFERENCES tamanhos(id),
          FOREIGN KEY (modeloid) REFERENCES modelos(id),
          FOREIGN KEY (fornecedorid) REFERENCES fornecedors(id),
          FOREIGN KEY (regiaoid) REFERENCES regiaos(id),
          FOREIGN KEY (tipoid) REFERENCES tipos(id)
        )
      `);
  
      db.run(`
        CREATE TABLE IF NOT EXISTS tamanhos (
          id INTEGER PRIMARY KEY,
          codigo INTEGER,
          ativo BOOLEAN,
          nome TEXT
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS modelos (
          id INTEGER PRIMARY KEY,       
          ativo BOOLEAN,
          nome TEXT,
          nomeAnterior TEXT
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS tipos (
          id INTEGER PRIMARY KEY,        
          ativo BOOLEAN,
          nome TEXT,
          nomeAnterior TEXT
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS fornecedors (
          id INTEGER PRIMARY KEY,       
          ativo BOOLEAN,
          nome TEXT,
          nomeAnterior TEXT
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS regiaos (
          id INTEGER PRIMARY KEY,        
          ativo BOOLEAN,
          nome TEXT
        )
      `);
      db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,        
        login TEXT,
        senha TEXT
      )
    `);
    });
    await db.close((err) => {
      if (err) {
          console.error(`Erro ao fechar o banco de dados: ${err.message}`);
      }
  });
  return dbPath;

  }
  
  

  
}

function createBackUp(){
  
  const username = os.userInfo().username;
  const caminhoDoBancoDeDados = dbPath;

 
  
  const caminhopastabancos = path.join('C:','backupetiquete');
  const caminhoDaPastaBackup = path.join('C:','backupetiquete','backup');
  const caminhoDaPastaRestauracao = path.join('C:','backupetiquete','restauracao');


  


 
  
  // Verifica se a pasta existe
  // Verifica se a pasta existe
if (!fs.existsSync(caminhopastabancos)) {
  
  // Cria a pasta se não existir
  fs.mkdirSync(caminhopastabancos, { recursive: true });
  console.log(`A pasta '${caminhopastabancos}' foi criada.`);
} else {
  console.log(`A pasta '${caminhopastabancos}' já existe.`);
}
if (!fs.existsSync(caminhoDaPastaBackup)) {
  // Cria a pasta se não existir
  fs.mkdirSync(caminhoDaPastaBackup, { recursive: true });
  console.log(`A pasta '${caminhoDaPastaBackup}' foi criada.`);
} else {
  console.log(`A pasta '${caminhoDaPastaBackup}' já existe.`);
}
if (!fs.existsSync(caminhoDaPastaRestauracao)) {
  // Cria a pasta se não existir
  fs.mkdirSync(caminhoDaPastaRestauracao, { recursive: true });
  console.log(`A pasta '${caminhoDaPastaRestauracao}' foi criada.`);
} else {
  console.log(`A pasta '${caminhoDaPastaRestauracao}' já existe.`);
}

const menssagem = `

  1. Acesse a pasta "backup".
  2. Salve o arquivo "database" localizado na pasta backup em um local seguro para recuperação.
  3. Desinstale o aplicativo "etiquete" se necessário, se não for necessario, va para o passo 4.
  4. instale o aplicativo etiquete.
  5. Abra a pasta "recuperacao".
  6. Salve nesta pasta o arquivo de "backup" que você salvou.
  7. Feche o aplicativo e abra-o novamente.
  8. Exclua da pasta "recuperacao" o arquivo "database"`;
  
  

// Caminho para o arquivo leiame.txt
const caminhoLeiame = path.join('C:','backupetiquete','restauracao','leiame.txt');

// Criação do arquivo leiame.txt
fs.writeFile(caminhoLeiame, menssagem, (err) => {
  if (err) throw err;

  console.log('Arquivo leiame.txt criado com sucesso!');
});

const caminhoDaPastaBackupleiame = path.join('C:','backupetiquete','backup','leiame.txt');

fs.writeFile(caminhoDaPastaBackupleiame, menssagem, (err) => {
  if (err) throw err;

  console.log('Arquivo leiame.txt criado com sucesso!');
});











  const caminhoDoBackup = path.resolve(`C:/backupetiquete/backup/database.db`);

// Crie uma nova conexão de banco de dados SQLite.
  let dbback = new sqlite3.Database(caminhoDoBancoDeDados, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(`Erro ao abrir o banco de dados: ${err.message}`);
        return;
    }

    try {
      fs.unlink(caminhoDoBackup);
      console.log("teste")
      resolve();
    } catch (e) {
      console.log("teste")
    
    }
    
    const leituraStream = fs.createReadStream(caminhoDoBancoDeDados);
    
    const escritaStream = fs.createWriteStream(caminhoDoBackup);

    
    leituraStream.pipe(escritaStream);

    
    escritaStream.on('finish', () => {
        console.log('Backup do banco de dados concluído.');
    });

    
    escritaStream.on('error', (err) => {
        console.error(`Erro ao criar o backup: ${err.message}`);
    });
});



//const caminhoRecuperacao = path.resolve(`C:/backupetiquete/recuperacao/database.db`);
const caminhoRecuperacao = path.join('C:','backupetiquete','restauracao','database.db');






  if (fs.existsSync(caminhoRecuperacao)) {
    
    const dbrecuperacao = new sqlite3.Database(caminhoRecuperacao, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
          console.error(`Erro ao abrir o banco de dados: ${err.message}`);
          return;
      }
    
      try {
         fs.unlinkSync(dbPath);
        console.log("teste")
        resolve();
      } catch (e) {
        console.log("teste")
       
      }
      
      const leituraStream = fs.createReadStream(caminhoRecuperacao);
    
      const escritaStream = fs.createWriteStream(dbPath);

      
      leituraStream.pipe(escritaStream);

      
      escritaStream.on('finish', () => {
          console.log('Backup do banco de dados concluído.');
      });

      
      escritaStream.on('error', (err) => {
          console.error(`Erro ao criar o backup: ${err.message}`);
      });
    });

    dbrecuperacao.close((err) => {
      if (err) {
          console.error(`Erro ao fechar o banco de dados: ${err.message}`);
      }
  });

    
 

    
}



 
    




  





}

module.exports = { 
  createBackUp,
  createTables,

};