const idProcess = sessionStorage.getItem('idProcess')

document.addEventListener('DOMContentLoaded', () => {
    getProcess()
    getProcessSteps()
})

//============================ GET PROCESS ============================
async function getProcess(){
    const response = await fetch(API_URL + `/process/${idProcess}`)
    const process = await response.json()
    document.getElementById('processName').innerText = process.name
}

const itemsProcessSteps = document.getElementById('itemsProcessSteps')
async function getProcessSteps(){
    const response = await fetch(API_URL + `/processStep/idProcess/${idProcess}`)
    let processSteps = await response.json()
    console.log('processSteps', processSteps)

    const resStepsRelation = await fetch(API_URL + `/processStepRelation/idProcess/${idProcess}`)
    const stepsRelation = await resStepsRelation.json()
    console.log('stepsRelation', stepsRelation)

    if(stepsRelation[0] !== undefined){
        const tempProcessSteps = []
        stepsRelation[0].id_steps_relation.forEach(stepRelation => {
            /*const step = processSteps.filter(processStep => processStep.id == stepRelation.idStep)
            if(step.length > 0) tempProcessSteps.push(step[0])*/
            const step = processSteps.find(processStep => processStep.id == stepRelation.idStep)
            
            if(step !== undefined){
                tempProcessSteps.push(step)
                processSteps = processSteps.filter(processStep => processStep.id != stepRelation.idStep)
            }
        })
        processSteps = tempProcessSteps.concat(processSteps);
    }

    itemsProcessSteps.innerHTML = ""

    processSteps.forEach(step => {
        itemsProcessSteps.innerHTML += `
            <div class="col-md-4 mb-3 card-draggable" id="${step.id}">
                <div class="card card-body bg-primary tx-white border-0">
                    <h4 class="mb-3">${step.name}</h4>
                </div>
            </div>
        `
    })
}

//Función para poder arrastrar las cards de los Pasos
$(function () {
	// ______________Dragable cards
	$(".sortable").sortable({
		connectWith: '.sortable',
		items: '.card-draggable',
		revert: true,
		placeholder: 'card-draggable-placeholder',
		forcePlaceholderSize: true,
		opacity: 0.77,
		cursor: 'move'
	});
});

document.getElementById('saveStepRelation').addEventListener('click', () => {

    const steps = document.querySelectorAll('.card-draggable')
    const idSteps = []
    steps.forEach(step => {
        const idStep = step.getAttribute('id')
        idSteps.push({idStep: idStep})
    })
    console.log('idSteps', idSteps)

    fetch(API_URL + '/processStepRelation', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            idStepsRelation: idSteps,
            idProcess: idProcess,
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        Swal.fire(
            '¡Relación de Pasos guardada!',
            '',
            'success'
        )
    })
})


document.getElementById('publishProcess').addEventListener('click', async () =>  {
    const resStepsRelation = await fetch(API_URL + `/processStepRelation/idProcess/${idProcess}`)
    const stepsRelation = await resStepsRelation.json()

    if(stepsRelation[0] === undefined) return Swal.fire('Proceso No publicado', 'Debe establecer una relación entre los pasos del proceso para poder publicarlo.', 'error')

    fetch(API_URL + `/process/${idProcess}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            published: true
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        Swal.fire({
            icon: 'success',
            title: '¡Proceso Publicado!',
            footer: '<a href="index.html#publishedProcesses">Ver los procesos publicados</a>'
        })
    })
})