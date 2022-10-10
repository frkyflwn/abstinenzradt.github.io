
// Variablen

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

// Containers
const startContainer = document.querySelector('.startContainer')
const wheel = document.querySelector('.container');
const conOne = document.querySelector('.one');
const conTwo = document.querySelector('.two');
const conThree = document.querySelector('.three');
const conFour = document.querySelector('.four');
const conFive = document.querySelector('.five');

// Triggers
var checkTrigger;
var checkConFive = new Boolean(false);
var checkBack = new Boolean(false);
var checkRotation = new Boolean(false);
let checkCounter = 0;
var fieldsetAnimDuration = 0;

var current_fs = $('fieldset').first();

let currentDegree = 72;
let degNew = 72;

// Submit Button

const form = document.querySelector("#msform")
const submitButton = document.querySelector(".submit")
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4uQtKmcR71QMU93nKvxRK1F3ogulyiaVfoXLWFxyt4lCf6LzYN_p1ivv6S6t9q64r0A/exec'

   form.addEventListener('submit', e => {
     submitButton.disabled = true
     e.preventDefault()
     let requestBody = new FormData(form)
     fetch(scriptURL, { method: 'POST', body: requestBody})
       .then(response => {

		  $('.startContainer').fadeOut();
		  $('#spin').fadeOut();
		  $('.arrow').fadeOut();
		  $('.container').fadeOut();
		  $('.succesCircle').fadeIn();
		  $('#msform').fadeOut(1000);

          submitButton.disabled = false

         })
       .catch(error => {
       alert('Bitte alle Felder ausfüllen', error.message)
         submitButton.disabled = false

       }
       )
   })

   // Submit Animation

function successAnim() {
	$(".startButtonLogo").fadeOut(500);
		delay(200).then(() => {
		$(".startButtonThumb").fadeIn(500);
	}); 	
	delay(3000).then(() => {
		$(".startButtonThumb").fadeOut(500);
		delay(200).then(() => {
		$(".startButtonLogo").fadeIn(500);
	}); 	
	}); 
};

   // Delay Function für Animationen

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

	// startButton Ausführung

$(".startButton").click(function(){

	$(startContainer).addClass("bounce-out");
	$(".startButton").fadeOut(1000);
	$("#msform").fadeIn(2000);
	$(".arrow").fadeIn(2000);

	 window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'})

});


$(".startButtonLogo").click(function(){
	
	checkTrigger2 = $(current_fs).attr('class'); 

	if ( checkTrigger2 == "triggerClass2") {

		$(".submit").click();

	} else {
		$(".next").click();
	}

})

	// Weiter-Button Funktion


