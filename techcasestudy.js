document.addEventListener("DOMContentLoaded", () => {
  // let params = new URLSearchParams(location.search);
  // let newParams = params.toString().replace("=", "").replace(/\+/g, " ");
  let params = location.search.replace("?", "");
  renderCaseStudyPage(params);

  console.log("Hi everybody!");
});

function el(id) {
  return document.getElementById(id);
}

function renderTechnology(tech) {
  fetch(
    `https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Technology%20List/${tech}`,
    {
      headers: {
        Authorization: "Bearer keyemv7utChwq4g5e",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      let caseStudyTech = json["fields"]["Name"];
      let studyTech = history.back
      console.log(studyTech);
      let technologyA = document.createElement("a");
      document.getElementById(tech)
      technologyA.setAttribute("class", "notbold");
      technologyA.innerText = caseStudyTech;
      technologyA.title = "Click here";
      technologyA.href = `./techdetail.html?${caseStudyTech}`;
      technologyA.target = "_blank";
      el("technology").appendChild(technologyA);
      el("toolName").append(caseStudyTech);
      //el("toolName").setAttribute("href", document.referrer)

    });
}

function renderTags(taglist) {
  for (let i of taglist) {
    let tagsA = document.createElement("a");
    tagsA.setAttribute("class", "notbold");
    tagsA.innerText = `${i}\u00A0\u00A0\u00A0`;
    tagsA.title = "Click here";
    tagsA.href = `./techlist2.html`;
    tagsA.target = "_blank";
    el("tags").appendChild(tagsA);
  }
}

function renderCaseStudyPage(study) {
  fetch(
    `https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Case%20Studies/${study}`,
    {
      headers: {
        Authorization: "Bearer keyemv7utChwq4g5e",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
    
      let title = json["fields"]["Title"];
      let desc = json["fields"]["Notes"];
      let org = json["fields"]["Organization"];
      let orgType = json["fields"]["Organization Type"];
      let contactName = json["fields"]["Contact Name"];
      let contactEmail = json["fields"]["Contact Email"];
      let date = json["fields"]["Case Study Date"];
      let technology = json["fields"]["Technology"];
      let tags = json["fields"]["Tags (from Technology List)"];
      let dependencies = json["fields"]["Supporting Tech (duplicate of Technology Dependencies?)"];
      let cost = json["fields"]["Cost"];
      let discount = json["fields"]["Discount for Nonprofits?"];
      let usage = json["fields"]["Step by Step Journey (Usage)"];
      let implementation = json["fields"]["Step by Step Journey (Implementation)"];
      let quickStartGuide = json["fields"]["Quick Start Guide"];
      let ratingOverall = json["fields"]["Rating (1-5) - Overall Satisfaction"];
      let ratingEaseOfUse = json["fields"]["Rating (1-5) - Ease of Use"];
      let ratingEaseOfDeployment = json["fields"]["Rating (1-5) - Ease of Deployment"];
      let ratingCostValue = json["fields"]["Rating (1-5) - Cost / Value"];

      let titleSpan = document.createElement("span");
      titleSpan.setAttribute("class", "notbold");
      titleSpan.innerText = title;
      el("title").appendChild(titleSpan);

      let descSpan = document.createElement("span");
      descSpan.setAttribute("class", "notbold");
      descSpan.innerText = desc;
      el("desc").appendChild(descSpan);

      
      
      if(  org !== undefined){
        let orgSpan = document.createElement("span");
        orgSpan.setAttribute("class", "notbold");
        orgSpan.innerText = org;
        document.getElementById("organization").append("Organization: ");
        el("organization").appendChild(orgSpan);
        
      }
      

      // follow this setup for rest of the attributes
      if (orgType !== undefined) {
        let orgTypeSpan = document.createElement("span");
        orgTypeSpan.setAttribute("class", "notbold");
        orgTypeSpan.innerText = orgType;
        document.getElementById("organizationType").append("Organization Type: ");
        el("organizationType").appendChild(orgTypeSpan);
      }
      

      
      if (contactName !== undefined) {
        let contactNameSpan = document.createElement("span");
        contactNameSpan.setAttribute("class", "notbold");
        document.getElementById("contactName").append("Contact Name: ");
        contactNameSpan.innerText = contactName;
        el("contactName").appendChild(contactNameSpan);
      }
      

      
      if (contactEmail !== undefined) {
        let contactEmailA = document.createElement("a");
        contactEmailA.setAttribute("class", "notbold");
        document.getElementById("contactEmail").append("Contact Email: ");
        console.log();
        contactEmailA.innerText = contactEmail;
        contactEmailA.href = `mailto:${contactEmail}`;
        contactEmailA.title = "Click Here";
        contactEmailA.target = "_blank";
        el("contactEmail").appendChild(contactEmailA);
      }
      

      
      if (date !== undefined) {
        let dateSpan = document.createElement("span");
        dateSpan.setAttribute("class", "notbold");
        document.getElementById("date").append("Case Study Date: ");
        dateSpan.innerText = date;
        el("date").appendChild(dateSpan);
      }
      

      
      if (technology !== undefined) {
        let technologyA = renderTechnology(technology);
        //console.log("Back to main code");
        //technologyA.setAttribute("class", "notbold");
        //console.log("Step 1");
        document.getElementById("technology").append("Technology: ");
        //console.log("Step 2");
        //el("technology").appendChild(technologyA);
        //console.log("Step 3");
      }
      

      
      if (tags !== undefined) {
        document.getElementById("tags").append("Tags (from Technology List): ");
        let tagsA = document.createElement("a");
        tagsA.setAttribute("class", "notbold");
        renderTags(tags);
      }

      
      if (dependencies !== undefined) {
        let dependenciesSpan = document.createElement("span");
        dependenciesSpan.setAttribute("class", "notbold");
        document.getElementById("dependencies").append("Technology Dependencies: ");
        dependenciesSpan.innerText = dependencies;
        el("dependencies").appendChild(dependenciesSpan);
      }
      

      
      if (cost !== undefined) {
        
        let costSpan = document.createElement("span");
        costSpan.setAttribute("class", "notbold");
        document.getElementById("cost").append("Cost: ");
        costSpan.innerText = cost;
        el("cost").appendChild(costSpan);
      }
      

      
      if (discount !== undefined) {
        let discountSpan = document.createElement("span");
        discountSpan.setAttribute("class", "notbold");
        document.getElementById("discount").append("Discounts Offered for Non-Profits: ");
        discountSpan.innerText = discount;
        el("discount").appendChild(discountSpan);
      }
      

      
      if (usage !== undefined) {
        
        let usageSpan = document.createElement("p");
        usageSpan.setAttribute("class", "notbold");
        document.getElementById("usage").append("Step by Step Journey (Usage): ");
        usageSpan.innerText = usage;
        el("usage").appendChild(usageSpan);
      }
      

      
      if (implementation !== undefined) {
        let implementationSpan = document.createElement("p");
        implementationSpan.setAttribute("class", "notbold");
        document.getElementById("implementation").append("Step by Step Journey (Implementation): ");
        implementationSpan.innerText = implementation;
        el("implementation").appendChild(implementationSpan);
      }
      

      
      if (quickStartGuide !== undefined) {
        
        let quickStartGuideA = document.createElement("a");
        quickStartGuideA.setAttribute("class", "notbold");
        document.getElementById("quickStartGuide").append("Quick Start Guide: ");
        console.log();
        quickStartGuideA.innerText = quickStartGuide;
        quickStartGuideA.href = quickStartGuide;
        quickStartGuideA.title = "Click Here";
        quickStartGuideA.target = "_blank";
        el("quickStartGuide").appendChild(quickStartGuideA);
      }
      

      
      if (ratingOverall !== undefined) {
        
        let ratingOverallSpan = document.createElement("span");
        ratingOverallSpan.setAttribute("class", "notbold");
        document.getElementById("ratingOverall").append("Rating (1-5) - Overall Satisfaction: ");
        ratingOverallSpan.innerText = ratingOverall;
        el("ratingOverall").appendChild(ratingOverallSpan);
      }
      

      
      if (ratingEaseOfUse !== undefined) {
        
        let ratingEaseOfUseSpan = document.createElement("span");
        ratingEaseOfUseSpan.setAttribute("class", "notbold");
        document.getElementById("ratingEaseOfUse").append("Rating (1-5) - Ease of Use: ");
        ratingEaseOfUseSpan.innerText = ratingEaseOfUse;
        el("ratingEaseOfUse").appendChild(ratingEaseOfUseSpan);
      }
      

      
      if (ratingEaseOfDeployment !== undefined) {
        let ratingEaseOfDeploymentSpan = document.createElement("span");
        ratingEaseOfDeploymentSpan.setAttribute("class", "notbold");
        document.getElementById("ratingEaseOfDeployment").append("Rating (1-5) - Ease of Deployment: ");
        ratingEaseOfDeploymentSpan.innerText = ratingEaseOfDeployment;
        el("ratingEaseOfDeployment").appendChild(ratingEaseOfDeploymentSpan);
      }
      

      
      if (ratingCostValue === undefined) {
        ratingCostValueSpan.innerText = "None";
      } else {
        let ratingCostValueSpan = document.createElement("span");
        ratingCostValueSpan.setAttribute("class", "notbold");
        document.getElementById("ratingCostValue").append("Rating (1-5) - Cost / Value: ");
        ratingCostValueSpan.innerText = ratingCostValue;
        el("ratingCostValue").appendChild(ratingCostValueSpan);
      }
      
    });
}
