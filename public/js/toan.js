

$('.owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
$( ".owl-prev").html('<i class="fas fa-chevron-circle-left"></i>');
$( ".owl-next").html('<i class="fas fa-chevron-circle-right"></i>');


// plus minus
$(document).ready(function(){
    //$('.count').prop('disabled', true); // loi khong lay duoc value query khi submit 
       $(document).on('click','.plus',function(){
         if ($('.count').val()>=12) {
            return;
         }else{
            $('.count').val(parseInt($('.count').val()) + 1 );
         } 
      
    });
    $(document).on('click','.minus',function(){
            if ($('.count').val() == 1) {
                return
            }else{
                $('.count').val(parseInt($('.count').val()) - 1 );
            }
          
        });
 });

 $(document).ready(function() {
        $('#price_start').on('input', function() {
           let text_start = $('#price_start').val();
           let text_end= $('#price_end').val();
       
            $('.price_start_value').html(`$${text_start}`);
            $('.price_end_value').html(`$${text_end}`);
            $('.price_start_end_value').html(`$${text_start} - $${text_end}`);
          
            if (text_start >= (text_end-2000)) {
                $('.price_start_value').css('display','none');
                $('.price_end_value').css('display','none');
                $('.price_start_end_value').css('display','block');
                if (text_start >= (text_end-1000)) {
                    $('.price_start_value').css('display','block');
                    $('.price_start_end_value').css('display','none');
                }
            }else{
                $('.price_start_value').css('display','block');
                $('.price_end_value').css('display','block');
                $('.price_start_end_value').css('display','none');
            }
          });
          $('#price_end').on('input', function() {
            let text_start = $('#price_start').val();
            let text_end= $('#price_end').val();
        
             $('.price_start_value').html(`$${text_start}`);
             $('.price_end_value').html(`$${text_end}`);
             $('.price_start_end_value').html(`$${text_start} - $${text_end}`);
             if (text_start >= (text_end-2000)) {
                $('.price_start_value').css('display','none');
                $('.price_end_value').css('display','none');
                $('.price_start_end_value').css('display','block');
                if (text_start >= (text_end-1000)) {
                    $('.price_end_value').css('display','block');
                    $('.price_start_end_value').css('display','none');
                }
            }else{
                $('.price_start_value').css('display','block');
                $('.price_end_value').css('display','block');
                $('.price_start_end_value').css('display','none');
            }
           });
      
       // $('.price_start_value').html(OninputPrice_Start);
       // $('.price_end_value').html();


     $('#price_start').on('change',() =>{
         let price_start_value = $('#price_start').val();
         let price_start_Number = parseInt(price_start_value);
         let price_end = $('#price_end').val();
         let browsers = $('#browsers').text().trim()
         let price_end_Number = parseInt(price_end);
         let boat_list = $('#boat-list');
         let pagination = $('#pagination');
         
    $.ajax({
        url: 'http://localhost:5000/demo',
        dataType: "json",
        data: { price_start_Number:price_start_Number,
            price_end_Number:price_end_Number,
            browsers:browsers},
        type: 'post',
        jsonpCallback: 'callback', 
        success: function (data) {
            let page ='';
            let value = data.currentPages.map(element =>{
               
                return `      
                <div class="col-sm-12 col-md-6 col-xl-3">
                <a href="/location/product?name=${element.BoatName}&browsers=${element.DestinationName[0]}&BoatID=${element.BoatID[0]} "class="boat-list_item">
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
                        <i class="fas fa-map-marker-alt"></i> ${element.DestinationName[0]} 
                        </div>
                        <div class="boat-list__item__price">
                        from <span>${element.BoatPrice} </span>
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
     $('#price_end').on('change',() =>{
        let price_start_value = $('#price_start').val();
        let price_start_Number = parseInt(price_start_value);
        let price_end = $('#price_end').val();
        let browsers =$('#browsers').text().trim()
        let price_end_Number = parseInt(price_end);
        let boat_list = $('#boat-list');
        let pagination = $('#pagination');
        let region = $('.region span:first-child');

        
   $.ajax({
       url: 'http://localhost:5000/demo',
       dataType: "json",
       data: { price_start_Number:price_start_Number,
        price_end_Number:price_end_Number,
        browsers:browsers},
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
               <a href="/location/product?name=${element.BoatName}&browsers=${element.DestinationName[0]}&BoatID=${element.BoatID[0]} "class="boat-list_item">
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
                       <i class="fas fa-map-marker-alt"></i> ${element.DestinationName[0]} 
                       </div>
                       <div class="boat-list__item__price">
                       from <span>${element.BoatPrice} </span>
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
    

 $(document).ready(function(){

 
     let Usds = $('#itemAmount');
     let Usd = $('#itemAmount').text().trim()
     let UsdLength = Usd.length
     let UsdInt = parseInt(Usd.slice(1,UsdLength))

     let Reservations = $('#Reservation')
     let Reservation = $('#Reservation').text().trim()
     let ReservationLength = Reservation.length
     let ReservationInt = parseInt(Reservation.slice(1,ReservationLength))

     let Saless = $('#Sales')
     let Sales = $('#Sales').text().trim()
     let SalesLength = Sales.length
     let SalesInt = parseInt(Sales.slice(1,SalesLength))

     let Totals = $('#total')
     let Total = $('#total').text().trim()
     let TotalLength = Total.length
     let TotalInt = parseInt(Total.slice(1,TotalLength))

     let FullDay = $('#fullday')
    $('select.form-control').change(function PriceValue(){
        $('#type option:selected').each(function() {
            let value =  $(this).val()
            function setvalue(value) {
                Usds.text(`$${Math.ceil(UsdInt*value)}`)
                Reservations.text(`$${`${ReservationInt}`}`)
                Saless.text(`$${Math.ceil((UsdInt*value/100*21))}`)
                Totals.text(`$${(Math.ceil(UsdInt*value))+ReservationInt+(Math.ceil((UsdInt*value/100*21)))}`)
                FullDay.text(`$${(Math.ceil(UsdInt*value)*2)+ReservationInt+(Math.ceil((UsdInt*2/100*21)))}`)
            }
            setvalue(value)
            if (value == 2) {
                value = 1
                setvalue(value)
            }
            else if (value == 3) {
                value = 1.2
                setvalue(value)
            }
            else if (value == 4) {
                value = 1.5
                setvalue(value)
            }
            else if (value == 8) {
                value = 2
                setvalue(value)
            }
         
        });
  
    })
    // sửa đổi đề vào trong hàm onload
    const usd =$('#usd');
    const itemAmount =$('#itemAmount');
    const end = itemAmount.text().trim().length
    usd.val(parseInt(itemAmount.text().trim().slice(1,end)))
  });

