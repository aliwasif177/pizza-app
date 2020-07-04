import {site , key} from '../config';
export default class Search{

    constructor(query){
            this.query=query;
    };

    async getResults(){

        try{
            const res=await fetch(`${site}?key=${key}&q=${this.query}`);
            this.result=await res.json();
            this.result=this.result.recipes;
    
                    }
                    catch(error){
            console.log(error);
        }

    };
}

