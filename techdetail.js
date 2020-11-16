document.addEventListener("DOMContentLoaded", () => {
  let params = location.search;
  //console.log(decodeURI(params).replace("?", ""))
  //let newParams = decodeURI(params).replace("?", "")
  let newParams = params.toString().replace("?", "")//.replace(/\%20/g, " ");
  console.log(newParams)
  renderTechDetail(newParams);
});

function el(id) {
  return document.getElementById(id);
}

function renderTechDetail(tool) {
  let url = "https://api.airtable.com/v0/appT5nNiLF8Dr1wwj/Technology%20List/"+tool
  console.log(url)
  fetch((url), {
    headers: {
      Authorization: "Bearer keyemv7utChwq4g5e",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      //for (let i in json.records) {
        //if (json.records[i]["fields"]["Name"] === tool) {
          let website = json["fields"]["Website"];
          let tags = json["fields"]["Tags"];
          let description = json["fields"]["Description"];
          let awio = json["fields"]["Animal Welfare Industry Only"];
          let contact = json["fields"]["Contact"];
          let contactEmail = json["fields"]["Contact Email"];
          let pricingModel = json["fields"]["Pricing Model"];
          let pricingDetails = json["fields"]["Pricing Details"];
          let attachments = json["fields"]["Attachments"];
          let caseStudies = json["fields"]["Case Studies"];

          let toolLi = document.createElement("li");
          toolLi.innerText = tool;
          el("tool").appendChild(toolLi);

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
            tagA.href = `./techlist.html?${tag}`;
            tagA.target = "_blank";
            el("tags").appendChild(tagA);
          });

          let descriptionSpan = document.createElement("span");
          descriptionSpan.setAttribute("class", "notbold");
          descriptionSpan.innerText = description;
          el("description").appendChild(descriptionSpan);

          let awioSpan = document.createElement("span");
          awioSpan.setAttribute("class", "notbold");
          if (awio === undefined) {
            awioSpan.innerText = "false";
          } else {
            awioSpan.innerText = awio;
          }
          el("awio").appendChild(awioSpan);

          let contactSpan = document.createElement("span");
          contactSpan.setAttribute("class", "notbold");
          contactSpan.innerText = contact;
          el("contact").appendChild(contactSpan);

          let contactEmailA = document.createElement("a");
          contactEmailA.setAttribute("class", "notbold");
          if (contactEmail === undefined) {
            contactEmailA.innerText = "None";
          } else {
            contactEmailA.innerText = contactEmail;
            contactEmailA.title = "Click here";
            contactEmailA.href = `mailto:${contactEmail}`;
          }
          el("email").appendChild(contactEmailA);

          let pricingModelSpan = document.createElement("span");
          pricingModelSpan.setAttribute("class", "notbold");
          if (pricingModel === undefined) {
            pricingModelSpan.innerText = "None";
          } else {
            pricingModelSpan.innerText = pricingModel;
          }
          el("model").appendChild(pricingModelSpan);

          let pricingDetailsSpan = document.createElement("span");
          pricingDetailsSpan.setAttribute("class", "notbold");
          if (pricingDetails === undefined) {
            pricingDetailsSpan.innerText = "None";
          } else {
            pricingDetailsSpan.innerText = pricingDetails;
          }
          el("details").appendChild(pricingDetailsSpan);

          let attachmentsA = document.createElement("a");
          attachmentsA.setAttribute("class", "notbold");
          if (attachments === undefined) {
            attachmentsA.innerText = "None";
          } else {
            for (let i of attachments) {
              attachmentsA.innerText = i.url;
              attachmentsA.title = "Click here";
              attachmentsA.href = i.url;
              attachmentsA.target = "_blank";
            }
          }
          el("attachments").appendChild(attachmentsA);

          let caseStudiesA = document.createElement("a");
          if (caseStudies === undefined) {
            caseStudiesA.innerText = "None";
            el("caseStudies").appendChild(caseStudiesA);
          } else {
            for (let i of caseStudies) {
              renderCaseStudies(i);
            }
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
      caseStudiesA.target = "_blank";
      el(studyTitle).appendChild(caseStudiesA);
    });
}
