document.getElementById('form-login').addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('correo').value,
            password: document.getElementById('password').value
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.message == 'success'){
            sessionStorage.setItem('idUsuario', res.idUsuario)
            sessionStorage.setItem('tipoUsuario', res.tipoUsuario)
            location.href = '../vistas/index.html'
        } else{
            alertify.error('Error de autenticación')
        }
    })
})