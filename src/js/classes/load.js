"use strict" 

/**
 * loads the HTML of the Kanban-board from localStorage and adds all Events of the application
 */
if (localStorage.getItem("kanban_board_container") !== null) {
    window.onload = function () {

        let kanban_board_container = document.querySelector("#kanban-board-container")
        kanban_board_container.innerHTML = `${localStorage.getItem('kanban_board_container')}`

        let task_list = document.querySelectorAll(".task")
        task_list.forEach(function (task) {
            remove_event_hinzufuegen(task);
            editable_event_hinzufuegen(task);
            change_prio_event_hinzufuegen(task)
            drag_and_drop_event_hinzufuegen();
            remove_selected(task.querySelector(".priority"))
            prio_korrigieren(task.querySelector(".priority"))  
        }); 
    
        let add_task_buttons = document.querySelectorAll(".add-task-button");
        add_task_buttons.forEach(button => {
            button.addEventListener("click", button => {
                html_generieren(button);
                drag_and_drop_event_hinzufuegen();
                speichern()
            })
        });
    }
}

