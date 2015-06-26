// Mise en place du texte

function writeTextHomeMadeVisu(){
document.getElementById("body-content-text").innerHTML = "Une toute nouvelle visualisation, c'est du travail inédit";
}

function writeSpecificContentHomeMadeVisu(){
document.getElementById("body-content-specific").innerHTML = "Veuillez nous excuser pour la gêne occasionnée, nous sommes en chantier. Si vous avez sélectionné la treemap, choissez une année !";
}


function reset(){

	var nuageSVG=document.getElementById("nuage");
	
	d3.select(nuageSVG).transition()
			.each("start",function(){d3.select(this).remove();})
	
	var circles1=[10,8,4,2];
	var circles2=[11,14,6,3];
	var c1=["1981","1988","1988","1988"];
	var d1=["1981","1988","1995","2007"];

	SVGC.transition()
	.attr({
		cx:500,
		cy:500,
		r:500,
		stroke:"black",
		fill:"none"});
	  
	svgg.transition()
		.attr("width", 1000)
            .attr("height", 1000)
		.attr("id","1")
		
	contexte.transition()
			.style("opacity",0)
	
	creerTexteD(d1);
	creerTexteG(d1);
		
	var numberOfCircles=document.getElementsByTagName("circle").length;		
	if(numberOfCircles==1){
		slicePizza(1981,"gauche",circles1);
		slicePizza(1981,"droite",circles1);
		slicePizza(1988,"gauche",circles1);
		slicePizza(1988,"droite",circles1);
		slicePizza(1995,"gauche",circles1);
		slicePizza(1995,"droite",circles1);
		slicePizza(2007,"gauche",circles1);
		slicePizza(2007,"droite",circles1);
	}
	
	creerTexte();
		
}

function changement(année,parti){

	cleanDiv();
	unloadgraph();
	cl = new Cloud();
	cl.createCloud();
	writeTextCloud();
	loadgraph();
		
		

	svgg.transition()
		.attr("width",100)

	SVGC.transition()
		.attr("r",30)
		.attr("cx",50);
		
	d3.select("body")
	  .select("svg")
	  .selectAll("svg")
	    .transition()
		.each("end",function(){d3.select(this).remove();})
		
	d3.select("body")
	  .select("svg")
	  .selectAll("text")
	    .transition()
		.each("end",function(){d3.select(this).remove();})

		switch(année){
			case "1981":if(parti=="droite"){cl.changerDonnees("csv/GiscardDansSonDebat.csv", "csv/TexteBrutGiscardMitterand1981.csv");}else{cl.changerDonnees("csv/MitterandDansSonDebat1981.csv", "csv/TexteBrutGiscardMitterand1981.csv");}break;
			case "1988":if(parti=="droite"){cl.changerDonnees("csv/ChiracDansSonDebat1988.csv", "csv/TexteBrutChiracMitterand1988.csv");}else{cl.changerDonnees("csv/MitterandDansSonDebat1988.csv", "csv/TexteBrutChiracMitterand1988.csv");}break;
			case "1995":if(parti=="droite"){cl.changerDonnees("csv/ChiracDansSonDebat1995.csv", "csv/TexteBrutChiracJospin1995.csv");}else{cl.changerDonnees("csv/JospinDansSonDebat.csv", "csv/TexteBrutChiracJospin1995.csv");}break;
			case "2007":if(parti=="droite"){cl.changerDonnees("csv/SarkozyDansSonDebat.csv", "csv/TexteBrutSarkozyRoyal2007.csv");}else{cl.changerDonnees("csv/RoyalDansSonDebat.csv", "csv/TexteBrutSarkozyRoyal2007.csv");}break;
			default:;
		}
}

function changementTreeMap(){
	svgg.transition()
		.attr("width",100)

	SVGC.transition()
		.attr("r",30)
		.attr("cx",50);
		
	d3.select("body")
	  .select("svg")
	  .selectAll("svg")
	    .transition()
		.each("end",function(){d3.select(this).remove();})
		
	d3.select("body")
	  .select("svg")
	  .selectAll("text")
	    .transition()
		.each("end",function(){d3.select(this).remove();})
}
		
var svgg=d3.select("body")
		   .append("svg")
		     .attr("width", 1000)
			 .attr("height", 1000)
			 .attr("id","1")
		
var d1=["1981","1988","1995","2007"];

var SVGC=d3.select('svg')
	       .append('circle')
	         .attr({
				cx:500,
				cy:500,
				r:500,
				stroke:"black",
				fill:"none"});
	  
function blueCircles(d){
	var vr=20;
	var vb=240;
	var vg=20+Math.floor(210*Math.random());
	return "rgba("+vr+","+vg+","+vb+",0.75)";
}

function redCircles(d){
	var vr1=253;
	var vg1=0;
	var vb1=5+Math.floor(175*Math.random());
	return "rgba("+vr1+","+vg1+","+vb1+",0.75)";
}

