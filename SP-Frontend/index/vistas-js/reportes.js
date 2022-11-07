document.addEventListener('DOMContentLoaded', () => {
    getProcessesFormData()
	getCountProcessesFormData()
})

//============================ GET PUBLISHED PROCESSES - FORM DATA ============================
const tbodyFormData = document.getElementById('tbodyFormData')
async function getProcessesFormData(){
    const response = await fetch(API_URL + '/processFormData')
    const processesFormData = await response.json()
    console.log('processesFormData', processesFormData)

    tbodyFormData.innerHTML = ""

    processesFormData.forEach(process => {
		let stepsName = ""
		process.fields_properties.forEach(propertie => {
			stepsName += propertie.stepName + ', '
		})
		stepsName = stepsName.slice(0, -2)

        tbodyFormData.innerHTML += `
			<tr>
				<td>${process.process_name}</td>
				<td>${process.description}</td>
				<td>${stepsName}</td>
				<td class="text-center">
					<div class="text-center">
						<button class="btn btn-indigo" onclick="datailsFormData(${process.id})"><i class="fas fa-file-alt fa-lg"></i></button>
						<button class="btn btn-info" onclick="editDetailsFormData(${process.id})"><i class="far fa-edit fa-lg"></i></button>
					</div>
				</td>
				
			</tr>
        `
    })

	$('#example-1').DataTable( {
		//responsive: true,
		language: {
			searchPlaceholder: 'Buscar...',
			sSearch: '',
			lengthMenu: '_MENU_',
		}
	} );

}

const itemsStepFieldsFormData = document.getElementById('itemsStepFieldsFormData')
async function datailsFormData(idProcessData){

	const response = await fetch(API_URL + `/processFormData/${idProcessData}`)
    const processFormData = await response.json()
    console.log('processFormData', processFormData)

	document.getElementById('processName').innerText = processFormData.process_name

	itemsStepFieldsFormData.innerHTML = ""

	processFormData.fields_properties.forEach(step => {

		let fields = ""
		step.fieldsProperties.forEach(propertie => {
			if(propertie.fieldType == "file" && propertie.fieldValue !== ""){
				fields += `
					<div class="col-lg-6">
						<div class="form-group">
							<label class="font-weight-bold d-block">${propertie.fieldTitle}: </label>
							<img alt="image" height="50" class="img-fluid" src="${propertie.fieldValue}" style="max-height: 200px;">
						</div>
					</div>
				`
			} else {
				fields += `
					<div class="col-lg-6">
						<div class="form-group">
							<label class="font-weight-bold">${propertie.fieldTitle}: </label>
							<label>${propertie.fieldValue}</label>
						</div>
					</div>
				`
			}
		})

		itemsStepFieldsFormData.innerHTML += `
            <div class="col-12 border_ mt-3">
                <h5 class="mt-2">${step.stepName}</h5>
                <div class="row py-2">
					${fields}
                </div>
            </div>
        `
	})

	$('#modalProcessFormData').modal('show')

}


