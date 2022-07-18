"use strict" 

/**
 * This function generate the HTML of a new task (incl. the events)
 * above the add-task button
 * @param {Element} add_task_button - The HTML of the add-task-button
 * @returns {Element} The HTML of the new task
 */
let html_generieren = (function(add_task_button)  {
    let task = document.createElement("div");
    task.setAttribute("class", "task");    
    let timestamp = Date.now();
    task.setAttribute("id", timestamp);
    task.setAttribute("draggable", "true")

    let priority = document.createElement("select")
    priority.setAttribute("name", "priority")
    priority.setAttribute("class", "priority selected")
    task.insertAdjacentElement("afterbegin", priority)

    let selected = document.createElement("option")
    selected.setAttribute("class", "selected")
    selected.setAttribute("value", "priority")
    selected.setAttribute("selected", "")
    selected.setAttribute("disabled", "")
    selected.innerText = "Priority"
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

    let associate = document.createElement("select");
    associate.setAttribute("class", "associate");
    priority.insertAdjacentElement("afterend", associate);

    let associate_default = document.createElement("option")
    associate_default.setAttribute("value", "associate")
    associate_default.setAttribute("selected", "")
    associate_default.setAttribute("disabled", "")
    associate_default.innerText = "Associate"
    associate.insertAdjacentElement("afterbegin", associate_default)

    let titel = document.createElement("h3");
    titel.setAttribute("class", "titel greyed-out");
    titel.textContent = "-Enter title here-"
    associate.insertAdjacentElement("afterend", titel);

    let description = document.createElement("p");
    description.setAttribute("class", "task-description greyed-out");
    description.textContent = "-Enter task descripton here-"
    titel.insertAdjacentElement("afterend", description);

    let remove_button_container = document.createElement("div");
    remove_button_container.setAttribute("class", "remove-button-container");
    description.insertAdjacentElement("afterend", remove_button_container);

    let empty_div = document.createElement("div");
    empty_div.setAttribute("class", "empty-div");
    remove_button_container.insertAdjacentElement("afterbegin", empty_div);

    let remove_button = document.createElement("input");
    remove_button.setAttribute("type", "image")
    remove_button.setAttribute("src", "./src/img/delete.png")
    remove_button.setAttribute("class", "remove-button");
    empty_div.insertAdjacentElement("afterend", remove_button)

    /**
     * checks if you clicked the img or the button and 
     * inserts the task in the right position
     */
    if(add_task_button.target.className === "add-task-button" ) {
        add_task_button.target.insertAdjacentElement("beforebegin", task)
    } else {
        add_task_button.target.parentElement.insertAdjacentElement("beforebegin", task)
    }
    
    remove_event_hinzufuegen(task);
    editable_event_hinzufuegen(task);
    change_prio_event_hinzufuegen(task);

    let new_drop_area = document.createElement("div");
    new_drop_area.setAttribute("class", "drop-area")
    task.insertAdjacentElement("afterend", new_drop_area)
    new_drop_area.setAttribute("id", timestamp + 1);

    return task;
}) 

/**
 *This function adds the change-priority-event
 * @param {Element} task the task where the priority is inside
 */
let change_prio_event_hinzufuegen = function (task) {
    let prio = task.querySelector(".priority")
    prio.addEventListener("change", prio => {
        prio_korrigieren(prio.target)
        speichern()
    })
};

/**
 * This function adds the editable-event
 * and gives the title and descripton an conenteditable attribut at dbclick
 * and removes it at blur
 * @param {Element} task - the task where the double klicked titel oder description is inside
 */
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
        speichern()
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
        speichern()
    })

    // if (document.activeElement === task.querySelector(".task-description")) {
    //     task.querySelector(".task-description").select();
    // }
};

/**
 * this function removes the default option from the priority-select-element
 * @param {Element} prio - the priority-select-element
 */
let remove_selected = function (prio) {
    if (prio.querySelector(".selected") !== null && prio.value !== "priority") {
        let selected = prio.querySelector(".selected")
        selected.remove()
    }
}

/**
 * this function adjusts the classes of the priority-select-element
 * to the current priority-option
 * @param {Element} prio - the priority-select-element
 */
let prio_korrigieren = function (prio) {
    remove_selected(prio)

    if( prio.value === "high-prio") {
        prio.classList.add("high-prio")
        prio.classList.remove("selected")
        prio.classList.remove("medium-prio")
        prio.classList.remove("low-prio")
        prio.firstElementChild.removeAttribute("selected")
        prio.querySelector(".high-prio").setAttribute("selected", "")
        prio.querySelector(".medium-prio").removeAttribute("selected", "")
        prio.querySelector(".low-prio").removeAttribute("selected", "")
    }
    if( prio.value === "medium-prio") {
        prio.classList.add("medium-prio")
        prio.classList.remove("selected")
        prio.classList.remove("high-prio")
        prio.classList.remove("low-prio")
        prio.firstElementChild.removeAttribute("selected")
        prio.querySelector(".medium-prio").setAttribute("selected", "")
        prio.querySelector(".high-prio").removeAttribute("selected", "")
        prio.querySelector(".low-prio").removeAttribute("selected", "")
    }
    if( prio.value === "low-prio") {
        prio.classList.add("low-prio")
        prio.classList.remove("selected")
        prio.classList.remove("medium-prio")
        prio.classList.remove("high-prio")
        prio.firstElementChild.removeAttribute("selected")
        prio.querySelector(".low-prio").setAttribute("selected", "")
        prio.querySelector(".high-prio").removeAttribute("selected", "")
        prio.querySelector(".medium-prio").removeAttribute("selected", "")
    }
}

/**
 * this function adds the remove-event to the task
 * which removes the task itself and the attached drop-area
 * @param {Element} task - the HTML of the task
 */
let remove_event_hinzufuegen = function (task) {
    task.querySelector(".remove-button").addEventListener("click", () => {
        task.nextElementSibling.remove();
        task.remove();
        speichern()
    });
} 

let add_task_buttons = document.querySelectorAll(".add-task-button");

/**
 * this method adds the add-task-event to all add-task-buttons
 * where a new task (incl. drag-and-drop-event) above the button will be generated on click
 */
add_task_buttons.forEach(button => {
    button.addEventListener("click", button => {
        html_generieren(button);
        drag_and_drop_event_hinzufuegen();
        speichern()
    })
});

/**
 * this function saves the whole Kanban-board in the localStorage
 */
let speichern = function() {
    let kanban_board_container = document.querySelector("#kanban-board-container")
    localStorage.clear();
    localStorage.setItem("kanban_board_container", kanban_board_container.innerHTML)
};