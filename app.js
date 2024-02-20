
// https://react-bootstrap.netlify.app/docs/components/pagination/
const posts = document.getElementById("posts");
const currentLimit = document.getElementById("limit");
const btnCuttentLimit = document.getElementById("btn-limit");
const pagination = document.getElementById("pagination");
var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
console.log(getData);

let isEdit = false, editId
showInfo();

let total = getData.length;
let limit = 2;
let page = 1;
let currentPage = 1;
 
const ellipsis = "...";

const btnPages = () => {
  const c = currentPage;
  const t = Math.ceil(getData.length / limit);

  if (t <= 7) {
    const pages = [];
    for (let i = 1; i <= t; i++) pages.push(i);
    return pages;
  } else {
    let pages = [];
    if (c <= 3) {
      pages = [1, + 2, 3, 4, 5, ellipsis, t];
    } else if (c >= t - 3) {
      pages = [1, ellipsis, t - 4, t - 3, t - 2, t - 1, t];
    } else {
      pages = [1, ellipsis, c, c + 1, c + 2, ellipsis, t];
    }
    return pages;
  }
};
setPagination();

function setPagination() {

  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
  const prev = document.createElement("button");
  prev.textContent = "prev";
  prev.classList.add("prev");

  prev.addEventListener("click", () => {
    (--currentPage, limit);
  });

  if (currentPage <= 1 && currentPage == 1) {
    prev.style.display = "none"
  }
  pagination.appendChild(prev);

  btnPages().forEach((i) => {

    const btn = document.createElement("button");
    btn.classList.add("page_i");

    btn.addEventListener("click", () => {

      getItem(i,limit)
      currentPage = 1;

    });

    btn.textContent = i;
    pagination.appendChild(btn);

    if (currentPage == i) {
      btn.classList.add("active");
    }

    if (i == ellipsis) {
      btn.classList.remove("page_i");
      btn.classList.add("bor");
      btn.remove();

      const span = document.createElement("span");
      span.classList.add("btn_dot");
      span.textContent="...";
      pagination.appendChild(span);
    }
  });

  const next = document.createElement("button");
  next.textContent = "next";
  next.classList.add("next");

  next.addEventListener("click", () => {
    getItem(currentPage--)
  });
  
  if (currentPage >= Math.ceil(total / limit)) {
    next.style.display = "none";
  }

  pagination.appendChild(next);
}









newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit',
        modalTitle.innerText = "Fill the Form"
    isEdit = false;
     imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})

file.onchange = function () {
    if (file.files[0].size < 1000000) {
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }
        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file is too large!")
    }
}
function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement =
         `<tr class="employeeDetails">

            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>

            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`
        userInfo.innerHTML += createElement
    })
    
}
showInfo()

function readInfo(pic, name, age, city, email, phone, post, sDate) {
    document.querySelector('.showImg').src = pic,
        document.querySelector('#showName').value = name,
        document.querySelector("#showAge").value = age,
        document.querySelector("#showCity").value = city,
        document.querySelector("#showEmail").value = email,
        document.querySelector("#showPhone").value = phone,
        document.querySelector("#showPost").value = post,
        document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value = City
    email.value = Email,
        phone.value = Phone,
        post.value = Post,
        sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const information = {
        id: Date.now(),
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value
    }

    if (!isEdit) {
        getData.push(information)
    }
    else {
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"

    modal.style.display = "none"
    document.querySelector(".modal-backdrop").remove()
})