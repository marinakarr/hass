

document.addEventListener("DOMContentLoaded", () => {

    fetchTechList();
  });
  
  //retrieve doc element
  function el(id) {
    return document.getElementById(id);
  }
  
  //renders a single tag list object and appends list to html list element, tagId
  function renderEachTag(tag) {
    const tagUl = document.createElement("ul");
    tagUl.setAttribute("class", "list-group");
    tagUl.setAttribute('style', 'lists')
    tagUl.setAttribute("id", tag);
    tagUl.innerText = tag;
    document.getElementById("tagId").appendChild(tagUl);

    const tagLink = document.createElement("a");
    tagLink.setAttribute("class", "nav-item p-3");
    tagLink.innerText = tag;
    tagLink.href = '#'+tag;
    document.getElementById('tagNav').append(tagLink);
  }

  
  function fetchTechList() {
    let tagsArray = [];
    fetch("https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Technology%20List/", {
      headers: {
        Authorization: "Bearer keyemv7utChwq4g5e",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        for (let i in json.records) {
          tagsArray.push(json.records[i]["fields"]["Tags"]);
        }
  
        let allTagsArray = tagsArray.toString().split(",");
        let uniqueTagsArray = new Set(allTagsArray)
  
        //render each tag and get relevant tech sites
        for (let j of uniqueTagsArray) {
          renderEachTag(j);
          addTechNamesToTags(j);
        }
  
        //
        function addTechNamesToTags(tag) {
          for (let i in json.records) {
            if (json.records[i]["fields"]["Tags"].includes(tag)) {
              let toolName = json.records[i]["fields"]["Name"];
              let toolId = json.records[i]['id'];
              const toolNameLi = document.createElement("a");
              toolNameLi.setAttribute("class", "list-group-item");
              toolNameLi.setAttribute("id", toolId);
              toolNameLi.innerText = toolName;
              toolNameLi.href = `./techdetail.html?${toolId}`;
              toolNameLi.target = "_blank";
              document.getElementById(tag).append(toolNameLi);
            }
          }
        }
      });
  }
  
  