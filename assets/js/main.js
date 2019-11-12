/* * * * * * * * * * * * * * * * * * *
JS for Home Page 
* * * * * * * * * * * * * * * * * * */

/* 
Created Tile UI using array of data
(2019-10-16, Kate Ko)
  * Created html element to display topic, title, button.
  * Created style background color and image.
  * Created tiles.
*/



// Array of data - backgroud color and image
const green = 'rgba(118,174, 170, 0.7)'
const greenG = 'rgba(212, 227, 227, 0.4)), url("./img/city.jpg") no-repeat left bottom'
const black = 'rgba(23,35, 50, 1)'
const blackG = 'rgba(14, 32, 50, 1)'
const brown = 'rgba(205,164, 133, 1)'
const brownG = 'rgba(230, 207, 189, 1)'
const greenblue = 'rgba(62,171, 201, 1)'
const greenblueG = 'rgba(208, 224, 230, 1)'
const pink = 'rgba(254,156, 161, 0.8)'
const pinkG = 'rgba(240, 222, 223, 0.2)), url("./img/molain.jpg") no-repeat left top'
const blue = 'rgba(98,189, 254, 0.8)'
const blueG = 'rgba(225, 242, 250, 0.4)), url("./img/picme2.jpg") no-repeat left top'

// Array of object - contents
const data = [
    {
        topic: 'Sample Project',
        title: 'Calgary Crime Dash Board',
        link : 'project',
        color: [green, greenG]
    },
    {
        topic: 'Work Experience',
        title: '10 years, worked in the mobile and web industry',
        link : 'resume',
        color: [black, blackG]
    },
    {
        topic: 'Education',
        title: 'Web Developer Certificate at SAIT',
        link : 'resume',
        color: [brown, brownG]
    },
    {
        topic: 'Certification',
        title: 'Advanced Data Analytics Semi-Professional',
        link : 'resume',
        color: [greenblue, greenblueG]
    },
    {
        topic: 'Gallery',
        title: 'What a joyful life ',
        link : 'gallery',
        color: [pink, pinkG]
    },
    {
        topic: 'Technical skills',
        title: 'Full stack Developer',
        link : 'resume',
        color: [blue, blueG]
    }
]


// Tile create
function makeTile(colorV,tileV){
    const cardRow = document.querySelector(".card-row");
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id",tileV);
    cardDiv.style = "background: linear-gradient(to bottom, " + colorV[0] + "," + colorV[1];
    cardRow.appendChild(cardDiv);
    return cardDiv;
}


// Topic create
function makeTopic(topicV){
    const cardWrap = document.querySelector(".card");
    const topicDiv = document.createElement("div");
    topicDiv.setAttribute("class", "topic");
    topicDiv.innerText = topicV;
    cardWrap.appendChild(topicDiv);
    return topicDiv;
}


// Title create
function makeTitle(titleV){
    const cardWrap = document.querySelector(".card");
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class","title");
    titleDiv.innerText = titleV;
    cardWrap.appendChild(titleDiv);
    return titleDiv;
}


// Link button create
function makeLink(linkV){
    const cardWrap = document.querySelector(".card");
    const buttonLink = document.createElement("a");
    buttonLink.setAttribute("href","/" + linkV);
    buttonLink.setAttribute("class","buy-button");
    buttonLink.innerText = "more";
    cardWrap.appendChild(buttonLink);
    return buttonLink;
}


// Repeat tile & Data insert to each function

for(let i=0; i < data.length ; i++) {
    function createCard(){
        // Backgroundcolor & Id
        const colorV = data[i].color;
        const tileV = "card" + i;
        const cardDiv = makeTile(colorV,tileV);

        // Topic
        const topicV = data[i].topic;
        const topic = makeTopic(topicV);
        // Title
        const titleV = data[i].title;
        const title = makeTitle(titleV);

        // Button link
        const linkV = data[i].link;
        const link = makeLink(linkV)

        // Define location
        cardDiv.appendChild(topic);
        cardDiv.appendChild(title);
        cardDiv.appendChild(link);
    

        return cardDiv;
    }

    const cardRow = document.querySelector(".card-row");
    cardRow.appendChild(createCard());
}




// Display subscription success message layer
// function subSuccess() {
//     if(typeof subSuccessMsg !='undefined'){
//         const subSuccess = document.createElement('div')
//         subSuccess.setAttribute("class", "subSuccess")
//         body.appendChild(subSuccess)
    
//         const message= document.createElement('p')
//         message.setAttribute("class","message")
//         message.textContent = "thank you for subscription. You could get update newsletter and event benefit."
//         subSuccess.appendChild(message)
//         return
//     }
//   }
//   subSuccess();


// Close subscription success message layer

  const messageClose = document.querySelector("#message-close");
  const subMessage = document.querySelector(".subMessage");
    // Result layer close event
    messageClose.addEventListener("click", function(){
    subMessage.setAttribute("class","closeMessage") 
        // location.reload();
        });



