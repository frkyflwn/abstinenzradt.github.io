/* 
Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
const wheel = document.querySelector('.container');
const conTwo = document.querySelector('.two');
const conThree = document.querySelector('.three');
const conFour = document.querySelector('.four');
const conFive = document.querySelector('.five');
var checkConFive = new Boolean(false);

let currentDegree = 0;



$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	
	
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 

	


	if (currentDegree == -288) {

	} else {
		currentDegree = currentDegree - 72;
		wheel.style.transform = 'rotate('+currentDegree+'deg)';
		console.log(currentDegree);
	}

	if(currentDegree == -72) {
		$(".dayimg").attr('src', 'icons/day.png');
		conTwo.style.color = '#272929';
		conTwo.style.backgroundColor = '#f9e501';
	} else if (currentDegree == -144) {
		$(".timeimg").attr('src', 'icons/time.png');
		conThree.style.color = '#272929';
		conThree.style.backgroundColor = '#f9e501';
	} else if (currentDegree == -216) {
		$(".alcimg").attr('src', 'icons/alc.png');
		conFour.style.color = '#272929';
		conFour.style.backgroundColor = '#f9e501';
	} else if (currentDegree == -288) {
		$(".verstossimg").attr('src', 'icons/verstoss.png');
		conFive.style.color = '#272929';
		conFive.style.backgroundColor = '#f9e501';
		checkConFive = true;
	} 
	
	

	

	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
		
	});
	
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");


	if (currentDegree == -288 && checkConFive) {
		checkConFive = false;
	} else {
	currentDegree = currentDegree + 72;
	wheel.style.transform = 'rotate('+currentDegree+'deg)';
	}


		if(currentDegree == 0) {
		$(".dayimg").attr('src', 'icons/dayW.png');
		conTwo.style.color = '#fff';
		conTwo.style.backgroundColor = '#272929';
	} else if (currentDegree == -72) {
		$(".timeimg").attr('src', 'icons/timeW.png');
		conThree.style.color = '#fff';
		conThree.style.backgroundColor = '#272929';
	} else if (currentDegree == -144) {
		$(".alcimg").attr('src', 'icons/alcW.png');
		conFour.style.color = '#fff';
		conFour.style.backgroundColor = '#272929';
	} else if (currentDegree == -216) {
		$(".verstossimg").attr('src', 'icons/verstossW.png');
		conFive.style.color = '#fff';
		conFive.style.backgroundColor = '#272929';
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
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})
