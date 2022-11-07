document.addEventListener('DOMContentLoaded', () => {
    getPublishedProcesses()
})

let idProcessGlobal = 0    //Se actualiza cada vez que se selecciona un proceso publicado

//============================ GET PUBLISHED PROCESSES ============================
const itemsPublishedProcesses = document.getElementById('itemsPublishedProcesses')
async function getPublishedProcesses(){
    const response = await fetch(API_URL + `/process/published/${true}`)
    const publishedProcesses = await response.json()
    console.log('publishedProcesses', publishedProcesses)

    itemsPublishedProcesses.innerHTML = ""

    publishedProcesses.forEach(process => {
        itemsPublishedProcesses.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card card-body bg-indigo tx-white border-0">
                    <h4>${process.name}</h4>
                    <p class="card-text">${process.description}</p>
                    <div class="btn-icon-list">
                        <button class="btn btn-primary btn-icon formProcess" id="${process.id}"><i class="fas fa-file-invoice formProcess" id="${process.id}"></i></button>
                        <button class="btn btn-info btn-icon editProcess" id="${process.id}"><i class="typcn typcn-edit editProcess" id="${process.id}"></i></button>
                        <!--button class="btn btn-danger btn-icon deleteProcess" id="${process.id}"><i class="typcn typcn-trash deleteProcess" id="${process.id}"></i></button-->
                    </div>
                    
                </div>
            </div>
        `
    })
}


//Form | Delete -> Published Process 
itemsPublishedProcesses.addEventListener('click', e => {
    if(e.target.classList.contains('formProcess')){
        const idProcess = e.target.getAttribute('id')
        idProcessGlobal = idProcess
        getPublishedProcess(idProcess)
    } else if(e.target.classList.contains('editProcess')){
        const idProcess = e.target.getAttribute('id')
        editProcess(idProcess)
    } else if(e.target.classList.contains('deleteProcess')){
        const idProcess = e.target.getAttribute('id')
        //deleteProcess(idProcess, false)
    }
})

const itemsPublishedStepFields = document.getElementById('itemsPublishedStepFields')
async function getPublishedProcess(idProcess){
    const response = await fetch(API_URL + `/process/${idProcess}`)
    const process = await response.json()
    console.log(process)

    document.getElementById('processName').innerText = process.name

    const resPublishedProcessForm = await fetch(API_URL + `/process/${idProcess}/form`)
    const publishedProcessForm = await resPublishedProcessForm.json()
    console.log('publishedProcessForm', publishedProcessForm)

    itemsPublishedStepFields.innerHTML = ""
    publishedProcessForm.forEach(publishedProcess => {
        
        let fields = ""
        if(publishedProcess.fields_properties !== null){
            publishedProcess.fields_properties.forEach(propertie => {
                if(propertie.fieldOption == "textField"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="text">
                            </div>
                        </div>
                    `
                } else if(propertie.fieldOption == "optionField"){
                    let selectionOptions = ""
                    for(let i = 0; i < propertie.selectionOptions.length; i++){
                        selectionOptions += `
                            <div class="col-sm-4">
                                <label class="rdiobox"><input name="${propertie.idItemField}" type="radio"><span>${propertie.selectionOptions[i]}</span></label>
                            </div>
                        `
                    }
                    fields += `
                        <div class="col-sm-12">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <div class="row">
                                    ${selectionOptions}
                                </div>
                            </div>
                        </div>
                    `
                } else if(propertie.fieldOption == "multipleOptionField"){
                    let selectionOptions = ""
                    for(let i = 0; i < propertie.selectionOptions.length; i++){
                        selectionOptions += `
                            <div class="col-sm-4">
                                <label class="ckbox"><input type="checkbox"><span>${propertie.selectionOptions[i]}</span></label>
                            </div>
                        `
                    }
                    fields += `
                        <div class="col-sm-12">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <div class="row">
                                    ${selectionOptions}
                                </div>
                            </div>
                        </div>
                    `
                } else if(propertie.fieldOption == "imageField"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label class="d-block">${propertie.fieldTitle}</label>
                                <input type="file" class="d-none" id="${propertie.idItemField}" accept=".jpg, .png, .jpeg" onchange="uploadedImage(${propertie.idItemField})">
                                <label for="${propertie.idItemField}" class="btn btn-info">Subir Imagen <i class="fa fa-image fa-lg ml-2"></i></label>
                            </div>
                        </div>
                    `
                } else if(propertie.fieldOption == "dateField"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="date">
                            </div>
                        </div>
                    `
                } else if(propertie.fieldOption == "numericField"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="number" min="1">
                            </div>
                        </div>
                    `
                }
                
            })
        }

        itemsPublishedStepFields.innerHTML += `
            <div class="col-12 border_ mt-3 publishedProcessStep">
                <h5 class="mt-2">${publishedProcess.name}</h5>
                <div class="row py-2">
                    ${fields}
                </div>
            </div>
        `

    })


    $('#modalPublishedProcessForm').modal('show')
         
}

function editProcess(idProcess){
    /*fetch(API_URL + `/process/${idProcess}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            published: false
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        Swal.fire({
            icon: 'success',
            title: '¡Proceso Editable!',
            text: 'El proceso se ha trasladado a la sección de creación y edición de procesos',
            footer: '<a href="index.html#editableProcesses">Ver los procesos editables</a>'
        })
        getPublishedProcesses()
        getProcessesNoPublished()
    })*/

    Swal.fire({
        title: '¿Estas seguro de regresar el Proceso al modo edición?',
        text: "El proceso tendrá que ser publicado de nuevo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, editar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(API_URL + `/process/${idProcess}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    published: false
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: '¡Proceso Editable!',
                    text: 'El proceso se ha trasladado a la sección de creación y edición de procesos'
                })
                getPublishedProcesses()
                getProcessesNoPublished()
            })
            
        }
    })
    
}

