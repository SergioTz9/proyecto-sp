document.addEventListener('DOMContentLoaded', ()=>{
    
})

document.getElementById('form-registro').addEventListener('submit', e=>{
    e.preventDefault()
    fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            correo: correo.value,
            password: password.value,
            puesto: puesto.value,
            tipo: tipo.value
        })
    })
    .then(res => res.json())
    .then(datos => {
        console.log(datos)
    })
    alertify.success('Usuario creado')
    nombre.value = ""
    apellido.value = ""
    correo.value = ""
    password.value = ""
    puesto.value = ""
    tipo.value = ""
})
