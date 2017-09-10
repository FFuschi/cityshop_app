/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class Store {
    
    id: number = 0;
    nome: string = "";
    address: string = "";
    latitudine: number = 0;
    longitudine: number = 0;
    phone: number = 0;
    foto: string = "";
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.id = obj.id || this.id;
            this.nome = obj.nome || this.nome;
            this.address = obj.address || this.address;
            this.latitudine = obj.latitudine || this.latitudine;
            this.longitudine = obj.longitudine || this.longitudine;
            this.phone = obj.phone || this.phone;
            this.foto = obj.foto || this.foto;
        }
    }
    
}
