var input=document.getElementById("inp")
var add= document.getElementById("add")
var box=document.getElementById("box")
var message=document.getElementById("alert")
var ok=document.getElementById("ok")
var all=document.getElementById("all")
var completed=document.getElementById("complated")
var non=document.getElementById("non")
var compcontent=document.getElementById("comp")
var noncompcontent=document.getElementById("noncomp")
var data=JSON.parse(localStorage.getItem("data"))||[]
var allcompleted=JSON.parse(localStorage.getItem("complete"))||[]
var noncomplete=JSON.parse(localStorage.getItem("noncomplete"))||[]
var messadd=document.getElementById("successadd")
var messdelete=document.getElementById("successremove")
var messedit=document.getElementById("successedit")
// show no tasks message if the box or complated or non completed is empty
if(data.length==0){
    box.innerHTML=`<h4>No Tasks</h4>`
}
if(allcompleted.length==0){
    compcontent.innerHTML=`<h4>No Tasks</h4>` 
}
if(noncomplete.length==0){
    noncompcontent.innerHTML=`<h4>No Tasks</h4>` 
}
// functions to use more
var boxitems=function(info,place){
    info.forEach((ele)=>{
        place.innerHTML+=`<p class="num">${ele.id}</p>
                <div class="${ele.design} x">${ele.name}</div>
                <div class="options x">
                    <button onclick="edit(${ele.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="completeditem(${ele.id})"><i class="fa-regular fa-circle-check ${ele.design}" id="done"></i></button>
                    <button onclick="deleted(${ele.id})"><i class="fa-solid fa-trash" id="del"></i></button>
                </div>`
    })
}    
var buttons=function(one,two,three,four,five,six){
    one.classList.add("focus")
    two.classList.remove("focus")
    three.classList.remove("focus")
    box.style.display=four
    compcontent.style.display=five
    noncompcontent.style.display=six
}
// to show old tasks if website reload
if(localStorage.getItem("data")){
    boxitems(data,box)
}
if(localStorage.getItem("complete")){
    boxitems(allcompleted,compcontent)
}
if(localStorage.getItem("noncomplete")){
    boxitems(noncomplete,noncompcontent)
}
//  function to add item
add.onclick=function(){
    if(input.value===""){
        message.style.display="flex"
    }else{
        data=[...data,{id:data.length+1,name:input.value,design:"no"}]
        noncomplete=[...noncomplete,{id:noncomplete.length+1,name:input.value,design:"no"}]
        box.innerHTML=""
        noncompcontent.innerHTML=""
        boxitems(data,box)
        boxitems(noncomplete,noncompcontent)
        localStorage.setItem("data",JSON.stringify(data))
        localStorage.setItem("noncomplete",JSON.stringify(noncomplete))
        if(data.length==0){
            box.innerHTML=`<h4>No Tasks</h4>`
        }
        if(allcompleted.length==0){
            compcontent.innerHTML=`<h4>No Tasks</h4>` 
        }
        if(noncomplete.length==0){
            noncompcontent.innerHTML=`<h4>No Tasks</h4>` 
        }
        input.value=""
        console.log(noncomplete)
    }
    setTimeout(()=>{messadd.style.display="block"},1000)
    messadd.style.display="none"
}
// function  to delete item
var deleted=function(id){
    setTimeout(()=>{messdelete.style.display="block"},1000)
    messdelete.style.display="none"
    // to delete item from all tap
    data=JSON.parse(localStorage.getItem("data"))
    const newdata=data.filter(item=>{return item.id!=id})
    data=newdata.map((e,index)=>{
        return {id:index+1,name:e.name,design:e.design}
    })
    box.innerHTML=""
    boxitems(data,box)

    // to delete iteem from completed tap
    allcompleted=JSON.parse(localStorage.getItem("complete"))
    const newallcomplete=allcompleted.filter(item=>{return item.id!=id})
    allcompleted=newallcomplete.map((e,index)=>{
        return {id:index+1,name:e.name,design:e.design}
    })
    compcontent.innerHTML=""
    boxitems(allcompleted,compcontent)

    // to delete iteem from non completed tap
    noncomplete=JSON.parse(localStorage.getItem("noncomplete"))
    const newnoncomplete=noncomplete.filter(item=>{return item.id!=id})
    noncomplete=newnoncomplete.map((e,index)=>{
        return {id:index+1,name:e.name,design:e.design}
    })
    noncompcontent.innerHTML=""
    boxitems(noncomplete,noncompcontent)
    
    localStorage.setItem("data",JSON.stringify(data))
    localStorage.setItem("noncomplete",JSON.stringify(noncomplete))
    localStorage.setItem("complete",JSON.stringify(allcompleted))
    if(data.length==0){
        box.innerHTML=`<h4>No Tasks</h4>`
    }
    if(contentcomp.length==0){
        contentcomp.innerHTML=`<h4>No Tasks</h4>`
    }
    if(noncomplete.length==0){
        noncompcontent.innerHTML=`<h4>No Tasks</h4>`
    }
}
// function to completed item
var completeditem=function(id){
    data=JSON.parse(localStorage.getItem("data"))
    const newdata=data.map((e,index)=>{
        if(index+1===id && e.design=="no"){
            allcompleted=[...allcompleted,{...e,design:"design"}]
            const newnoncomplete=noncomplete.filter(item=>{return item.id!=id})
                noncomplete=newnoncomplete.map((e,index)=>{
                return {...e}
            })
            return {...e,design:"design"}
        }
        else if(index+1==id && e.design=="design"){
            allcompleted=allcompleted.filter(item=>{return item.id!=id})
            noncomplete.push({...e,design:"no"})
            return{...e,design:"no"}
        }
        else{return e}
    })
    localStorage.setItem("data",JSON.stringify(newdata))
    localStorage.setItem("complete",JSON.stringify(allcompleted))
    localStorage.setItem("noncomplete",JSON.stringify(noncomplete))
    box.innerHTML=""
    compcontent.innerHTML=""
    noncompcontent.innerHTML=""
    boxitems(newdata,box)
    boxitems(allcompleted,compcontent)
    boxitems(noncomplete,noncompcontent)
    const newall= allcompleted.map((e,index)=>{
        if(index+1===id && e.design=="no"){
            allcompleted=[...allcompleted,{...e,design:"design"}]
            localStorage.setItem("complete",JSON.stringify(allcompleted))
            return {...e,design:"design"}
        }
    })
}
// fuction to edit the task
const edit=async function(id){
    data=JSON.parse(localStorage.getItem("data"))||[]
    allcompleted=JSON.parse(localStorage.getItem("complete"))||[]
    noncomplete=JSON.parse(localStorage.getItem("noncomplete"))||[]
    var oldtask="";
    data.forEach((ele,index)=>{
        if(ele.id==id){
            oldtask=ele.name
            input.value=ele.name
        }
    })
    add.onclick=()=>{
        var editing=data.map(e=>{
            if(e.name===oldtask){
                return{...e,name:input.value}
            }else{
                return {...e}
            }
        })
        var editingcomp=allcompleted.map(e=>{
            if(e.name===oldtask){
                return{...e,name:input.value}
            }else{
                return {...e}
            }
        })
        var editingnon=noncomplete.map(e=>{
            if(e.name===oldtask){
                return{...e,name:input.value}
            }else{
                return {...e}
            }
        })
        localStorage.setItem("data",JSON.stringify(editing))
        box.innerHTML=""
        boxitems(editing,box)
        localStorage.setItem("complete",JSON.stringify(editingcomp))
        compcontent.innerHTML=""
        boxitems(editingcomp,compcontent)
        localStorage.setItem("noncomplete",JSON.stringify(editingnon))
        noncompcontent.innerHTML=""
        boxitems(editingnon,noncompcontent)

        setTimeout(()=>{messedit.style.display="block"},1000)
        messedit.style.display="none"
    } 

}
ok.onclick=function(){
    message.style.display="none"
}
// show all tasks
box.style.display="grid"
all.onclick=function(){
    buttons(all,completed,non,"grid","none","none")
}
// show only tasks was completed
completed.onclick=function(){
    buttons(completed,all,non,"none","grid","none")
    
}
// show only tasks was not completed
non.onclick=function(){
    buttons(non,completed,all,"none","none","grid")
    var content=localStorage.getItem("noncontent")||[]
}