var idProcessDataGlobal = 0
async function editDetailsFormData(idProcessData){
	idProcessDataGlobal = idProcessData
	console.log('editDetailsFormData')
	const response = await fetch(API_URL + `/processFormData/${idProcessData}`)
    const processFormData = await response.json()
    console.log('processFormData', processFormData)

	document.getElementById('processNameEdit').innerText = processFormData.process_name

	itemsPublishedStepFields.innerHTML = ""
    processFormData.fields_properties.forEach(publishedProcess => {
        
        let fields = ""
        if(publishedProcess.fields_properties !== null){
            publishedProcess.fieldsProperties.forEach(propertie => {
                if(propertie.fieldType == "text"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="text" value="${propertie.fieldValue}">
                            </div>
                        </div>
                    `
                } else if(propertie.fieldType == "radio"){
                    let selectionOptions = ""
                    /*for(let i = 0; i < propertie.selectionOptions.length; i++){
                        selectionOptions += `
                            <div class="col-sm-4">
                                <label class="rdiobox"><input name="${propertie.idItemField}" type="radio"><span>${propertie.selectionOptions[i]}</span></label>
                            </div>
                        `
                    }*/
					selectionOptions += `
						<div class="col-sm-4">
							<label class="rdiobox"><input checked type="radio"><span>${propertie.fieldValue}</span></label>
						</div>
					`
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
                } else if(propertie.fieldType == "checkbox"){
                    let selectionOptions = ""
                    /*for(let i = 0; i < propertie.selectionOptions.length; i++){
                        selectionOptions += `
                            <div class="col-sm-4">
                                <label class="ckbox"><input type="checkbox"><span>${propertie.selectionOptions[i]}</span></label>
                            </div>
                        `
                    }*/
					selectionOptions += `
						<div class="col-sm-4">
							<label class="ckbox"><input checked type="checkbox"><span>${propertie.fieldValue}</span></label>
						</div>
					`
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
                } else if(propertie.fieldType == "date"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="date" value="${propertie.fieldValue}">
                            </div>
                        </div>
                    `
                } else if(propertie.fieldType == "number"){
                    fields += `
                        <div class="col-sm-6">
                            <div class="form-group fieldStep">
                                <label>${propertie.fieldTitle}</label>
                                <input class="form-control" type="number" min="1" value="${propertie.fieldValue}">
                            </div>
                        </div>
                    `
                }
                
            })
        }

        itemsPublishedStepFields.innerHTML += `
            <div class="col-12 border_ mt-3 publishedProcessStep">
                <h5 class="mt-2">${publishedProcess.stepName}</h5>
                <div class="row py-2">
                    ${fields}
                </div>
            </div>
        `

    })

	$('#modalEditProcessFormData').modal('show')
}


document.getElementById('savePublishedProcessForm').addEventListener('click', () => {
    const publishedProcessSteps = document.querySelectorAll('.publishedProcessStep')

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

    console.log('publishedProcessForm', publishedProcessForm)
	updateFormData(publishedProcessForm)
})

function updateFormData(fieldsProperties){
    fetch(API_URL + `/processFormData/${idProcessDataGlobal}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            fieldsProperties: fieldsProperties,
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        Swal.fire({
            icon: 'success',
            title: '¡Datos Actualizados!',
            text: 'Los datos del formulario han sido actualizados.',
        })
        $('#modalEditProcessFormData').modal('hide')
    })
}




// ================================================== GRAFICAS =========================================
async function getCountProcessesFormData(){
    const response = await fetch(API_URL + '/processFormData-count')
    const countProcessesFormData = await response.json()
    console.log('countProcessesFormData', countProcessesFormData)

	const dataGraphicDonut = []
	const dataGraphicBar = [
		{
			y: '2020',
			a: 12,
			b: 18
		},
		{
			y: '2021',
			a: 15,
			b: 16
		},
		{
			y: '2022',
			a: countProcessesFormData[0].total,
			b: countProcessesFormData[1].total
		}
	]
	const labelsGraphicBar = []

	countProcessesFormData.forEach(process => {
		dataGraphicDonut.push(
			{
				label: process.name,
				value: process.total
			}
		)

		labelsGraphicBar.push(process.name)
	})

	new Morris.Donut({
		element: 'morrisDonut1',
		data: dataGraphicDonut,
		colors: ['#28c76f','#4d79f5', '#ff5c77'],
		resize: true,
		backgroundColor: 'rgba(119, 119, 142, 0.2)',
		labelColor: '#77778e',
	});
	new Morris.Bar({
		element: 'morrisBar1',
		data: dataGraphicBar,
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: labelsGraphicBar,
		barColors: ['#4d79f5','#28c76f'],
		gridTextSize: 11,
		hideHover: 'auto',
		resize: true
	});
}

