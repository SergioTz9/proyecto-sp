document.addEventListener('DOMContentLoaded', () => {
    getProcessesNoPublished()
})


//=================== FORM CREATE PROCESS ==============================
const formCreateProcess = document.getElementById('formCreateProcess')
formCreateProcess.addEventListener('submit', e => {
    e.preventDefault()
    fetch(API_URL + '/process', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: formCreateProcess.name.value,
            description: formCreateProcess.description.value,
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        formCreateProcess.reset()
        $('#modalCreateProcess').modal('hide')
        Swal.fire(
            '¡Proceso Creado!',
            '',
            'success'
        )
        getProcessesNoPublished()
    })
})


//============================ GET PROCESSES NO PUBLISHED ============================
const itemsProcessesNoPublished = document.getElementById('itemsProcessesNoPublished')
async function getProcessesNoPublished(){
    const response = await fetch(API_URL + `/process/published/${false}`)
    const processesNoPublished = await response.json()
    console.log(processesNoPublished)

    itemsProcessesNoPublished.innerHTML = ""

    processesNoPublished.forEach(process => {
        itemsProcessesNoPublished.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card card-body bg-gray-300 border-0">
                    <h4>${process.name}</h4>
                    <p class="card-text">${process.description}</p>
                    <div class="btn-icon-list">
                        <button class="btn btn-primary btn-icon editProcess" id="${process.id}"><i class="typcn typcn-edit editProcess" id="${process.id}"></i></button>
                        <button class="btn btn-danger btn-icon deleteProcess" id="${process.id}"><i class="typcn typcn-trash deleteProcess" id="${process.id}"></i></button>
                    </div>
                    
                </div>
            </div>
        `
    })
}
//Edit | Delete -> Process No Published
itemsProcessesNoPublished.addEventListener('click', e => {
    if(e.target.classList.contains('editProcess')){
        const idProcess = e.target.getAttribute('id')
        sessionStorage.setItem('idProcess', idProcess)
        location.href = '../vistas/procesos.html'
    } else if(e.target.classList.contains('deleteProcess')){
        const idProcess = e.target.getAttribute('id')
        deleteProcess(idProcess, false)
    }
})


//======================== DELETE PROCESS ====================
function deleteProcess(idProcess, published){
    /*fetch(API_URL + `/process/${idProcess}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(published == true) return console.log("published")
        getProcessesNoPublished()
    })*/

    Swal.fire({
        title: '¿Estas seguro de eliminar el Proceso?',
        text: "Se eliminaran los pasos que conforman el proceso y todas sus dependencias",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(API_URL + `/process/${idProcess}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(published == true) return console.log("published")
                getProcessesNoPublished()
                Swal.fire(
                    '¡Proceso Eliminado!',
                    'El proceso ha sido eliminado con éxito',
                    'success'
                )
            })
            
        }
    })
}
