"use strict" 

/**
 * this functions adds the drag-and-drop-event to the task.
 */
let drag_and_drop_event_hinzufuegen = function () {
    let task_list = document.querySelectorAll(".task");
    let items = Array.from(task_list)
    if (items.length !== 0) {
        items.length = 0
        items = document.querySelectorAll(".task");
    };
    
    let drop_area_list = document.querySelectorAll(".drop-area");
    let drop_areas = Array.from(drop_area_list)
    if (drop_areas.length !== 0) {
        drop_areas.length = 0
        drop_areas = document.querySelectorAll(".drop-area");
    };
     
    function handleDragStart(e) {
        this.style.opacity = '0.4';
        e.dataTransfer.setData("text/plain", e.target.id + " " + e.target.nextElementSibling.id)
        e.dataTransfer.effectAllowed = "move";
    };
      
    function handleDragEnd(e) {
        this.style.opacity = '1';
        items.forEach(function (item) {
            item.classList.remove('over');
        });
        speichern()
    };

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    };

    function handleDragEnter(e) {
        this.classList.add("over");
    };

    function handleDragLeave(e) {
        this.classList.remove("over");
    };

    function handleDrop(e) {
        e.stopImmediatePropagation(); // stops the browser from redirecting.
        e.target.classList.remove("over")
        let dragged_item = e.dataTransfer.getData("text")
        let dragged_items_arr = dragged_item.split(" ")
        let dragged_task = document.getElementById(dragged_items_arr[0])
        let dragged_drop_zone = document.getElementById(dragged_items_arr[1])
        e.target.insertAdjacentElement("afterend", dragged_task);
        dragged_task.insertAdjacentElement("afterend", dragged_drop_zone)

        return false;
    };

    items.forEach(function (i) {
        i.addEventListener('dragstart', handleDragStart);
        i.addEventListener('dragend', handleDragEnd);
    });

    drop_areas.forEach(function (j) {
        j.addEventListener('dragover', handleDragOver);
        j.addEventListener('dragenter', handleDragEnter);
        j.addEventListener('dragleave', handleDragLeave);
        j.addEventListener('drop', handleDrop)
    });
}