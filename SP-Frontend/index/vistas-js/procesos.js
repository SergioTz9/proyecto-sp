const idProcess = sessionStorage.getItem('idProcess')
let idStepGlobal = 0    //Para actualizar un paso

document.addEventListener('DOMContentLoaded', () => {
    getProcess()
    getProcessSteps()
})

//============================ GET PROCESS ============================
async function getProcess(){
    const response = await fetch(API_URL + `/process/${idProcess}`)
    const process = await response.json()
    console.log(process)
    document.getElementById('processName').innerText = process.name
}

const itemsProcessSteps = document.getElementById('itemsProcessSteps')
async function getProcessSteps(){
    const response = await fetch(API_URL + `/processStep/idProcess/${idProcess}`)
    const processSteps = await response.json()
    console.log(processSteps)

    itemsProcessSteps.innerHTML = ""

    processSteps.forEach(step => {
        itemsProcessSteps.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card card-body bg-primary tx-white border-0">
                    <h4 class="mb-3">${step.name}</h4>
                    <div class="btn-icon-list">
                        <button class="btn btn-indigo btn-icon editProcessStep" id="${step.id}"><i class="typcn typcn-edit editProcessStep" id="${step.id}"></i></button>
                        <button class="btn btn-danger btn-icon deleteProcessStep" id="${step.id}"><i class="typcn typcn-trash deleteProcessStep" id="${step.id}"></i></button>
                    </div>
                </div>
            </div>
        `
    })
}
//Edit | Delete -> Process Step
itemsProcessSteps.addEventListener('click', e => {
    if(e.target.classList.contains('editProcessStep')){
        const idStep = e.target.getAttribute('id')
        idStepGlobal = idStep
        getProcessStep(idStep)
        
    } else if(e.target.classList.contains('deleteProcessStep')){
        console.log('deleteProcessStep')
        const idStep = e.target.getAttribute('id')
        deleteProcessStep(idStep)
    }
})

async function getProcessStep(idStep){
    const response = await fetch(API_URL + `/processStep/${idStep}`)
    const processStep = await response.json()
    console.log(processStep)

    document.getElementById('stepName').innerText = processStep.name
    itemsStepFields.innerHTML = processStep.form_structure

    if(processStep.fields_properties !== null){
        processStep.fields_properties.forEach(propertie => {
            const itemField = itemsStepFields.querySelector(`[id="${propertie.idItemField}"]`)
            itemField.querySelector('input').value = propertie.fieldTitle
            itemField.querySelector('select').value = propertie.fieldOption

            if(propertie.fieldOption == "optionField"){
                const radioTitles = itemField.querySelectorAll('.radioTitle')   //inputs con el titulo de cada Radio Opción
                for(let i = 0; i < radioTitles.length; i++){
                    radioTitles[i].value = propertie.selectionOptions[i]
                }
            } else if(propertie.fieldOption == "multipleOptionField"){
                const ckboxTitles = itemField.querySelectorAll('.ckboxTitle')   //inputs con el titulo de cada Check Opción
                for(let i = 0; i < ckboxTitles.length; i++){
                    ckboxTitles[i].value = propertie.selectionOptions[i]
                }
            }
        })
    }

    selectFieldOptions = document.querySelectorAll('.selectFieldOptions')
    changeFieldOption()
    $('#modalCreateStepForm').modal('show')
         
}

//=================== FORM CREATE PROCESS STEP ==============================
const formCreateProcessStep = document.getElementById('formCreateProcessStep')
formCreateProcessStep.addEventListener('submit', e => {
    e.preventDefault()
    fetch(API_URL + '/processStep', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: formCreateProcessStep.name.value,
            idProcess: sessionStorage.getItem('idProcess'),
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        formCreateProcessStep.reset()
        $('#modalCreateProcessStep').modal('hide')
        Swal.fire(
            '¡Paso Creado!',
            '',
            'success'
        )
        getProcessSteps()
    })
})


//======================== DELETE PROCESS STEP ====================
function deleteProcessStep(idStep){
    /*fetch(API_URL + `/processStep/${idStep}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        getProcessSteps()
    })*/

    Swal.fire({
        title: '¿Estas seguro de eliminar el Paso?',
        text: "Se eliminara el formulario y los campos que conforman el paso.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(API_URL + `/processStep/${idStep}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                getProcessSteps()
                Swal.fire(
                    '¡Paso Eliminado!',
                    'El paso ha sido eliminado con éxito',
                    'success'
                )
            })
            
        }
    })
}


//======================== ADD FIELD - PROCESS STEP ====================
const itemsStepFields = document.getElementById('itemsStepFields')
let selectFieldOptions = document.querySelectorAll('.selectFieldOptions')


document.getElementById('addField').addEventListener('click', () => {
    const idItemField = Date.now()
    const fieldItem = `<div class="border_ mt-3 itemField" id="${idItemField}">
                            <div class="row py-2">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>*Título del campo</label>
                                        <input class="form-control" name="name" placeholder="Ingrese el título del campo" type="text" required>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>*Tipo de campo</label>
                                        <select class="form-control fa selectFieldOptions">
                                            <option value="">Seleccionar</option>
                                            <option value="textField" class="fa"> &#xf039; Texto</option>
                                            <option value="optionField" class="fa"> &#xf192; Opciones</option>
                                            <option value="multipleOptionField" class="fa"> &#xf14a; Opción Multiple</option>
                                            <option value="imageField" class="fa"> &#xf03e; Imagen</option>
                                            <option value="dateField" class="fa"> &#xf073; Fecha</option>
                                            <option value="numericField" class="fa"> &#xf292; Numérico</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group dynamicField">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="btn-icon-list" style="float: right;">
                                        <button class="btn btn-danger btn-icon" onclick="removeItemField(${idItemField})"><i class="typcn typcn-trash"></i></button>
                                        <label class="ckbox ml-3"><input type="checkbox"><span>Requerido</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>`
    itemsStepFields.insertAdjacentHTML('beforeend', fieldItem)

    //Desplazar el scroll del Modal hacia el ultimo elemento del Div -> 'id: itemsStepFields'
    document.getElementById('modalBodyCreateStepForm').scrollTop = itemsStepFields.offsetHeight

    selectFieldOptions = document.querySelectorAll('.selectFieldOptions')
    changeFieldOption()
})

