$(function () {
    let allStudents = [];

    if (JSON.parse(localStorage.getItem("allStudents") != null)) {
        allStudents = JSON.parse(localStorage.getItem("allStudents"));
    }
    $(document).on("click", ".open-modal", function (e) {
        e.preventDefault();
        $(".update-btn").addClass("d-none");
        $(".save-btn").removeClass("d-none");

        $(".name").val("");
        $(".surname").val("");

        $(".for-updating").html("Student Informations")
        $(".save-btn").html("Save");
    })

    $(document).on("click", ".save-btn", function (e) {
        e.preventDefault();
        if ($(".name").val().length == 0 && $(".surname").val().length == 0) {
            $(".surname-empty").removeClass("d-none")
            $(".name-empty").removeClass("d-none")
        } else if ($(".name").val().length == 0 && $(".surname").val().length != 0) {
            $(".name-empty").removeClass("d-none")
        } else if ($(".name").val().length != 0 && $(".surname").val().length == 0) {
            $(".surname-empty").removeClass("d-none")
        } else {
            $(".surname-empty").addClass("d-none")
            $(".name-empty").addClass("d-none")
            allStudents.push({
                id: randomIdSelector(),
                name: $(".name").val(),
                surname: $(".surname").val()
            })
            localStorage.setItem("allStudents", JSON.stringify(allStudents));
            addToTable();
            close();
            Swal.fire({
                position: 'top-origin',
                icon: 'success',
                title: 'Student added',
                showConfirmButton: false,
                timer: 2000
            })
            $(".name").val("");
            $(".surname").val("");
        }
    })

    $(document).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().remove()

        let selectedItem = allStudents.find(m => m.id == $(this).parent().parent().parent().attr("data-id"));
        let indexOfSelectedItem = allStudents.indexOf(selectedItem);
        if (indexOfSelectedItem > -1) {
            allStudents.splice(indexOfSelectedItem, 1)
        }
        localStorage.setItem("allStudents", JSON.stringify(allStudents));
        Swal.fire({
            position: 'top-origin',
            icon: 'error',
            title: 'Successfully Deleted',
            showConfirmButton: false,
            timer: 2000
        })
    })

    $(document).on("click", ".update", function () {
        $(".update-btn").removeClass("d-none");
        $(".save-btn").addClass("d-none");

        $(".for-updating").html("Update Informations")
        $(".save-btn").html("Update");
        let selectedItem = allStudents.find(m => m.id == $(this).attr("data-id"));

        $(".name").val(selectedItem.name);
        $(".surname").val(selectedItem.surname);

        $(document).on("click", ".update-btn", function (e) {
            let updatedName = $(".name").val();
            let updatedSurname = $(".surname").val();

            selectedItem.name = updatedName;
            selectedItem.surname = updatedSurname;

            localStorage.setItem("allStudents", JSON.stringify(allStudents));
            addToTable();
            $(document).off("click", ".update-btn")
            close();
            Swal.fire({
                position: 'top-origin',
                icon: 'warning',
                title: 'Updated',
                showConfirmButton: false,
                timer: 2000
            })
        })
    })


    function randomIdSelector() {
        let ID = Math.floor((Math.random() * 10000) + 1);
        return ID;
    }

    function addToTable() {
        let allStudents = JSON.parse(localStorage.getItem("allStudents"))
        $("tbody").html("");
        let body = $("tbody").html();
        for (const eachStudent of allStudents) {
            body += `<tr data-id="${eachStudent.id}">
            <td>${eachStudent.name}</td>
            <td>${eachStudent.surname}</td>
            <td>
                <div class="delete-option">
                    <i class="fa-solid fa-trash delete"></i>
                </div>
                <div class="update-option">
                    <i data-id="${eachStudent.id}" class="fa-regular fa-pen-to-square update" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"></i>
                </div>
            </td>
        </tr>`
        }
        $("tbody").html(body)
    }
    addToTable();

    function close() {
        $(".close").click()
    }
});