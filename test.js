let profilesLocal = "profiles";
let skillsLocal = "skills";

const techContent = document.getElementById("tech-content");
const projectContent = document.getElementById("project-content");

function renderTech() {
  stringHTML = ``;
  let creatTech = JSON.parse(localStorage.getItem(skillsLocal));
  for (let i in creatTech) {
    stringHTML += `
         <li>
          <a href="#" title="${creatTech[i].name}"
            ><img src="${creatTech[i].image}" alt="icon-program" 
          /></a>
        </li>
        `;
  }
  techContent.innerHTML = stringHTML;
}
renderTech();


// RENDER ra PROFILE
function renderProfile() {
  stringHTML = ``;
  let creatProfile = JSON.parse(localStorage.getItem(profilesLocal));
  for (let i in creatProfile) {
    stringHTML += `
   <div class="project-container">
          <img src="${creatProfile[i].image}" />
          <div class="description">
            <div class="description-text">
              <h3>${creatProfile[i].name}</h3>
              <p>
                ${creatProfile[i].description}
              </p>
              <p>Tech stack : HTML , JavaScript, SASS, React</p>
            </div>
            <div class="project-link">
              <span>
                <a href="#"
                  ><img
                    src="./images/images-icon/Link-mini.png"
                    alt="icon-program" /></a
                ><a href="#"><u>Live Preview</u></a>
              </span>
              <span>
                <a href="${creatProfile.github}"
                  ><img
                    src="./images/images-icon/Github-mini.png"
                    alt="icon-program" /></a
                ><a href="${creatProfile.github}"><u>View Code</u></a>
              </span>
            </div>
          </div>
        </div>
          `;
  }
  projectContent.innerHTML = stringHTML;
}
renderProfile();
