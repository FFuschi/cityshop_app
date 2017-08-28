/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class User {
    
    email: string = "";
    firstname: string = "";
    lastname: string = "";
    image: string = "";
    
    token: string = "";
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.email = obj.email || this.email;
            this.firstname = obj.firstname || this.firstname;
            this.lastname = obj.lastname || this.lastname;
            this.token = obj.token || this.token;
            this.image = obj.image || this.image;
        }
    }
    
}

