import { websocket, printers, configs, print } from "qz-tray/";


export class Impressao
{

  async conect()
  {

    if(websocket.isActive())
    {
      await websocket.disconnect()
      return
    }
  
    return await websocket.connect().then(async function(){
      alert("Conectado ao módulo de impressão")
      return await printers.find("ZDesigner ZD220-203dpi ZPL")
    }).catch((err) => alert("Fechando conexão"))

  }

  isConect()
  {
    return websocket.isActive()
  }

  async disconnect()
  {
    await websocket.disconnect().then(() => alert("Desconectando do módulo de impressão")).catch((err) => alert(err))
  }

  impressaoUnitaria(quantidade, printer, cod, descEtiqueta, valor)
  {
    const config = configs.create(printer, {encoding : 'utf-8', copies : Number(quantidade)});

    const data = [
      `
      CT~~CD,~CC^~CT~
      ^XA
      ~TA000
      ~JSN
      ^LT0
      ^MNW
      ^MTT
      ^PON
      ^PMN
      ^LH0,0
      ^JMA
      ^PR4,4
      ~SD22
      ^JUS
      ^LRN
      ^CI27
      ^PA0,1,1,0
      ^XZ
      ^XA
      ^MMT
      ^PW663
      ^LL200
      ^LS0
      ^BY2,3,96^FT15,175^BCN,,Y,N
      ^FH\^FD>;${cod}^FS
      ^FT0,64^A0N,29,28^FB320,1,7,C^FH\^CI28^FD${valor}^FS^CI27
      ^FT0,26^A0N,20,20^FB320,1,5,C^FH\^CI28^FD${descEtiqueta}^FS^CI27
      ^BY2,3,96^FT359,175^BCN,,Y,N
      ^FH\^FD>;${cod}^FS
      ^FT345,64^A0N,29,28^FB318,1,7,C^FH\^CI28^FD${valor}^FS^CI27
      ^FT345,26^A0N,20,20^FB318,1,5,C^FH\^CI28^FD${descEtiqueta}^FS^CI27
      ^PQ1,0,1,Y
      ^XZ

      `
      ];

      try
      {
        print(config, data)
      }
      catch(err)
      {
        alert(err)
      }
       
  }

  impressaoEmMassa(printer,arrayImpressoes)
  {

    arrayImpressoes.forEach(element => {
      
      const config = configs.create(printer, {encoding : 'utf-8', copies : element.quantidade});

      const data = [
        `
        CT~~CD,~CC^~CT~
        ^XA
        ~TA000
        ~JSN
        ^LT0
        ^MNW
        ^MTT
        ^PON
        ^PMN
        ^LH0,0
        ^JMA
        ^PR4,4
        ~SD22
        ^JUS
        ^LRN
        ^CI27
        ^PA0,1,1,0
        ^XZ
        ^XA
        ^MMT
        ^PW663
        ^LL200
        ^LS0
        ^BY2,3,96^FT15,175^BCN,,Y,N
        ^FH\^FD>;${element.codigoDeBarras}^FS
        ^FT0,64^A0N,29,28^FB320,1,7,C^FH\^CI28^FD${element.valor}^FS^CI27
        ^FT0,26^A0N,20,20^FB320,1,5,C^FH\^CI28^FD${element.descricaoEtiqueta}^FS^CI27
        ^BY2,3,96^FT359,175^BCN,,Y,N
        ^FH\^FD>;${element.codigoDeBarras}^FS
        ^FT345,64^A0N,29,28^FB318,1,7,C^FH\^CI28^FD${element.valor}^FS^CI27
        ^FT345,26^A0N,20,20^FB318,1,5,C^FH\^CI28^FD${element.descricaoEtiqueta}^FS^CI27
        ^PQ1,0,1,Y
        ^XZ

        `
        ];

      try
      {
        print(config, data)
      }
      catch(err)
      {
        alert(err)
      }

    });
  }

}