$(".next").click(function(){
	if(animating) return false;
	animating = true;

	var checkTrigger = $(current_fs).attr('class');
	
	// Get current Inputs der 5 Felder

	var ageInput = document.querySelector('.ageInput');
	var dayInput = document.querySelector('.dayInput');
	var timeInput = document.querySelector('.timeInput');
	var alcInput = document.querySelector('.alcInput');
	var verstosseInput = document.querySelector('.verstosseInput');


		if ( checkTrigger == "triggerClass") {

			console.log(checkTrigger);
			checkConFive = true;
		}


	// Input Überprüfung

	if( (ageInput.value > 99 || ageInput.value < 16 || isNaN(ageInput.value) || ageInput.value === "") && checkTrigger == "ageTrigger") {
          
		  console.log("Bitte korrekt ausfüllen");
		  $('.validationComment').show();
		  animating = false;
		  
    } else if(timeInput.value === "" && checkTrigger == "timeTrigger") {
          
		  console.log("Bitte korrekt ausfüllen");
		  $('.validationComment').show();
		  animating = false;
		  
    } else if( (alcInput.value.toString().length > 4 || alcInput.value < 0.01 || alcInput.value > 10 || alcInput.value === "") && checkTrigger == "alcTrigger") {
          
		  console.log("Bitte korrekt ausfüllen");
		  $('.validationComment').show();
		  animating = false;
		  
    } else if( (Number.isInteger(Number(verstosseInput.value)) == false || verstosseInput.value > 99 || verstosseInput.value < 1 || verstosseInput.value === "") && checkTrigger == "triggerClass") {
          
		  console.log("Bitte korrekt ausfüllen");
		  $('.validationComment').show();
		  animating = false;
		  
    } else if ( currentDegree == 17712 ) {

		$('.validationComment').hide();

	   			if(checkBack == true && checkCounter < 0) {

						checkCounter = checkCounter + 1;
						fieldsetAnimDuration = 800;
				} else if(checkCounter == 0 && checkConFive == false) {

					checkBack = false;
					checkRotation = true;
					fieldsetAnimDuration = 7000;
		
				}  else if(checkConFive == true) {

					fieldsetAnimDuration = 800;
				} 

	   animateFieldset();

	 } else {

		$('.validationComment').hide();

	 			if(checkBack == true && checkCounter < 0) {

						checkCounter = checkCounter + 1;
						fieldsetAnimDuration = 800;
				} else if(checkCounter == 0 && checkConFive == false) {

					checkBack = false;
					checkRotation = true;
					fieldsetAnimDuration = 7000;
		
				}  else if(checkConFive == true) {

					fieldsetAnimDuration = 800;
				} 

	 if ( checkRotation == true && checkCounter == 0) {
		 currentDegree = currentDegree + 3600 ;
		 successAnim();
		 checkRotation = false;
		 currentDegree = currentDegree - degNew ;
		
		 wheel.style.transform = 'rotate('+currentDegree+'deg)';

		 animateFieldset();

	 } else {

	 	 currentDegree = currentDegree - degNew ;
		
		 wheel.style.transform = 'rotate('+currentDegree+'deg)';

		 animateFieldset();
		}

	 }

	// Aktuelle Felder Freischalt-Animation

	if(currentDegree == 3600) {

	delay(3000).then(() => {

		conOne.style.backgroundColor = '#f9e501';
		$(".ageimg").fadeIn(2000);
		$(".listAge").fadeIn(2000);


	}); 	

	} else if(currentDegree == 7128) {

		delay(3000).then(() => {

		conTwo.style.backgroundColor = '#f9e501';
		$(".dayimg").fadeIn(2000);
		$(".listDay").fadeIn(2000);

	}); 

	} else if (currentDegree == 10656) {

	delay(3000).then(() => {

		conThree.style.backgroundColor = '#f9e501';
		$(".timeimg").fadeIn(2000);
		$(".listTime").fadeIn(2000);

	}); 
	
	} else if (currentDegree == 14184) {

	delay(3000).then(() => {

		conFour.style.backgroundColor = '#f9e501';
		$(".alcimg").fadeIn(2000);
		$(".listAlc").fadeIn(2000);

	}); 
	
	} else if (currentDegree == 17712) {

		delay(3000).then(() => {

		conFive.style.backgroundColor = '#f9e501';
		$(".verstossimg").fadeIn(2000);
		$(".listVerstosse").fadeIn(2000);

	}); 

	} 

	// Animation der Fieldsets die rotieren
	
	function animateFieldset() {

	next_fs = $(current_fs).next(); 


	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	

	//hide the current fieldset with style
	$(current_fs).animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"				
			//1. scale current_fs down to 80%
		/*	scale = 1 - (1 - now) * 0.2; */
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
		/*	current_fs.css({'transform': 'scale('+scale+')'}); */
			next_fs.css({'left': left, 'opacity': opacity});
			
		}, 
		duration: fieldsetAnimDuration, 
		complete: function(){
			
			current_fs.hide();
			current_fs = next_fs;
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
		
	});
	}	
});

	// Zurück-Button Funktion

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	$('.validationComment').hide();
	previous_fs = current_fs.prev();

	// Überprüft ob zurückgegangen wird

	if (checkCounter <= 0) {

		checkBack = true;

	} else {

		checkBack = false;
	}
	
	checkCounter = checkCounter - 1;
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");


	if (currentDegree == 17712 && checkConFive ==  true) {
		checkConFive = false;
	} else {
	currentDegree = (currentDegree + 72) ;
	wheel.style.transform = 'rotate('+currentDegree+'deg)';
	}
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2; 
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left}); 
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity}); 
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			current_fs = previous_fs;
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});

});



