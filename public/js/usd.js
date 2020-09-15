const usd =document.getElementById('usd');
const itemAmount =document.getElementById('itemAmount');
const type =document.getElementById('type');
// if (type.selected) {
    
// }
const end = itemAmount.innerHTML.trim().length
usd.value = itemAmount.innerHTML.trim().slice(1,end);
console.log(usd.value)