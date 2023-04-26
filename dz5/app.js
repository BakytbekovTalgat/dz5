// console.log("Hello World");

// 1)


const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')
const rub = document.querySelector("#rub")
const yuan = document.querySelector("#yuan")

const convert = (elem, target, target2) => {
    elem.addEventListener("input", () => {

        const request = new XMLHttpRequest()
        request.open("GET", "json/data.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.addEventListener("load", () => {
            const data = JSON.parse(request.response)

            target.forEach(e =>{
                target2 === 'som'?
                    e.value = (elem .value / data [e.id]).toFixed(2) : e === som ?
                        e.value = (elem.value * data[elem.id]).toFixed(2)
                        :e.value = ((elem.value * data[elem.id])/ data[e.id]).toFixed(2)
            } )
            elem.value === '' && (target.forEach(e => e.value = ''))
        })
        request.onerror = () => {
            alert.error("Произошла ошибка!")
        }
    })
}


// 2)



const message = {
    loading: "Loading...",
    success: "Thanks, we'll be in touch soon!",
    fail: "Something went wrong..."
}

const diolog = document.querySelector('.modal__dialog')
modal.addEventListener('click', (e) =>
{
    if (!diolog.contains(e.target) && modal.classList.contains('show')) closeModal();
})

const forms = document.querySelectorAll('form')
const postData = (form) =>
{
    form.addEventListener("submit", (e) => {

        e.preventDefault()

        const messageBlock = document.createElement('div')
        messageBlock.setAttribute('class', 'messageBlock')
        messageBlock.textContent = message.loading
        diolog.append(messageBlock)

        const request = new XMLHttpRequest()
        request.open("POST", "server.php")
        request.setRequestHeader("Content-type", "application/json")

        const formData = new FormData(form)
        const object = {}

        formData.forEach((item, i) =>
        {
            const arr = [item, i]
            console.log(arr);
            object[i] = item
        })
        console.log(object);
        const json = JSON.stringify(object)
        request.send(json)

        const closeMessage = function ()
        {
            setTimeout(() =>
            {
                messageBlock.remove()
            }, 4000);
        }
        request.addEventListener("load",  () =>{
            setTimeout(() =>
            {
                messageBlock.textContent = message.loading
                if (request.status == 200) {
                    console.log('ok')
                    messageBlock.textContent = message.success
                    messageBlock.style.background = 'rgb(197,5,236)'
                    messageBlock.style.color = 'rgb(238,241,237)'
                    closeMessage()
                    setTimeout(() => {
                        closeModal()
                    }, 4500);
                    document.getElementById('input1').value = ''
                    document.getElementById('input2').value = ''
                }
                else {
                    console.log("not ok")
                    messageBlock.textContent = message.fail
                    messageBlock.style.background = 'red'
                    closeMessage()
                }
            }, 1500);
        })

    })

}
forms.forEach((item) => {
    postData(item)
})