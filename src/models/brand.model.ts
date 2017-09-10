/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 export class Brand {
    
    nome: string = "";
    foto: string = "";
    
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.nome = obj.nome || this.nome;
            this.foto = obj.foto || this.foto;
        }
    }
    
}
