const API_URL = 'https://api-workflow.com'
//const API_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
    tipoUsuario()
    usuario()
})

function tipoUsuario(){
    if(sessionStorage.getItem('tipoUsuario') == '1'){
        console.log('1')
        document.getElementById('crearUsuarios').style.display = 'none'
    } else{
        console.log('0')
        //document.getElementById('procesos').style.display = 'none'
        //document.getElementById('reportes').style.display = 'none'
    }
}

function usuario(){
    const infoUsuario = document.getElementById('infoUsuario')

    fetch(`${API_URL}/user/` + sessionStorage.getItem('idUsuario'))
    .then(res => res.json())
    .then(datos => {
        const nombres = datos.name.split(' ')
        const apellidos = datos.last_name.split(' ')
        infoUsuario.innerHTML = `
            <h2 class="app-sidebar__user-name">${nombres[0]} ${apellidos[0]}</h2>
        `
        if(datos.type == 0){
            infoUsuario.innerHTML += `
                <span class="app-sidebar__title">Administrator</span>
            `
        }
    })
}

//CERRAR SESION 
document.getElementById('cerrarSesion').addEventListener('click', ()=>{
    sessionStorage.clear()
    location.href = '../vistas/page-signin.html'
})