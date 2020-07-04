import uniqid from 'uniqid';

export default class List{

    constructor(){
        this.items=[];
    }

    addItem(count,unit,ingredient){

        const item={
            id:uniqid(),
            count,
            unit,
            ingredient,
        };

        //console.log(ingrideint);
        this.items.push(item);
        return item;
    };


    deleteItem(id){

        const index=this.items.findIndex(el=>el.id===id);

        return this.items.splice(index,1);
    };

    updateCount(id,newCount){

        this.items.find(el=>el.id===id).count=newCount;
    }

}

