const medicines = document.querySelectorAll('.medicine')
const first = document.querySelector('.first')
const centers = document.querySelectorAll('.center')
const theName = document.querySelector('.name')

medicines.forEach((item,index) => {
    item.addEventListener('mouseover', () => {
        theName.style.display = 'none'
        centers[index].style.opacity = '1'

    })
    item.addEventListener('mouseleave', () => {
        centers[index].style.opacity = '0'
        // setTimeout(() => {
            theName.style.display = ''
        // },500)
    })
    item.addEventListener('click', () => {
        if(index === 0) {
            location.href = './search-medicine1/index.html'
        }
        if(index === 1) {
            location.href = './search-medicine1/index.html'
        }
        if(index === 2) {
            location.href = './search-medicine1/index.html'
        }
        if(index === 3) {
            location.href = '../kepu-0/index.html'
        }
    })
})




















