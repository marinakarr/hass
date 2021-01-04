
document.addEventListener("DOMContentLoaded", () => {
  console.log('loaded')
  fetchTechList();

  var url = window.location.href
  var refresh= url.split("?")[0];
  window.history.pushState("object or string", "Title", refresh );
  
});

const allTechList = []
const tagList = {} 

//retrieve doc element
function el(id) {
  return document.getElementById(id);
}

//renders a single tag list object and appends list to html list element, tagId
function renderEachTag(tag) {
  let tagId = tag.id

  //TODO : modify tag IDs to not use special characters, 'telehelp/televet' wont collapse because of space
  
  const item = document.createElement('div');
  item.setAttribute("id", tagId);
  item.style.display='none';
  
  const button = document.createElement('button');
  button.innerText = tag.tagName;
  button.setAttribute('data-toggle', 'collapse');
  button.setAttribute('class', 'altbutton')
  button.setAttribute('data-target', '#'+tagId+'Collapse')
  
  item.append(button)
  
  const collapseContainer = document.createElement('div')
  collapseContainer.setAttribute('class', 'collapse show')
  collapseContainer.setAttribute('id', tagId+'Collapse')
  
  const tagUl = document.createElement("ul");
  tagUl.setAttribute("class", "list-group");
  tagUl.setAttribute('id', tagId+'Child')
  
  collapseContainer.appendChild(tagUl)
  item.append(collapseContainer) 
  $("#tagId").append(item);
  
  
  const tagLink = document.createElement("a");
  tagLink.setAttribute("class", "nav-item p-3");
  tagLink.innerText = tag.tagName;
  tagLink.href = '#'+tagId;
  $('#tagNav').append(tagLink);
}


//storing each tech to avoid calling API multiple times for filtering
class tech {
  constructor(id, name, tags, priceModel, maint, imp){
    this.id = id;
    this.name = name; 
    this.tags = tags; //id names of tags
    this.priceModel = this.setFilter(priceModel);
    this.maint= this.setFilter(maint)
    this.imp=  this.setFilter(imp)

  }

  hasTag(tag){
    return this.tags.includes(tag)
  }

  setFilter(models){
    if (models != undefined){
      return models.toString()
    }
    else {
      return null
    }
  }
}

//class to hold each tag and what tools belong to it
class tag {
  constructor(tagName){
    this.tagName=tagName;
    this.id = this.setID(tagName)
    this.items = []
  }

  setID(name){
    let tagId=name.replaceAll('/', '')
    tagId=tagId.replaceAll(" ", "")
    return tagId
  }

  addTool(tech) {
    this.items.push(tech)
  }

}
//retrieves the list of technologies and stores into class objects
function fetchTechList() {
  console.log('hello')
  let tagsArray = [];
  
  fetch("https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Technology%20List/", {
    headers: {
      Authorization: "Bearer keyemv7utChwq4g5e",
    },
  })
  .then((res) => res.json())
  .then((json) => {
  for (let i in json.records) {
    tags = json.records[i]["fields"]["Tags"].toString().split(',')

    tagsArray = tagsArray.concat(tags);
    
    id = json.records[i]['id']
    name = json.records[i]["fields"]["Name"];
    priceModel = json.records[i]["fields"]["Pricing Model"]
    maint = json.records[i]["fields"]["Complexity to Maintain"]
    published = json.records[i]["fields"]["Published"]
    implementDif = json.records[i]["fields"]["Complexity to Implement"]

    if(published){
      allTechList.push(new tech(id, name, tags, priceModel, maint, implementDif))
    }
  }


  // //get a set of the tags
  let uniqueTagsArray = new Set(tagsArray.sort());
  uniqueTagsArray.forEach(function(tagName) {
    let t = new tag(tagName)
    tagList[tagName] = t

  })
  let currFilter=[]
  for (i = 0; i < allTechList.length; i++) {
    currFilter[i] = allTechList[i];
  }

  //sort tools into tag lists
  currFilter.forEach(function(x) {
    let xtags = x.tags
    xtags.forEach(function(xt){
      tagList[xt].addTool(x)
    })
  })
  renderFilters();
  renderItems(currFilter);
  })

};
  
//render each tag and get tech sites that match the filter
//uses the overall tagslist and either techList or filtered version
function renderItems(tools){
  for (const obj in tagList){
    j = tagList[obj];
    renderEachTag(j);
    addTechNamesToTags(j, tools);
    
  }
};

//given a tag object, add all relevant tools from the given tech list
function addTechNamesToTags(tag, list) {
  let tagId = tag.id;
  let name = tag.tagName
  list.forEach(function(i){
    if(i.hasTag(name)){
      let l = document.getElementById(tagId)
      l.style.display='block'
      const toolNameLi = document.createElement("a");
      toolNameLi.setAttribute("class", "list-group-item");
      toolNameLi.setAttribute("id", i.id);
      toolNameLi.innerText = i.name;
      toolNameLi.href = `./techdetail.html?${i.id}`;
      toolNameLi.target = "_blank";
      document.getElementById(tagId+'Child').append(toolNameLi);
    }
  })
};


function getPriceFilterOptions(list){
  let models = []
  models.push('All')
  list.forEach(function(i) {
    models = models.concat(i.priceModel)
  })
  uniqueModels = new Set(models)
  return Array.from(uniqueModels)
}

function getMaintainFilterOptions(list){
  let models = []
  models.push('All')
  list.forEach(function(i) {
    models = models.concat(i.maint)
  })
  uniqueModels = new Set(models)
  return Array.from(uniqueModels)
}

function getImplementFilterOptions(list) {
  let models = []
  models.push('All')
  list.forEach(function(i) {
    models = models.concat(i.imp)
  })
  uniqueModels = new Set(models)
  return Array.from(uniqueModels)
}

function renderFilters(){
  let priceFilter = $('#priceList')
  let prices = getPriceFilterOptions(allTechList)
  prices.forEach(function(i) {
    if (i){
      let option = "<option>"+ i + "</option>"
      priceFilter.append(option)
    }
  });

  let maintFilter = $('#maintain')
  let complexities = getMaintainFilterOptions(allTechList)
  complexities.forEach(function(i) {
    if (i){
      let option = "<option>"+ i + "</option>"
      maintFilter.append(option)
    }
  });

  let impFilter = $('#implement')
  let imps = getImplementFilterOptions(allTechList)
  imps.forEach(function(i) {
    if (i){
      let option = "<option>"+ i + "</option>"
      impFilter.append(option)
    }
  });
}
 

function filtering(){
  let price = document.getElementById("priceList");
  let priceVal = price.options[price.selectedIndex].value;  
  console.log(priceVal)

  let maint = document.getElementById("maintain");
  let maintVal = maint.options[maint.selectedIndex].value;

  let imp = document.getElementById("implement");
  let impVal = imp.options[imp.selectedIndex].value; 

  let currFilter = []

  allTechList.forEach(function(tool) {
    if ((tool.priceModel==priceVal || priceVal=='All')&&(tool.maint==maintVal || maintVal=='All') 
    &&(tool.imp==impVal || impVal=='All')){
      currFilter.push(tool)
    }
  })
  refreshLists()
  renderItems(currFilter)
  return;
  
}

function refreshLists(){
  var toolLists = document.getElementById('tagId')
  toolLists.innerHTML=''
  var nav = document.getElementById('tagNav')
  nav.innerHTML=''
  // var pm = document.getElementById('priceList')
  // pm.innerHTML=''
  // var maint = document.getElementById('maintain')
  // maint.innerHTML=''
  // var imp = document.getElementById('implement')
  // imp.innerHTML=''
}