var circles1=[10,8,4,2];
var circles2=[11,14,6,3];
var c1=["1981","1988","1988","1988"];
	
function slicePizza(année,parti,données){
	switch(année){
		case 1981: if(parti=="gauche"){creerSlice(225,données);} else {creerSlice(270,données);} break;
		case 1988: if(parti=="gauche"){creerSlice(180,données);} else {creerSlice(315,données);} break;
		case 1995: if(parti=="gauche"){creerSlice(135,données);} else {creerSlice(0,données);} break;
		case 2007: if(parti=="gauche"){creerSlice(90,données);} else {creerSlice(45,données);} break;
	}
}
		
function creerSlice(angle,données){

	d3.select("svg")
	  .append("svg")
		.attr("transform","translate(500,500) rotate("+angle+")")
		.attr("id",function(d){return angle;})
			.selectAll("circle")
			.data(données)
			.enter().append("circle")
			  .attr("id",function(d){return "circle"+d;})
			  .attr("name","1981")
			  .attr("r",function(d){return 3*d;})
			  .attr("cx",function(d){return (1+Math.sqrt(2))*3*1.5*d+(500/(Math.sqrt(2))-(2+Math.sqrt(2))*3*1.5*d)*Math.random();})
			  .attr("cy",function(d){return calculCY("circle"+d);})
			  .attr("fill",function(d){if(angle>=90 && angle <=225){return redCircles(d);} else {return blueCircles(d);}})
			  .attr("onclick","changementTreeMap()")
			  .attr("cursor","pointer");
}
		
function calculCY(id){
	var d= 1.5*parseInt(document.getElementsByTagName("circle")[1].getAttribute("r"));
	var ccx=(document.getElementById(id).getAttribute("cx"));
	var c=d+(ccx-(1+Math.sqrt(2))*d)*Math.random();
	return c;
}
		
creerTexteD(d1);
creerTexteG(d1);	
		
slicePizza(1981,"gauche",circles1);
slicePizza(1981,"droite",circles1);
slicePizza(1988,"gauche",circles1);
slicePizza(1988,"droite",circles1);
slicePizza(1995,"gauche",circles1);
slicePizza(1995,"droite",circles1);
slicePizza(2007,"gauche",circles1);
slicePizza(2007,"droite",circles1);
		
function creerTexte(){

	var k;
	for(k=2;k<10;k++){
		var j;
		var svgk=d3.select("body")
				   .select("svg")
				   .selectAll("svg")
				   .selectAll("circle")[k];
		var angle;
		
		switch(k){
			case 2:angle=225;break;
			case 3:angle=270;break;
			case 4:angle=180;break;
			case 5:angle=315;break;
			case 6:angle=135;break;
			case 7:angle=0;break;
			case 8:angle=90;break;
			case 9:angle=45;break;
		}
		
		var angleC=360-angle;
		var svgAngle=document.getElementById(angle);
		
				d3.select(svgAngle)
				  .selectAll("text")
				  .data(svgk)
				  .enter()
				    .append("text")
				    .attr("height",50)
					.attr("width",50)
					.attr("fill","black")
					.attr("font-size",function(d){return 1.5*d.getAttribute("r");})
					.attr("x",function(d){return d.getAttribute("cx")-1.5*d.getAttribute("r");})
					.attr("y",function(d){return d.getAttribute("cy");})
					.attr("transform",function(d){return "rotate("+angleC+","+d.getAttribute("cx")+","+d.getAttribute("cy")+")";})
					.attr("id",function(d){return d.getAttribute("id")+"t";})
				
		var tab=document.getElementsByTagName("text");
		var limit=tab.length;
		
		for(j=8;j<limit;j++){tab[j].innerHTML=tab[j].getAttribute("id");}
		
	}
}
		
creerTexte();
		
  function creerTexteD(d1){

	var svgt=d3.select("svg")
				 .append("svg")
				   .selectAll("text")
				   .data(d1)
				   .enter()
				   .append("text")
				     .attr("id",function(d){return d;})
				     .attr("height",50)
				     .attr("width",50)
				     .attr("x",function(d){return x(d);})
				     .attr("y",function(d){return y(d);})
				     .attr("transform",function(d){return angle(d);})
				     .attr("font-size",30)	
				     .attr("name",function(d){return d;})
				     .attr("onmouseover","surbrillance(evt)")
				     .attr("onmouseout","retour(evt)")
				     .on("click",function(d){changement(d,"droite");})
				     .attr("cursor","pointer");
	var i;
	
	for(i=0;i<4;i++){document.getElementById(d1[i]).innerHTML=d1[i];}
	
}
		
