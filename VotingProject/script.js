$(document).ready(function() {

	//
	var scale = Math.min(($(window).height() / $(".page_wrapper").outerHeight())-0.1, 1);
	$("section").css("min-height", $(window).height()/scale);
	$(".section_inner").css("min-width", $(window).width()/scale);

	$(".page_wrapper").css("transform", "scale("+scale+")");

	//
	setTimeout(function() {
	var lastSection = $(".page_inner section:last-child");
	$(".body_inner").css("height", lastSection.position().left/scale + lastSection.outerWidth()*scale - $(window).width() +  $(window).height());
	},500);
	

	//
	$(window).scroll(function() {
		bgCalc("#bg1", 0, "#section2");
		bgCalc("#bg2", "#section2", "#section6");
		bgCalc("#bg3", "#section6", "#section13");
		bgCalc("#bg4", "#section13", 0);
		$(".page_wrapper").css("transform", "scale("+scale+") translateX(-"+$(window).scrollTop()+"px)");


		//
		$(".scroll-animate").each(function() {
			var item = $(this);
			var animStart = item.offset().left*scale + item.outerWidth() - $(window).width();
			var animEnd = item.offset().left
			if (animStart < 0 && animEnd > 0) {
				item.data("animate","1");
				item.addClass("swing-gentle animated");
				setTimeout(function() {item.data("animate","0");},1000);
			} else {
				if (item.data("animate") == 0) {
					item.removeClass("swing-gentle animated");
				}
			}
		});


	});

	bgCalc("#bg1", 0, "#section2");
	bgCalc("#bg2", "#section2", "#section6");
	bgCalc("#bg3", "#section6", "#section13");
	bgCalc("#bg4", "#section13", 0);
	//
	function bgCalc(idBg, idFrom, idTo) {

		

		var startFrom = (idFrom == 0) ? 0 : $(idFrom).position().left/scale + ($(idFrom).outerWidth()/2);
		var startDelta = (idFrom == 0) ? 0 : $(idFrom).position().left/scale;
		var startLeftPos = startFrom+($(window).scrollTop()-startDelta)*0.25

		var endFrom = (idTo == 0) ? 0 : $(idTo).position().left/scale + ($(idTo).outerWidth()/2);
		var endDelta = (idTo == 0) ? 0 : $(idTo).position().left/scale;
		var endLeftPos = endFrom+($(window).scrollTop()-endDelta)*0.25



		var startWidth = (idTo == 0) ? "auto" : endLeftPos - startLeftPos;



		var startRightPos = (idTo == 0) ? 0 : "inherit";
		
		$(idBg).css({
			"left": startLeftPos,
			"right": startRightPos,
			"width": startWidth
		});
	}



	//
	var border0Height = ($("#section0 .section_inner").outerHeight() - $("#section1 .section_inner").outerHeight()) / 4; 
	$(".border0").css("height", border0Height+5);
	$(".border1").css("height", border0Height+22);
	var border2Height = ($("#section1 .section_inner").outerHeight() - $("#section2 .section_inner").outerHeight()) / 2; 
	$(".border2").css("height", border2Height+5);
	var border5Height = ($("#section9 .section_inner").outerHeight() - $("#section8 .section_inner").outerHeight()) / 2; 
	$(".border5").css("height", border5Height+5);


	//
	$(".item1_btn.-more").click(function() {
		var pos = $($(this).data("href")).position().left;
		setTimeout(function() {$("html,body").animate({scrollTop: pos/scale}, pos/10);}, 300);
		var item = $(this).closest(".item1_wrapper");
		if (!item.hasClass("animated")) {
			item.addClass("swing animated");
			setTimeout(function() {item.removeClass("swing animated");}, 1000);
		}		
	});	

	//
	$(".item1_info").click(function() {
		$(this).closest(".flipcard").addClass("-active");
	})

	$(".item1_btn.-back").click(function() {
		$(this).closest(".flipcard").removeClass("-active");
	})

});
