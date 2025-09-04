const loadlessons =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise respons 
     .then(res=>res.json()) // pormise of json data 
     .then(json=>displayLesson(json.data))
}

const removeActive=()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    console.log(lessonButtons)
    lessonButtons.forEach(btn=>btn.classList.remove("active") )
}
// load lavel word 
const loadLevelWord=(id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url)
     .then(res=>res.json())
     .then((data)=>{
         removeActive()

        const clickBtn=document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active")

        displayLevelWord(data.data)
     })
}

// {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// },

const displayLevelWord=(words)=>{
    // 1.get the continer
    const wordContiner = document.getElementById("word-continer")
    wordContiner.innerHTML="";

    if(words.length==0){
       wordContiner.innerHTML=`
       <div class=" text-center   col-span-full rounded-xl py-10 space-y-6 font-bangla">

          <img src="./assets/alert-error.png" alt="" class="mx-auto">

       <p class="text-xl font-medium text-gray-400 ">

       এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

       <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান।</h2>
      </div>`;
        return
    }

    // 2. get into  every lessons
    words.forEach(word => {
        
        //  3.creat element
        const card=document.createElement("div")
        card.innerHTML=`    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 ">
        <h2 class="font-bold text-2xl">${word.word ? word.word: "NOO WORD " }</h2>
        <p class="font-semibold ">Meaning /Pronounciation</p>

        <div class=" text-2xl font-semibold font-bangla">" ${word.meaning ? word.meaning :"noo word"} / ${word.pronunciation ? word.pronunciation : "noo word"}"</div>

        <div class="flex justify-between items-center"> 
            <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>`

         // 4. appand child
         wordContiner.append(card)
        
    });

}

// button ana 
const displayLesson =(lessons)=>{
    // 1.get the continer 
    const levelcontainer= document.getElementById("lavel-container")
    levelcontainer.innerHTML="";


    // 2. get into  every lessons
    for(let lesson of lessons){

    // 3.creat element

    const btnDiv=document.createElement("div")
    btnDiv.innerHTML=`  
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"

             href="" class="btn btn-outline btn-primary lesson-btn"> 

            <i class="fa-solid fa-book-open"> 

            </i> lesson-${lesson.level_no}
            </button> `


    // 4. appand child 
    levelcontainer.append(btnDiv)

    }

}
loadlessons()