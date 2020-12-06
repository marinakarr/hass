

document.addEventListener("DOMContentLoaded", () => {
    fetchTechList();
  });
  
  //retrieve doc element
  function el(id) {
    return document.getElementById(id);
  }
  
  //renders a single tag list object and appends list to html list element, tagId
  function renderEachTag(tag, id) {
    //TODO : modify tag IDs to not use special characters, 'telehelp/televet' wont collapse because of space

    const item = document.createElement('div');
    item.setAttribute('class', 'tagList');
    item.setAttribute("id", id);

    const button = document.createElement('button');
    button.innerText = tag;
    button.setAttribute('data-toggle', 'collapse');
    button.setAttribute('class', 'button')
    button.setAttribute('data-target', '#'+id+'Collapse')

    item.append(button)

    const collapseContainer = document.createElement('div')
    collapseContainer.setAttribute('class', 'collapse show')
    collapseContainer.setAttribute('id', id+'Collapse')

    const tagUl = document.createElement("ul");
    tagUl.setAttribute("class", "list-group");
    tagUl.setAttribute('id', id+'Child')
    //tagUl.setAttribute('style', 'lists')

    collapseContainer.appendChild(tagUl)
    item.append(collapseContainer) 
    $("#tagId").append(item);


    const tagLink = document.createElement("a");
    tagLink.setAttribute("class", "nav-item p-3");
    tagLink.innerText = tag;
    tagLink.href = '#'+id;
    $('#tagNav').append(tagLink);
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
        let uniqueTagsArray = new Set(allTagsArray.sort())
  
  
        //render each tag and get relevant tech sites
        for (let j of uniqueTagsArray) {
          tagId=j.replace(" ", "")
          tagId=encodeURIComponent(tagId)

          renderEachTag(j, tagId);
          addTechNamesToTags(j, tagId);
        }
  
        function addTechNamesToTags(tag, id) {
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
              document.getElementById(id+'Child').append(toolNameLi);
            }
          }
        }
      });
  }


  