document.getElementById('savePublishedProcessForm').addEventListener('click', () => {
    const publishedProcessSteps = document.querySelectorAll('.publishedProcessStep')
    //console.log('publishedProcessSteps', publishedProcessSteps)

    const publishedProcessForm = []

    let imagesName = []
    const formImages = new FormData()

    publishedProcessSteps.forEach(processStep => {
        const stepName = processStep.querySelector('h5').innerText
        console.log('stepName', stepName)

        const fieldsStep = processStep.querySelectorAll('.fieldStep')   //Campos de un Paso
        //console.log('fieldsStep', fieldsStep)

        const fieldsProperties = []
        fieldsStep.forEach(fieldStep => {
            const fieldTitle = fieldStep.querySelector('label').innerText
            //console.log('fieldTitle', fieldTitle)
            
            const field = fieldStep.querySelector('input')
            //console.log('field', field)
            const fieldType = field.getAttribute('type')

            let fieldValue = ""

            if(fieldType == 'radio'){
                const selectionOptions = fieldStep.querySelectorAll('.rdiobox')
                selectionOptions.forEach(option => {
                    //console.log('option', option.innerText)
                    const radio = option.querySelector('input').checked
                    if(radio) return fieldValue = option.innerText
                })
            } else if(fieldType == 'checkbox'){
                const selectionOptions = fieldStep.querySelectorAll('.ckbox')
                selectionOptions.forEach(option => {
                    //console.log('option', option.innerText)
                    const checkbox = option.querySelector('input').checked
                    if(checkbox) fieldValue += option.innerText + ', '
                })
                fieldValue = fieldValue.slice(0, -2)
            } else if(fieldType == 'file'){
                
                const image = field.files[0]
                if(image !== undefined){
                    
                    //const imageName = `idProcess${idProcessGlobal}-${Date.now()}.${image.name.split('.').slice(-1)}`
                    const imageName = `idProcess${idProcessGlobal}-${uuid.v1().split('-')[0]}.${image.name.split('.').slice(-1)}`
                    fieldValue = imageName

                    imagesName.push(imageName)
                    formImages.append('images', image)
                }
                

            } else {
                fieldValue = field.value
            }

            const fieldPropertie = {
                fieldTitle: fieldTitle,
                fieldValue: fieldValue,
                fieldType: fieldType
            }

            fieldsProperties.push(fieldPropertie)
        })

        const stepForm = {
            stepName: stepName,
            fieldsProperties: fieldsProperties
        }

        publishedProcessForm.push(stepForm)
    })

    
    saveFormData(publishedProcessForm)

    formImages.append('imagesName', imagesName)
    saveFormImages(formImages)
})


function saveFormData(fieldsProperties){
    fetch(API_URL + '/processFormData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            fieldsProperties: fieldsProperties,
            idProcess: idProcessGlobal
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        Swal.fire({
            icon: 'success',
            title: '¡Datos Guardados!',
            text: 'Los datos del formulario pueden verse en la sección de reportes.',
        })
        $('#modalPublishedProcessForm').modal('hide')
    })
}

function saveFormImages(formImages){
    fetch(API_URL + '/processFormImages', {
        method: 'POST',
        body: formImages
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
}

function uploadedImage(idItemField){
    const image = document.getElementById(idItemField)
    const labelImage =  document.getElementById(idItemField).nextElementSibling

    if(image.files[0] !== undefined) labelImage.innerText = 'Imagen Cargada'
    else labelImage.innerHTML = 'Subir Imagen <i class="fa fa-image fa-lg ml-2"></i>'
}