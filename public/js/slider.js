window.addEventListener('DOMContentLoaded', (event) => {
    var inputLeft = document.getElementById("price_start");
    var inputRight = document.getElementById("price_end");
    var price_start_value = document.querySelector(".price_start_value");
    var price_end_value = document.querySelector(".price_end_value");
    var price_start_end_value = document.querySelector(".price_start_end_value");
    var thumbLeft = document.querySelector(".thumb.left");
    var thumbRight = document.querySelector(".thumb.right");
    var range = document.querySelector(".range");
    
function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),// 0 
		max = parseInt(_this.max);// 100

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value));
    console.log(typeof val)
	var percent = ((_this.value - min) / (max - min)) * 100;
    if (_this.value>5000) {
        thumbLeft.style.left = `${percent-10}% `;
    }else{
        thumbLeft.style.left = `${percent}% `
    }
    price_start_end_value.style.left=`${percent}% `
    range.style.left = `${percent}%`;

    price_start_value.style.left = `calc(${percent}% + (0px))`;
    let valueRight = inputRight.value;
    let valueLeft = inputLeft.value;
    if (valueRight==valueLeft) {
        inputRight.style.display = 'none' 
    }else{
        inputRight.style.display = 'block' 
    }

}
// 8 - percent * 0.15
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value));

	var percent = ((_this.value - min) / (max - min)) * 100;
    if (_this.value<5000) {
        thumbRight.style.right = `${100-percent-10}%`;
     
    }else{
        thumbRight.style.right = `${100-percent}%`;
    }
    price_start_end_value.style.right=`${100-percent}% `

    range.style.right = `${100-percent}%`;
    price_end_value.style.right = `calc(${100-percent}% - (${20}px))`;
}
setRightValue();



 
inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hover");
});
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hover");
});
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("active");
});
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("active");
});

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hover");
});
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hover");
});
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("active");
});
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("active");
});
});


// 


