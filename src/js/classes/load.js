"use strict" 

window.onload = function () {
    let kanban_board_container = document.querySelector("#kanban-board-container")
    kanban_board_container.innerHTML = `${localStorage.getItem('kanban_board_container')}`

    let task_list = document.querySelectorAll(".task")

    task_list.forEach(function (task) {
        remove_event_hinzufuegen(task);
        editable_event_hinzufuegen(task);
        change_prio_event_hinzufuegen(task)
        drag_and_drop_event_hinzufuegen();
    }); 

    let add_task_buttons = document.querySelectorAll(".add-task-button");

    add_task_buttons.forEach(e => {
        e.addEventListener("click", e => {
            html_generieren(e);
            drag_and_drop_event_hinzufuegen();
            speichern()
        })
    });

}