/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
 export class Product {
    
    id: number = 0;
    nome: string = "";
    descrizione: string = "";
    prezzo: number = 0;
    foto: string = "";
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.id = obj.id || this.id;
            this.nome = obj.nome || this.nome;
            this.descrizione = obj.descrizione || this.descrizione;
            this.prezzo = obj.prezzo || this.prezzo;
            this.foto = obj.foto || this.foto;
        }
    }
    
}


