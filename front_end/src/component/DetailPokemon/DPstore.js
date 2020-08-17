import { types } from "mobx-state-tree";


const Evolution=types.model({
    name:types.string,
    img:types.optional(types.string,'')
})
const InforDetail=types.model({
    listEvolution:types.optional(types.array(Evolution),[]),
    listWeaknesses:types.optional(types.array(types.string),[])
}).views((self) => ({
    get Evolution() {
        return self.listEvolution.reverse()
    },
    get Weaknesses(){
        return self.listWeaknesses
    }
})).actions( (self) => {
    function addEvolution(Evolution){
        self.listEvolution.push(Evolution)
        // console.log(self.list)
    }
    function addWeaknesses(data){
        self.listWeaknesses.push(data)
        // console.log(self.list)
    }
    function  changelist(newEvolution,newWeaknesses){
        self.listEvolution=newEvolution
        self.listWeaknesses=newWeaknesses
    }
    return {
        addEvolution,
        changelist,
        addWeaknesses
    }
})

// export const ListWeaknesses=Weaknesses.create()
export const DetailInfor=InforDetail.create()