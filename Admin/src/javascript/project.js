/*modal */
const modal = document.getElementById("jsModal");
const btnAdd = document.getElementById("btnAdd");
const btnClose = document.getElementById("btnIcon");
const formModal = document.getElementById("formModal");
const tbodyProfile = document.getElementById("projectBody");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const profileTitle = document.getElementById("profileTitle");

const nameProfile = document.getElementById("nameProfile");
const imageProfile = document.getElementById("imageProfile");
const technology = document.getElementById("technology");
const githubProfile = document.getElementById("githubProfile");
const description = document.getElementById("description");

let profilesLocal = "profiles";
let idUpdate = null;

btnAdd.onclick = function () {
  modal.classList.remove("form-hidden");
  let error = document.getElementsByClassName("error-name");
  for (let i in error) {
    error[i].innerHTML = "";
  }
};

btnClose.onclick = function () {
  modal.classList.add("form-hidden");
};

btnCancel.onclick = function () {
  modal.classList.add("form-hidden");
  nameProfile.value = "";
  imageProfile.value = "";
  technology.value = "";
  githubProfile.value = "";
  description.value = "";
  profileTitle.innerText = "Thêm Dự án";
  idUpdate = null;

  btnSubmit.innerText = "Thêm";
};

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  if (idUpdate) {
    const profiles = JSON.parse(localStorage.getItem(profilesLocal));
    const profileCheck = checkErrors();
    if (!profileCheck) {
      return;
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sửa thành công Dự án",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const indexUpdate = profiles.findIndex((index) => index.id === idUpdate);
    profiles[indexUpdate].name = nameProfile.value;
    profiles[indexUpdate].image = imageProfile.value;
    profiles[indexUpdate].technology = technology.value;
    profiles[indexUpdate].github = githubProfile.value;
    profiles[indexUpdate].description = description.value;
    localStorage.setItem(profilesLocal, JSON.stringify(profiles));
    btnCancel.click();
    idUpdate = null;
    renderProfiles();
    return;
  }

  let id = 1;
  const profiles = JSON.parse(localStorage.getItem(profilesLocal)) || [];
  if (profiles.length > 0) {
    id = profiles[profiles.length - 1].id + 1;
  }

  let profileCheck = checkErrors();
  if (!profileCheck) {
    return;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thêm thành công dự án",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const profile = {
    id,
    name: nameProfile.value,
    image: imageProfile.value,
    technology: technology.value,
    github: githubProfile.value,
    description: description.value,
  };
  profiles.push(profile);
  localStorage.setItem(profilesLocal, JSON.stringify(profiles));
  (nameProfile.value = ""),
    (imageProfile.value = ""),
    (technology.value = ""),
    (githubProfile.value = ""),
    (description.value = ""),
    modal.classList.add("form-hidden");
  renderProfiles();
});

function renderProfiles() {
  let profiles = JSON.parse(localStorage.getItem(profilesLocal));
  let stringHTML = ``;
  for (let i in profiles ) {
    stringHTML += `
        <tr>
            <td class="table-td">${+i + 1}</td>
            <td class="table-td">${profiles[i].name}</td>
            <td class="table-td">
            <img class="table-imgs-skill" src="${profiles[i].image}" alt="">
            </td>
            <td class="table-td"> ${profiles[i].technology}</td>
            <td class="table-td">  
                <button class="btn icon-update" onclick="updateProfile(${
                  profiles[i].id
                })">
                    Sửa
                </button>      
                <button class="btn icon-btn" onclick="deleteProfile(${
                  profiles[i].id
                })">
                Xóa
                </button>
            </td>
        </tr>
        `;
  }
  tbodyProfile.innerHTML = stringHTML;
}
renderProfiles();

function updateProfile(id) {
  idUpdate = id;
  let error = document.getElementsByClassName("error-name");
  for (let i in error) {
    error[i].innerHTML = "";
  }
  const profiles = JSON.parse(localStorage.getItem(profilesLocal));
  const profileIndex = profiles.findIndex((item) => item.id === id);
  nameProfile.value = profiles[profileIndex].name;
  imageProfile.value = profiles[profileIndex].image;
  technology.value = profiles[profileIndex].technology;
  githubProfile.value = profiles[profileIndex].github;
  description.value = profiles[profileIndex].description;

  modal.classList.remove("form-hidden");
  profileTitle.innerText = "Sửa dự án";
  btnSubmit.innerText = "Sửa";
  renderProfiles();
}

function deleteProfile(id) {
  const result = confirm(`Bạn có muốn xóa dự án ${id} này không ?`);
  if (!result) {
    return;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Xóa thành công dự án",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  const profiles = JSON.parse(localStorage.getItem(profilesLocal));
  const skillIndex = profiles.findIndex((item) => item.id === id);
  profiles.splice(skillIndex, 1);
  localStorage.setItem(profilesLocal, JSON.stringify(profiles));
  renderProfiles();
}

function checkErrors() {
  resetShowError();
  const profiles = JSON.parse(localStorage.getItem(profilesLocal)) || [];
  let flag = true;
  let index = profiles.findIndex((item) => item.name === nameProfile.value);

  if (index !== -1) {
    flag = false;
    showError("errorName", "Tên dự án đã tồn tại");
  }
  if (nameProfile.value === "") {
    flag = false;
    showError("errorName", "* Tên dự án không được để trống");
  }
  if (imageProfile.value === "") {
    flag = false;
    showError("errorImage", "* Hình ảnh không được để trống");
  }
  if (technology.value === "") {
    flag = false;
    showError("errorTechnology", "* Công nghệ không được để trống");
  }
  if (githubProfile.value === "") {
    flag = false;
    showError("errorGithub", "* Link git không được để trống");
  }
  if (description.value === "") {
    flag = false;
    showError("errorDescription", "* Mô tả không được để trống");
  }
  return flag;
}

function showError(id, message) {
  let showMessage = document.getElementById(id);
  showMessage.innerText = message;
}

function resetShowError() {
  let resetError = document.getElementsByClassName("error-name");
  for (let i = 0; i < resetError.length; i++) {
    resetError[i].innerText = "";
  }
}
