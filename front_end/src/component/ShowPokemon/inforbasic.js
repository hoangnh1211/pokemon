import { types } from "mobx-state-tree";
export const inf=types.model({
    id:types.number,
    img:types.optional(types.string,''),
    name:types.string
})
const listin=types.model({
    list:types.optional(types.array(inf),[])
})
.views((self) => ({
    get shop() {
        return self.list.slice()
    }
}))
.actions( (self) => {
    function addTodo(inf){
        self.list.push(inf)
        self.list= self.list.sort(function(a, b){return a.id - b.id})
        // console.log(self.list)
    }
    function  changelist(newList){
        self.list=newList
    }
    function setlist(name){
        if (name==='ten-az') self.list= self.list.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;})
        if (name==='ten-za') self.list= self.list.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;})
        if (name==='idtang') self.list= self.list.sort(function(a, b){return a.id - b.id})
        if (name==='idgiam') self.list= self.list.sort(function(a, b){return b.id - a.id})
    }
    return {
        addTodo,
        changelist,
        setlist
    }
})
export const listinf=listin.create()