function changeFieldOption(){
    selectFieldOptions.forEach(fieldOption => {
        fieldOption.addEventListener('change', () => {
            const option = fieldOption.value
            console.log('option', option)
    
            const parentElement = fieldOption.parentElement.parentElement.parentElement
            const dynamicField = parentElement.querySelector('.dynamicField')
            
            if(option == "") dynamicField.innerHTML = ""
            else if(option == "textField") dynamicField.innerHTML = '<input class="form-control" type="text">'
            else if(option == "optionField"){
                const idOptionField = Date.now()
                dynamicField.innerHTML = `
                    <div id="${idOptionField}">
                        <div class="input-group">
                            <input class="rdiobox" name="${idOptionField}" type="radio">
                            <input class="form-control ml-3 radioTitle" type="text" placeholder="Nombre de la opción">
                        </div>
                    </div>
                    <div class="btn-icon-list mt-3" style="float: right;">
                        <button class="btn btn-indigo btn-icon" onclick="addOptionField(${idOptionField})"><i class="typcn typcn-plus-outline"></i></button>
                    </div>
                `
            } 
            else if(option == "multipleOptionField"){
                const idMultipleOptionField = Date.now()
                dynamicField.innerHTML = `
                    <div id="${idMultipleOptionField}">
                        <div class="input-group">
                            <input class="ckbox" type="checkbox">
                            <input class="form-control ml-3 ckboxTitle" type="text" placeholder="Nombre de la opción">
                        </div>
                    </div>
                    <div class="btn-icon-list mt-3" style="float: right;">
                        <button class="btn btn-indigo btn-icon" onclick="addMultipleOptionField(${idMultipleOptionField})"><i class="typcn typcn-plus-outline"></i></button>
                    </div>
                `
            } 
            else if(option == "imageField"){
                const idImageField = Date.now()
                dynamicField.innerHTML = `
                    <input type="file" class="d-none" id="${idImageField}" accept=".jpg, .png, .jpeg">
                    <label for="${idImageField}" class="btn btn-info">Subir Imagen <i class="fa fa-image fa-lg ml-2"></i></label>
                `
            }
            else if(option == "dateField") dynamicField.innerHTML = '<input class="form-control" type="date">'
            else if(option == "numericField") dynamicField.innerHTML = '<input class="form-control" type="number" min="1">'
            
        })
    })
}


function removeItemField(idItemField){
    document.getElementById(idItemField).remove()
}

function addOptionField(idOptionField){
    const parentElementOptionField = document.getElementById(idOptionField)
    const newOptionField = `
        <div class="input-group mt-3">
            <input class="rdiobox" name="${idOptionField}" type="radio">
            <input class="form-control ml-3 radioTitle" type="text" placeholder="Nombre de la opción">
        </div>
    `
    parentElementOptionField.insertAdjacentHTML('beforeend', newOptionField)
}

function addMultipleOptionField(idMultipleOptionField){
    const parentElementOptionField = document.getElementById(idMultipleOptionField)
    const newOptionField = `
        <div class="input-group mt-3">
            <input class="ckbox" type="checkbox">
            <input class="form-control ml-3 ckboxTitle" type="text" placeholder="Nombre de la opción">
        </div>
    `
    parentElementOptionField.insertAdjacentHTML('beforeend', newOptionField)
}

document.getElementById('saveStepForm').addEventListener('click', () => {
    const itemsFieldProperties = []

    const itemsField = document.querySelectorAll('.itemField')
    itemsField.forEach(itemField => {
        const fieldTitle = itemField.querySelector('input').value
        const fieldOption = itemField.querySelector('select').value

        const selectionOptions = []
        if(fieldOption == "optionField"){
            const radioTitles = itemField.querySelectorAll('.radioTitle')
            radioTitles.forEach(radioTitle => {
                selectionOptions.push(radioTitle.value)
            })
        } else if (fieldOption == "multipleOptionField"){
            const ckboxTitles = itemField.querySelectorAll('.ckboxTitle')
            ckboxTitles.forEach(ckboxTitle => {
                selectionOptions.push(ckboxTitle.value)
            })
        }

        const FieldProperties = {
            idItemField: itemField.getAttribute('id'),
            fieldTitle: fieldTitle,
            fieldOption: fieldOption,
            selectionOptions: selectionOptions
        }
        itemsFieldProperties.push(FieldProperties)

        //console.log('FieldProperties', FieldProperties)
    })

    updateProcessStep(itemsFieldProperties)
})

//======================== UPDATE PROCESS STEP ====================
function updateProcessStep(fieldsProperties){
    fetch(API_URL + `/processStep/${idStepGlobal}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            formStructure: itemsStepFields.innerHTML,
            fieldsProperties: fieldsProperties
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        $('#modalCreateStepForm').modal('hide')
        Swal.fire(
            '¡Paso Actualizado!',
            '',
            'success'
        )
    })
}