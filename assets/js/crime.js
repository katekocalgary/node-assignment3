/* * * * * * * * * * * * * * * * * * *
JS for product Page 
* * * * * * * * * * * * * * * * * * */

/* 
Calgary Crime Dashboard using API 
(2019-10-21, Kate Ko)
  * Community crime counts search
  * Sector Top 5 by crime counts
  * Community Top 5 by crime counts
  * Crime category Top 5 by crime counts 
*/


// General definition 
const status = document.querySelector('#form-status')
const keyword = document.querySelector('#keyword')
const submit = document.querySelector('#submit')
const searchResult = document.querySelector(".searchResult")
const layerClose = document.querySelector("#layer-close");
const communityTitle = document.querySelector(".communityTitle")
const searchList1 = document.querySelector(".searchList1")
const searchList2 = document.querySelector(".searchList2")
const resultLi= document.getElementsByClassName("resultLi").textContent


const list = document.querySelector(".list")
const total = document.querySelector(".total")
const sector = document.querySelector(".sector")
const community = document.querySelector(".community")
const category = document.querySelector(".category")


// Api calls
const api = {
  url: "https://data.calgary.ca/resource/848s-4m4z.json?year=2019",
  searchUrl: comValue => "https://data.calgary.ca/resource/848s-4m4z.json?year=2019&community_name=" + comValue
}

/*********************************/
// Search by community
/*********************************/

// 1. Search click event

  submit.addEventListener('click', x => {
    
    x.preventDefault()
    const value = document.getElementById("keyword").value;
   
    if (value === "") {
      status.textContent = "Please input your community name"
      keyword.setAttribute("style","border-color: #FF7300;")
      return 
    } 

    else{ 
      keyword.setAttribute("style","border-color: black;")
      const del = document.getElementById("keyword")
      del.value=""

      const comValue = value.toUpperCase()
      status.textContent = ""
      communityTitle.textContent = comValue
      
      const searchUrl= api.searchUrl(comValue)
      comDataFetch(searchUrl)
      return searchUrl
    }
      
  })


  // 2. Search result show

  function comDataFetch(searchUrl){

    // 5. Function - add line community crime info

    function addLine(string,x) {
    
      searchResult.setAttribute("id", "searchResult")
      const element = document.createElement('li')
      element.setAttribute("class","resultLi")
      element.textContent = string
      x.appendChild(element)
      return
    }

    // 4. Fetch - Summary of community crime information
    function resultCountSum(x){
      // Crime total count
      const commData = x
        .filter(x => x.community_name = x.community_name)
        .reduce(function(acc, x){
        acc = acc + Number(x.count)
        return acc
        }, 0)
        if (commData === 0) { 
          status.textContent = "Please check the community name"
          keyword.setAttribute("style","border-color: #FF7300;")
          searchResult.setAttribute("display","none")
          return
        } 
        else {
        addLine("- Crime counts : " + commData,searchList1)
        } 
      // Residents total count
      const residentData = x
        .filter(x => x.community_name = x.community_name)
        .reduce(function(acc, x){
        acc = acc + Number(x.resident_count)
        return acc
        }, 0)
        if (residentData === 0) { 
          status.textContent = "Please check the community name"
          keyword.setAttribute("style","border-color: #FF7300;")
          searchResult.setAttribute("display","none")
          return
        } 
        else {
          addLine("- Resident counts : " + residentData,searchList1) 
        }

        
      // Category crime count 
      const categoryTotals = x
        .reduce(function(r,o){
          (r[o.category])? r[o.category] += Number(o.count) : r[o.category] = Number(o.count) 
          return r;}, {})
      // Category crime count sort by descending order
      const categoryList = []
        for (var crime in categoryTotals) {
          categoryList.push([crime, categoryTotals[crime]])
        }
        categoryList.sort(function(a,b){
          return b[1] - a[1]
        })
        for (var i=0 ; i < categoryList.length ; i++){
          const categoryListEach = categoryList[i]
          addLine((i+1)+". "+categoryListEach[0] + " : " + categoryListEach[1],searchList2)
        }
    } 

    // Result layer close event
    layerClose.addEventListener("click", function(){
    searchResult.setAttribute("id","") 
    location.reload();
    })
            
    // 3. fetch search url
    fetch (searchUrl)
    .then (x => {
      return x.json()
    })
    .then(x => {
      resultCountSum(x)
    })
  }

/*********************************/
// top 5 information
/*********************************/

// 3. Function - add line crime top
function addLine5(string,selector) {
  const li = document.createElement('li')
  li.textContent = string
  selector.appendChild(li)
  return string
}

// 2. Function wrapper
function main(data) {
  // Crime Totals
  const countSum = data
    .reduce(function(acc, data){
    acc = acc + Number(data.count)
    return acc
    }, 0)
    total.textContent =countSum
  // Crime Top 5 sectors
  const secTotals = data
    .reduce(function(r,o){
    (r[o.sector])? r[o.sector] += Number(o.count) : r[o.sector] = Number(o.count) 
    return r;}, {});
 
  const secSortable = [];
    for (var crime in secTotals) {
      secSortable.push([crime, secTotals[crime]])
    }
    secSortable.sort(function(a,b){
      return b[1] - a[1]
    })
    for (var i=0 ; i < 5 ; i++){
      sectorTop5 = secSortable[i]
      addLine5((i+1)+". "+sectorTop5[0]+"  :  "+sectorTop5[1],sector)
    }
  // Crime Top 5 communitis
  const comTotals = data
    .reduce(function(r,o){
      (r[o.community_name])? r[o.community_name] += Number(o.count) : r[o.community_name] = Number(o.count) 
      return r;}, {});

  const comSortable = [];
    for (var crime in comTotals) {
      comSortable.push([crime, comTotals[crime]])
    }
    comSortable.sort(function(a,b){
      return b[1] - a[1]
    })
    for (var i=0 ; i < 5 ; i++){
      communityTop5 = comSortable[i]
      addLine5((i+1)+". "+communityTop5[0]+"  :  "+communityTop5[1],community)
  }
  // Crime Top 5 category
  const categoryTotals = data
  .reduce(function(r,o){
    (r[o.category])? r[o.category] += Number(o.count) : r[o.category] = Number(o.count) 
    return r;}, {});

  const categorySortable = [];
  for (var crime in categoryTotals) {
    categorySortable.push([crime, categoryTotals[crime]])
  }
  categorySortable.sort(function(a,b){
    return b[1] - a[1]
  })
  for (var i=0 ; i < 5 ; i++){
    categoryTop5 = categorySortable[i]
    addLine5((i+1)+". "+categoryTop5[0]+"  :  "+categoryTop5[1],category)
  }
}

// 1. fetch url
fetch (api.url)
  .then (x => {
    return x.json()
  })
  .then(x => {
    main(x)
  })


