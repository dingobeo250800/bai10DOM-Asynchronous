
// const app = document.getElementById("app")
// const demos = document.getElementsByClassName("app");
// console.log(app);
// for (let demo of demos){
//     console.log(demo);
// }
//properties
//.innerHTML, .innerText, .textContent
// app.innerHTML = "HAHAHAHA";// gán lại giá trị
// app.style.color ="red"
//.style 

//.id

//.classList -> .add(), .toggle(), .contains()

//methods

//.appendChild();

//remove();

//.setAttrivuite();

//.getAttrivuite();

//event
//click event, submit event, keyboard event
// const btn = document.getElementById("btn");
// btn.onclick = function (){
//     alert("hello");
// }
// btn.addEventListener("click", function(){
//     alert("hello 2");
// })
//huỷ sự kiện .removeEventListener

// btn.onclick = function(event){
//     console.log(event.target.parenElement.parenElement.children[0].innerHTML = "hehe");
// }

/////////Asynchronous (Bat dong bo)
const ul = document.getElementById("myUL");
const btn = document.querySelector(".addBtn");
const input = document.querySelector("#myInput");
let size;

let uri = "https://jsonplaceholder.typicode.com/todos";

loadData();
function loadData() {
  let data = fetch(uri);
  data
    .then(function (response, err) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      size = data.length;
      for (let i = 0; i < 50; i++) {
        console.log(data[i].title);
        const li = document.createElement("li");
        li.style.id = data[i].id;
        li.innerHTML = data[i].title;
        ul.appendChild(li);
      }
    });
}

ul.onclick = function (event) {
  console.log(uri + "/" + event.target.style.id);
  if (!event.target.classList.contains("checked")) {
    event.target.classList.add("checked");
    check(uri, event, true);
  } else {
    event.target.classList.remove("checked");
    check(uri, event, false);
  }
};

function check(uri, event, boolean) {
  fetch(uri + "/" + event.target.style.id, {
    method: "PATCH",
    body: JSON.stringify({
      completed: boolean,
    }),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (res, err) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

btn.onclick = function () {
  console.log(input.value);
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      title: input.value,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const li = document.createElement("li");
      li.style.id = data;
      li.innerHTML = data.title;
      ul.appendChild(li);
    });
};