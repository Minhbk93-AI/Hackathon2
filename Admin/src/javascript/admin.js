/*MODAL */
const modal = document.getElementById("jsModal");
const btnAdd = document.getElementById("btnAdd");
const btnClose = document.getElementById("btnIcon");
const skillName = document.getElementById("name");
const skillImg = document.getElementById("image");
const formModal = document.getElementById("formModal");
const tbodySkill = document.getElementById("skillBody");
const errorImg = document.getElementById("errorImg");
const btnSubmit = document.getElementById("btnSubmit");


let skillsLocal = "skills";

// Ấn vào nút button thêm mới kĩ năng 1 form tạo skills hiện ra 
btnAdd.onclick = function () {
  modal.classList.remove("form-hidden");
  let error = document.getElementsByClassName("error-name");
  for (let i in error) {
    error[i].innerHTML = "";
  }
};

//Ấn vào nút close thì form tạo skills biến mất và các giá trị trong các ô input trong form về rỗng
btnClose.onclick = function () {
  skillName.value = "";
  skillImg.value = "";
  modal.classList.add("form-hidden");
};
// TƯƠNG TỰ ẤN VÀO NÚT CANCEL CŨNG NHƯ NÚT X
btnCancel.onclick = function () {
  skillName.value = "";
  skillImg.value = "";
  modal.classList.add("form-hidden");
};

//THÊM SỰ KIỆN SUBMIT CHO NÚT SUBMIT
formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = 1;

   // Lấy dữ liệu SKILLS trên LOCAL về làm việc
  const skills = JSON.parse(localStorage.getItem(skillsLocal)) || [];
  if (skills.length > 0) {
    id = skills[skills.length - 1].id + 1;
  }

  let skillCheck = checkErrors();
  if (!skillCheck) {
    return;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thêm thành công Kỹ năng",
      showConfirmButton: false,
      timer: 1000,
    });
  }
// TẠO OBJJECT skill có các ATTRIBUTE mẫu id, name, image,Date
  const skill = {
    id: id,
    name: skillName.value,
    image: skillImg.value,
    Date: skillDate(),
  };

  //ĐẨY TỪNG OBJECT SKILL TẠO ĐƯỢC VÀO SKILLS
  skills.push(skill);
  localStorage.setItem(skillsLocal, JSON.stringify(skills));
  skillName.value = "";
  skillImg.value = "";
  modal.classList.add("form-hidden");
  renderSkills();
});

function skillDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedTime = dd + "/" + mm + "/" + yyyy;
  return formattedTime;
}

// Render Skills ra màn hình bằng form dạng Table
function renderSkills() {
  let skills = JSON.parse(localStorage.getItem(skillsLocal));
  let stringHTML = ``;
  for (let i in skills) {
    stringHTML += `
        <tr>
            <td class="table-td">${+i + 1}</td>
            <td class="table-td">${skills[i].name}</td>
            <td class="table-td">
            <img class="table-imgs-skill" src="${skills[i].image}" alt="">
            </td>
            <td class="table-td"> ${skills[i].Date}</td>
            <td class="table-td">        
                <button class="btn icon-btn" onclick="deleteSkill(${
                  skills[i].id
                })">
                Xóa
                </button>
            </td>
        </tr>
        `;
  }
  tbodySkill.innerHTML = stringHTML;
}
renderSkills();

//Xóa  Skill trong table mới tạo
function deleteSkill(id) {
  const result = alert(`Bạn có muốn xóa kỹ năng ${id} này không ?`);
  if (!result) {
    return;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Xóa thành công kỹ năng",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  const skills = JSON.parse(localStorage.getItem(skillsLocal));
  const skillIndex = skills.findIndex((item) => item.id === id);
  skills.splice(skillIndex, 1);
  localStorage.setItem(skillsLocal, JSON.stringify(skills));
  renderSkills();
}

//VALIDATE DỮ LIỆU
function checkErrors() {
  resetShowError();
  const skills = JSON.parse(localStorage.getItem(skillsLocal)) || [];
  let flag = true;
  let index = skills.findIndex((item) => item.name === skillName.value);
  if (index !== -1) {
    flag = false;
    showError("errorName", "Tên kỹ năng đã tồn tại");
  }
  if (skillName.value === "") {
    flag = false;
    showError("errorName", "* Tên kỹ năng không được để trống");
  }
  if (skillImg.value === "") {
    flag = false;
    showError("errorImage", "* Hình ảnh không được để trống");
  }
  return flag;
}


function showError(id, message) {
  let showMessage = document.getElementById(id);
  showMessage.innerText = message;
}

function resetShowError() {
  let resetError = document.getElementsByClassName("error-name");
  for (let i in resetError) {
    resetError[i].innerText = "";
  }
}
