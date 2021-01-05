document.addEventListener("DOMContentLoaded", () => {
  let params = location.search;
  let newParams = params.toString().replace("?", "")
  renderTechDetail(newParams);
});

function el(id) {
  return document.getElementById(id);
}

function renderTechDetail(tool) {
  let url = "https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Technology%20List/"+tool
  fetch((url), {
    headers: {
      Authorization: "Bearer keyemv7utChwq4g5e",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
          let website = json["fields"]["Website"];
          let name = json['fields']['Name'];
          let tags = json["fields"]["Tags"];
          let lastUpdated = json["fields"]["Last Updated Time"];
          let description = json["fields"]["Description"];
          let awio = json["fields"]["Animal Welfare Industry Only"];
          let contact = json["fields"]["Contact"];
          let contactEmail = json["fields"]["Contact Email"];
          let pricingModel = json["fields"]["Pricing Model"];
          let pricingDetails = json["fields"]["Pricing Details"];
          let attachments = json["fields"]["Attachments"];
          let caseStudies = json["fields"]["Case Studies"];

          let toolLi = document.createElement("li");
          toolLi.innerText = name;
          el("tool").appendChild(toolLi);

          let toolLi1 = document.createElement("li");
          toolLi1.innerText = name;
          el("toolPage").append(toolLi1);

          let websiteLi = document.createElement("a");
          websiteLi.setAttribute("class", "notbold");
          websiteLi.innerText = website;
          websiteLi.title = "Click here";
          websiteLi.href = website;
          websiteLi.target = "_blank";
          el("website").appendChild(websiteLi);

          tags.forEach((tag) => {
            let tagA = document.createElement("a");
            tagA.setAttribute("class", "notbold");
            tagA.innerText = `${tag}\u00A0\u00A0\u00A0`;
            tagA.title = "Click here";
            tagA.href = `./techlist2.html?${tag}`;
            tagA.target = "_self";
            el("tags").appendChild(tagA);
          });

          let updatedSpan = document.createElement("span");
          updatedSpan.setAttribute("class", "notbold");
          updatedSpan.innerText = lastUpdated;
          el("updatedLast").appendChild(updatedSpan);

          let descriptionSpan = document.createElement("span");
          descriptionSpan.setAttribute("class", "notbold");
          descriptionSpan.innerText = description;
          el("description").appendChild(descriptionSpan);

          let awioSpan = document.createElement("span");
          awioSpan.setAttribute("class", "notbold");
          if (awio === undefined) {
            awioSpan.innerText = "No";
          } else {
            awioSpan.innerText = "Yes";
          }
          el("awio").appendChild(awioSpan);

          let contactSpan = document.createElement("span");
          contactSpan.setAttribute("class", "notbold");
          contactSpan.innerText = contact;
          el("contact").appendChild(contactSpan);

          
          if (contactEmail !== undefined) {
            let contactEmailA = document.createElement("a");
            contactEmailA.setAttribute("class", "notbold");
            document.getElementById("email").append("Contact Email: ");
            contactEmailA.innerText = contactEmail;
            contactEmailA.title = "Click here";
            contactEmailA.href = `mailto:${contactEmail}`;
            el("email").appendChild(contactEmailA);
          }
          

          'look here to change the no one to invisible section'
          'change made, moved el("model") line to else stmt'
          
          if((pricingModel!==undefined) || (pricingDetails!==undefined )) {
            document.getElementById("pricingHeader").append("Pricing");
          }


          if (pricingModel !== undefined) {
            let pricingModelSpan = document.createElement("span");
            pricingModelSpan.setAttribute("class", "notbold");
            document.getElementById("model").append("Pricing Model: ");
            pricingModelSpan.innerText = pricingModel;
            el("model").appendChild(pricingModelSpan);
          }
          

          
          
          if (pricingDetails !== undefined) {
            let pricingDetailsSpan = document.createElement("span");
            pricingDetailsSpan.setAttribute("class", "notbold");
            document.getElementById("details").append("Pricing Details: ");
            pricingDetailsSpan.innerText = pricingDetails;
            el("details").appendChild(pricingDetailsSpan);
          }
          

          
          if (attachments !== undefined) {
            
            let attachmentsA = document.createElement("a");
            attachmentsA.setAttribute("class", "notbold");
            document.getElementById("attachmentsHeader").append("Attachments");
            for (let i of attachments) {
              attachmentsA.innerText = i.url;
              attachmentsA.title = "Click here";
              attachmentsA.href = i.url;
              attachmentsA.target = "_self";
            }
            el("attachments").appendChild(attachmentsA);
            document.getElementById("attachments").append("")
          }
          

          
          if (caseStudies === undefined) {
            //caseStudiesA.innerText = "None";
            //el("caseStudies").appendChild(caseStudiesA);
          } else {
            let caseStudiesA = document.createElement("a");
            
            for (let i of caseStudies) {
              renderCaseStudies(i);
            }
            document.getElementById("caseStudyHeader").append("Case Studies");
            document.getElementById("caseStudyExamples").append("Examples:  ");
          }
        }
      
    );
}

function renderCaseStudies(study) {
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
      let studyTitle = json["fields"]["Title"];
      let caseStudiesLi = document.createElement("li");
      caseStudiesLi.setAttribute('id', studyTitle);
      el("caseStudies").appendChild(caseStudiesLi);

      let caseStudiesA = document.createElement("a");
      caseStudiesA.innerText = studyTitle;
      caseStudiesA.title = "Click here";
      caseStudiesA.href = `./techcasestudy.html?${study}`;
      caseStudiesA.target = "_self";
      el(studyTitle).appendChild(caseStudiesA);
    });
}