function creerTexteG(d1){

	var svgt=d3.select("svg")
			   .append("svg")
				 .selectAll("text")
				 .data(d1)
				 .enter()
				 .append("text")
					.attr("id",function(d){return d;})
					.attr("height",50)
					.attr("width",50)
					.attr("x",function(d){return x2(d);})
					.attr("y",function(d){return y2(d);})
					.attr("transform",function(d){return angle2(d);})
					.attr("font-size",30)	
					.attr("name",function(d){return d;})
					.attr("onmouseover","surbrillance(evt)")
					.attr("onmouseout","retour(evt)")
					.on("click",function(d){changement(d,"gauche");})
					.attr("cursor","pointer");
	var i;
	
	for(i=0;i<4;i++){document.getElementsByTagName("text")[4+i].innerHTML=d1[i];}
	
}			
	
function retour(evt){
	
	var id=getAngleG(evt.target.id);
	var id2=getAngleD(evt.target.id);
	var tab=document.getElementsByTagName("circle");
	var i;
	var color = redCircles(id);
	var color2 = blueCircles(id2);
		
		for(i=1;i<tab.length;i++){
		
			var circlei=tab[i];
			
			if(circlei.parentNode.getAttribute("id")==id){
				circlei.setAttribute("fill",color);
				circlei.setAttribute("r",circlei.getAttribute("r")/1.5);
			} 
			
			else if(circlei.parentNode.getAttribute("id")==id2){
				circlei.setAttribute("fill",color2);
				circlei.setAttribute("r",circlei.getAttribute("r")/1.5);
			}
		}
		
		var tab2=document.getElementsByTagName("text");
		var j;
		
		for(j=8;j<tab2.length;j++){
			var textj=tab2[j];
			if(textj.parentNode.getAttribute("id")==id2||textj.parentNode.getAttribute("id")==id){
				textj.setAttribute("fill","black");
				textj.setAttribute("font-size",textj.getAttribute("font-size")/1.5);
			}
			else {
			textj.setAttribute("opacity",1);
			}
		}
	}
	
	function getAngleG(id){
		switch(id){
			case "1981":return "225";break;
			case "1988":return "180";break;
			case "1995":return "135";break;
			case "2007":return "90";break;
		}
	}
	
	function getAngleD(id){
		switch(id){
			case "1981":return "270";break;
			case "1988":return "315";break;
			case "1995":return "0";break;
			case "2007":return "45";break;
		}
	}	
	
	function x(id){
		switch(id){
			case "1981":return 650;break;
			case "1988":return 880;break;
			case "1995":return 900;break;
			case "2007":return 700;break;
		}
	}
	
	function y(id){
		switch(id){
			case "1981":return 80;break;
			case "1988":return 280;break;
			case "1995":return 650;break;
			case "2007":return 880;break;
		}
	}
	
	function x2(id){
		switch(id){
			case "1981":return 280;break;
			case "1988":return 100;break;
			case "1995":return 130;break;
			case "2007":return 300;break;
		}
	}
	
	function y2(id){
		switch(id){
			case "1981":return 120;break;
			case "1988":return 350;break;
			case "1995":return 730;break;
			case "2007":return 900;break;
		}
	}
	
	function angle(id){
	
		var x=document.getElementById(id).getAttribute("x");
		var y=document.getElementById(id).getAttribute("y");
		
		switch(id){
		case "1981":return "rotate(30,"+x+","+y+")";break;
		case "1988":return "rotate(60,"+x+","+y+")";break;
		case "1995":return "rotate(120,"+x+","+y+")";break;
		case "2007":return "rotate(150,"+x+","+y+")";break;
		}
	}
	
	function angle2(id){
	
		var i=d1.indexOf(id);
		var x=document.getElementsByTagName("text")[4+i].getAttribute("x");
		var y=document.getElementsByTagName("text")[4+i].getAttribute("y");
		
		switch(id){
			case "1981":return "rotate(330,"+x+","+y+")";break;
			case "1988":return "rotate(300,"+x+","+y+")";break;
			case "1995":return "rotate(240,"+x+","+y+")";break;
			case "2007":return "rotate(210,"+x+","+y+")";break;
		}
	}
		 
		function surbrillance(evt){
		
			var id=getAngleG(evt.target.id);
			var id2=getAngleD(evt.target.id);
			var tab2=document.getElementsByTagName("text");
			var j;
			
			for(j=8;j<tab2.length;j++){
			
				var textj=tab2[j];
				
				if(textj.parentNode.getAttribute("id")==id){
					textj.setAttribute("fill","red");
					textj.setAttribute("font-size",1.5*textj.getAttribute("font-size"));
				}
				else if(textj.parentNode.getAttribute("id")==id2){
					textj.setAttribute("fill","blue");
					textj.setAttribute("font-size",1.5*textj.getAttribute("font-size"));
				} 
				else{
				textj.setAttribute("opacity",0.1);
				}
			}
			
			var tab=document.getElementsByTagName("circle");
			var i;
			
			for(i=1;i<tab.length;i++){
			
				var circlei=tab[i];
				
				if(circlei.parentNode.getAttribute("id")==id||circlei.parentNode.getAttribute("id")==id2){
					circlei.setAttribute("fill","yellow");
					circlei.setAttribute("r",1.5*circlei.getAttribute("r"));
				}
			}
}


