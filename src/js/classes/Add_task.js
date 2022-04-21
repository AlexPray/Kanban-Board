"use strict" 

let add_task_buttons = document.querySelectorAll(".add-task-button");

let remove_event_hinzufuegen = function (task) {
    task.querySelector(".remove-button").addEventListener("click", () => {
        task.nextElementSibling.remove();
        task.remove();
    });
} 

let editable_event_hinzufuegen = function (task) {
    task.querySelector(".titel").addEventListener("dblclick", titel => {
        titel.target.contentEditable = true;
        titel.target.focus();
    });

    task.querySelector(".titel").addEventListener("blur", titel => {
        titel.target.contentEditable = false;
        if(titel.target.innerText !== "-Enter title here-") {
            titel.target.classList.remove("greyed-out")
        }
        
        if(titel.target.innerText === "") {
            titel.target.innerText = "-Enter title here--"
            titel.target.classList.add("greyed-out")
        }
    })

    task.querySelector(".task-description").addEventListener("dblclick", description => {
        description.target.contentEditable = true;
        description.target.focus();
    });

    task.querySelector(".task-description").addEventListener("blur", description => {
        description.target.contentEditable = false;
        if(description.target.innerText !== "-Enter task descripton here-") {
            description.target.classList.remove("greyed-out")
        }
        
        if(description.target.innerText === "") {
            description.target.innerText = "-Enter task descripton here-"
            description.target.classList.add("greyed-out")
        }
    })

}

let change_prio_event_hinzufuegen = function (task) {
    let prio = task.querySelector(".priority")

    prio.addEventListener("change", prio => {
        if( prio.target.value === "high-prio") {
            prio.target.classList.add("high-prio")
            prio.target.classList.remove("selected")
            prio.target.classList.remove("medium-prio")
            prio.target.classList.remove("low-prio")
        }
        if( prio.target.value === "medium-prio") {
            prio.target.classList.add("medium-prio")
            prio.target.classList.remove("selected")
            prio.target.classList.remove("high-prio")
            prio.target.classList.remove("low-prio")
        }
        if( prio.target.value === "low-prio") {
            prio.target.classList.add("low-prio")
            prio.target.classList.remove("selected")
            prio.target.classList.remove("medium-prio")
            prio.target.classList.remove("high-prio")
        }
        speichern()
        
    })
};

let html_generieren = (function(e)  {
    let task = document.createElement("div");
    task.setAttribute("class", "task");    
    let timestamp = Date.now();
    task.setAttribute("id", timestamp);
    task.setAttribute("draggable", "true")

    let titel = document.createElement("h3");
    titel.setAttribute("class", "titel greyed-out");
    titel.textContent = "-Enter title here-"
    task.insertAdjacentElement("afterbegin", titel);

    let description = document.createElement("p");
    description.setAttribute("class", "task-description greyed-out");
    description.textContent = "-Enter task descripton here-"
    titel.insertAdjacentElement("afterend", description);

    // let associate = document.createElement("select");
    // associate.setAttribute("class", "associate");
    // description.insertAdjacentElement("afterend", associate);

    let remove_button_container = document.createElement("div");
    remove_button_container.setAttribute("class", "remove-button-container");
    description.insertAdjacentElement("afterend", remove_button_container);

    let priority = document.createElement("select")
    priority.setAttribute("name", "priority")
    priority.setAttribute("class", "priority selected")

    let selected = document.createElement("option")
    selected.setAttribute("class", "selected")
    selected.setAttribute("value", "choose priority")
    selected.setAttribute("selected", "")
    selected.setAttribute("disabled", "")
    selected.innerText = "Choose priority"
    priority.insertAdjacentElement("afterbegin", selected)


    let high_prio = document.createElement("option")
    high_prio.setAttribute("class", "high-prio")
    high_prio.setAttribute("value", "high-prio")
    high_prio.innerText = "High-prio"
    selected.insertAdjacentElement("afterend", high_prio)

    let medium_prio = document.createElement("option")
    medium_prio.setAttribute("class", "medium-prio")
    medium_prio.setAttribute("value", "medium-prio")
    medium_prio.innerText = "Medium-prio"
    high_prio.insertAdjacentElement("afterend", medium_prio)

    let low_prio = document.createElement("option")
    low_prio.setAttribute("class", "low-prio")
    low_prio.setAttribute("value", "low-prio")
    low_prio.innerText = "Low-prio"
    medium_prio.insertAdjacentElement("afterend", low_prio)

    titel.insertAdjacentElement("beforebegin", priority)

    let empty_div = document.createElement("div");
    empty_div.setAttribute("class", "empty-div");
    remove_button_container.insertAdjacentElement("afterbegin", empty_div);

    let remove_button = document.createElement("input");
    remove_button.setAttribute("type", "image")
    remove_button.setAttribute("src", "./src/img/delete.png")
    remove_button.setAttribute("class", "remove-button");
    empty_div.insertAdjacentElement("afterend", remove_button)

    // let img = document.createElement("img");
    // img.setAttribute("class", "delete-img")
    // img.setAttribute("src", "./src/img/delete.png")
    // remove_button.insertAdjacentElement("afterbegin", img)

    e.target.parentElement.insertAdjacentElement("beforebegin", task)

    remove_event_hinzufuegen(task);
    editable_event_hinzufuegen(task);
    change_prio_event_hinzufuegen(task);

    let new_drop_area = document.createElement("div");
    new_drop_area.setAttribute("class", "drop-area")
    task.insertAdjacentElement("afterend", new_drop_area)
    new_drop_area.setAttribute("id", timestamp + 1);

    return task;
}) 

let speichern = function() {
    let kanban_board_container = document.querySelector("#kanban-board-container")
    localStorage.clear();
    localStorage.setItem("kanban_board_container", kanban_board_container.innerHTML)
};

add_task_buttons.forEach(e => {
    e.addEventListener("click", e => {
        html_generieren(e);
        drag_and_drop_event_hinzufuegen();
        speichern()
    })
});