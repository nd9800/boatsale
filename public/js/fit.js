window.addEventListener('DOMContentLoaded', (event) => {
    var inputLeft = document.getElementById("fit_start");
    var inputRight = document.getElementById("fit_end");
    var fit_start_value = document.querySelector(".fit_start_value");
    var fit_end_value = document.querySelector(".fit_end_value");
    var fit_start_end_value = document.querySelector(".fit_start_end_value");
    var thumbLeft = document.querySelector("#thumb.left");
    var thumbRight = document.querySelector("#thumb.right");
    var range = document.querySelector("#range");
    
function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),// 0 
		max = parseInt(_this.max);// 100

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value));
    console.log(typeof val)
	var percent = ((_this.value - min) / (max - min)) * 100;
    if (_this.value>50) {
        thumbLeft.style.left = `${percent-10}% `;
    }else{
        thumbLeft.style.left = `${percent}% `
    }
    fit_start_end_value.style.left=`${percent}% `
    range.style.left = `${percent}%`;

    fit_start_value.style.left = `calc(${percent}% + (0px))`;
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
    if (_this.value<50) {
        thumbRight.style.right = `${100-percent-10}%`;
     
    }else{
        thumbRight.style.right = `${100-percent}%`;
    }
    fit_start_end_value.style.right=`${100-percent}% `

    range.style.right = `${100-percent}%`;
    fit_end_value.style.right = `calc(${100-percent}% - (${20}px))`;
}
setRightValue();



 
inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hoverthumb");
});
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hoverthumb");
});
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("activethumb");
});
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("activethumb");
});

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hoverthumb");
});
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hoverthumb");
});
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("activethumb");
});
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("activethumb");
});
});

