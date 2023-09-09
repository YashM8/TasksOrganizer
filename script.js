$(function() {
    // Function to add a new empty row
    function addEmptyRow() {
        const tbody = $("#task-table tbody");
        const rowCount = tbody.find("tr").length + 1 - 1; // Calculate the row number
        const newRow = $("<tr>", {
            class: "task-row"
        });

        $("<td>", {
            class: "task-number",
            text: rowCount // Set the row number
        }).appendTo(newRow);

        $("<td>", {
            class: "task",
            contenteditable: true // Enable cell editing
        }).appendTo(newRow);

        $("<td>", {
            class: "date",
            contenteditable: true // Enable cell editing
        }).appendTo(newRow);

        $("<td>", {
            class: "notes",
            contenteditable: true // Enable cell editing
        }).appendTo(newRow);

        newRow.appendTo(tbody);
    }

    // Add Row when SHIFT + RETURN (Enter) key is pressed
    $(document).keydown(function(event) {
        if (event.shiftKey && event.which === 13) {
            addEmptyRow();
            event.preventDefault(); // Prevent the default Enter key behavior
        }
    });

    // Arrow key navigation within the table
    $("#task-table").on("keydown", "td[contenteditable=true]", function(event) {
        const td = $(this);
        const tr = td.closest("tr");
        const tdIndex = td.index();
        const trIndex = tr.index();
        const numRows = $("#task-table tbody tr").length;

        switch (event.which) {
            case 37: // Left arrow
                if (tdIndex > 0) {
                    tr.find("td").eq(tdIndex - 1).focus();
                } else if (trIndex > 0) {
                    $("#task-table tbody tr").eq(trIndex - 1).find("td:last").focus();
                }
                break;
            case 38: // Up arrow
                if (trIndex > 0) {
                    $("#task-table tbody tr").eq(trIndex - 1).find("td").eq(tdIndex).focus();
                }
                break;
            case 39: // Right arrow
                if (tdIndex < 3) {
                    tr.find("td").eq(tdIndex + 1).focus();
                } else if (trIndex < numRows - 1) {
                    $("#task-table tbody tr").eq(trIndex + 1).find("td:first").focus();
                }
                break;
            case 40: // Down arrow
                if (trIndex < numRows - 1) {
                    $("#task-table tbody tr").eq(trIndex + 1).find("td").eq(tdIndex).focus();
                }
                break;
            default:
                break;
        }
    });

    // Add Row button click event
    $("#add-row-button").click(addEmptyRow);
});
