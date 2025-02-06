let list = [];
let count = 0;
function newBT() {
    let mes = prompt("ToDo List Message");
    if (mes && mes.length > 0) {
        let id = count++;
        list.unshift({ id, text: mes });
        gen();
    }
}
function deleteBT(id) {
    let jjj = confirm('Confirm to remove?');
    if (jjj) {
        let newList = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id !== id) {
                newList.push(list[i]);
            }
        }
        list = newList;
        gen();
    }
}
function gen() {
    const addhere = document.getElementById("ft_list");
    addhere.innerHTML = '';
    for (let item of list) {
        addhere.appendChild(genBT(item));
    }
    document.cookie = "list=" + JSON.stringify(list) + "; path=/";
}
function genBT(data) {
    const div = document.createElement('div');
    const btt = document.createElement('button');
    btt.textContent = data.text;
    btt.style.backgroundColor = "transparent";
    btt.style.border = "none";
    btt.onclick = function () { deleteBT(data.id); };
    div.appendChild(btt);
    return div;
}
function getData() {
    let cookie_list = document.cookie.split("; ");
    for (let cookie of cookie_list) {
        let [name, value] = cookie.split("=");
        if (name === "list") {
            list = JSON.parse(value);
            if (list.length > 0) {
                let maxId = 0;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id > maxId) {
                        maxId = list[i].id;
                    }
                }
                count = maxId + 1;
            }
            gen();
            break;
        }
    }
}
window.onload = function () {
    getData();
}