$(document).ready(function() {
    $('#fit_start').on('input', function() {
       let text_start = $('#fit_start').val();
       let text_end= $('#fit_end').val();
   
        $('.fit_start_value').html(`${text_start}fit`);
        $('.fit_end_value').html(`${text_end}fit`);
        $('.fit_start_end_value').html(`${text_start} - ${text_end} fit`);
      
        if (text_start >= (text_end-10)) {
            $('.fit_start_value').css('display','none');
            $('.fit_end_value').css('display','none');
            $('.fit_start_end_value').css('display','block');
            if (text_start >= (text_end-5)) {
                $('.fit_start_value').css('display','block');
                $('.fit_start_end_value').css('display','none');
            }
        }else{
            $('.fit_start_value').css('display','block');
            $('.fit_end_value').css('display','block');
            $('.fit_start_end_value').css('display','none');
        }
      });
      $('#fit_end').on('input', function() {
        let text_start = $('#fit_start').val();
        let text_end= $('#fit_end').val();
    
         $('.fit_start_value').html(`${text_start}fit`);
         $('.fit_end_value').html(`${text_end}fit`);
         $('.fit_start_end_value').html(`${text_start} - ${text_end}fit`);
         if (text_start >= (text_end-10)) {
            $('.fit_start_value').css('display','none');
            $('.fit_end_value').css('display','none');
            $('.fit_start_end_value').css('display','block');
            if (text_start >= (text_end-5)) {
                $('.fit_end_value').css('display','block');
                $('.fit_start_end_value').css('display','none');
            }
        }else{
            $('.fit_start_value').css('display','block');
            $('.fit_end_value').css('display','block');
            $('.fit_start_end_value').css('display','none');
        }
       });
  
   // $('.fit_start_value').html(Oninputfit_Start);
   // $('.fit_end_value').html();


 $('#fit_start').on('change',() =>{
     let fit_start_value = $('#fit_start').val();
     let fit_start_Number = parseInt(fit_start_value);
     let fit_end = $('#fit_end').val();
     let fit_end_Number = parseInt(fit_end);
     let boat_list = $('#boat-list');
     let pagination = $('#pagination');
     
$.ajax({
    url: 'http://localhost:5000/fit',
    dataType: "json",
    data: { fit_start_Number:fit_start_Number,
        fit_end_Number:fit_end_Number},
    type: 'post',
    jsonpCallback: 'callback', 
    success: function (data) {
        let value = data.currentPages.map(element =>{
        let page ='';
            return `      
           <div class="col-sm-12 col-md-6 col-xl-3">
               <a href="/location/product?name=${element.BoatName}  "class="boat-list_item">
                   <div class="boat-list_item_image">
                       <img src="${element.Boat_Image_1}" alt="">
               
                       <div class="boat-list_item_basic">
                           <div class="boat-list_item_type"><i class="fas fa-ship"></i> ${element.InfoPassengerCapacity}
                           </div>
                           <div class="boat-list_item_passengers"><i class="fas fa-user-friends"></i>${element.InfoLength}  </div>
                       </div>
                   </div>
                   <div class="boat-list__item__holder">
                       <div class="boat-list__item__header">
                           <h2 class="boat-list__item__title"> ${element.BoatName} </h2>
                       </div>
                       <div class="boat-list__item__location">
                       <i class="fas fa-map-marker-alt"></i> ${element.DestinationName} 
                       </div>
                       <div class="boat-list__item__fit">
                       from <span>${element.Boatfit} </span>
                   </div>
                   </div>
           </a>  
           </div>`    })

           boat_list.html(value)
           pagination.html(page)
    },
    error: function (xhr, status, error) {
        console.log('Error: ' + error.message);

    },
    });
 });
 $('#fit_end').on('change',() =>{
    let fit_start_value = $('#fit_start').val();
    let fit_start_Number = parseInt(fit_start_value);
    let fit_end = $('#fit_end').val();
    let fit_end_Number = parseInt(fit_end);
    let boat_list = $('#boat-list');
    let pagination = $('#pagination');
    let region = $('.region span:first-child');
$.ajax({
   url: 'http://localhost:5000/fit',
   dataType: "json",
   data: { fit_start_Number:fit_start_Number,
    fit_end_Number:fit_end_Number},
   type: 'post',
   jsonpCallback: 'callback', 
   success: function (data) {
  
       let page='';
    //    for (let index = 0; index < data.page; index++) {
    //     page += ` <li class="page-item"><a class="page-link" href="/location/${index + 1}?browsers=${region.text().trim()}">${index+1} </a></li>`

    //    }
     
      let value = data.currentPages.map(element =>{
           
        return `      
       <div class="col-sm-12 col-md-6 col-xl-3">
           <a href="/location/product?name=${element.BoatName}  "class="boat-list_item">
               <div class="boat-list_item_image">
                   <img src="${element.Boat_Image_1}" alt="">
           
                   <div class="boat-list_item_basic">
                       <div class="boat-list_item_type"><i class="fas fa-ship"></i> ${element.InfoPassengerCapacity}
                       </div>
                       <div class="boat-list_item_passengers"><i class="fas fa-user-friends"></i>${element.InfoLength}  </div>
                   </div>
               </div>
               <div class="boat-list__item__holder">
                   <div class="boat-list__item__header">
                       <h2 class="boat-list__item__title"> ${element.BoatName} </h2>
                   </div>
                   <div class="boat-list__item__location">
                   <i class="fas fa-map-marker-alt"></i> ${element.DestinationName} 
                   </div>
                   <div class="boat-list__item__fit">
                   from <span>${element.Boatfit} </span>
               </div>
               </div>
       </a>  
       </div>`    })

       boat_list.html(value)
       pagination.html(page)
 
   },
   error: function (xhr, status, error) {
       console.log('Error: ' + error.message);

   },
   });
   
});





})
$("#IsInstantBookable").click(()=>{
    if($('input[type=checkbox]').is(':checked')) {
        $(this).prop('checked',true);
        alert('khong co')
    } else {
        $(this).prop('checked',false);
    }
})

//   // Check
//   $("#IsInstantBookable").prop("checked", true);

//   // Uncheck
//   $("#IsInstantBookable").prop("checked", false);