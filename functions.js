var doNotShowTooltip = false;

//Garbage

/* <button onclick="f()">ANNEE</button>		<button onclick="g()">RESET</button> */

// Affiche les tooltips
function showTooltip(string, id, x, y, boolean, showingdelay){
	
	if(!doNotShowTooltip){
	var tooltip = d3.select("body").append("div")   
	.attr("class", "tooltipbody")
	.attr("id", id)               
	.style("opacity", 0.01)
	
	tooltip.transition()
		.delay(showingdelay)
		.duration(500)      
		.style("opacity", 0.9)

	tooltip.html(string) 
	.style("left", x + "%")     
	.style("top", y + "%");	

	//Autodestruction des tooltip si true
	if(boolean){
		tooltip.transition().delay(3000).duration(2000).style("opacity",0);
	}
	}
}

// Cette fonction écoute les "select"
window.onload = function(){
	document.getElementById('select-visu').addEventListener('change', theme);
	document.getElementById('select-visu-spec').addEventListener('change', annee);
};

// Annule l'affichage des tooltips
function cancelTooltip(){
 doNotShowTooltip = true;
 document.getElementById("cancelbutton").style.visibility = "hidden";
 document.getElementById("tooltipisbackbutton").style.visibility = "visible";
}

// Ré-autorise l'affichage des tooltips
function tooltipIsBack(){
 doNotShowTooltip = false;
 document.getElementById("cancelbutton").style.visibility = "visible";
 document.getElementById("tooltipisbackbutton").style.visibility = "hidden";
}
	
// Disjonction de cas au niveau du thème
var tm, cl, hm, storedTheme;
var theme = function(ev){

	 switch(ev.target.selectedOptions[0].id){

	case 'select-treemap':{
		cleanDiv();
		tm = new Treemap();
		tm.createTreemap();
		writeTextTreemap();
		unloadgraph();
		loadyear();
		storedTheme = 'select-treemap';
		showTooltip("Sélectionnez une année de débat", "select-treemap" , 80, 10, true, 0);
		}
	break;

	case 'select-cloud':{
		cleanDiv();
		cl = new Cloud();
		cl.createCloud();
		writeTextCloud();
		unloadgraph();
		loadyear();
		storedTheme = 'select-cloud';
		showTooltip("Sélectionnez une année de débat", "select-cloud" , 80, 10, true, 0);
		}
	break;

	case 'select-homemadevisu':{
		cleanDiv();
		writeTextHomeMadeVisu();
		writeSpecificContentHomeMadeVisu();
		g();
		storedTheme = 'select-homemadevisu';
		document.getElementById('select-visu-spec').style.visibility = 'hidden';
		}
		break;
	 }
};



// Disjonction de cas au niveau de l'année (à régler, il faut que ce menu prenne en compte le choix au dessus)
var annee = function(ev){

	 switch(ev.target.selectedOptions[0].id){
		case 'select-1981':{
			switch(storedTheme){
				case 'select-treemap':{
					writeSpecificContentTreemap();
					tm.switchData('json/debat1981.json');
					loadgraph();
					showTooltip("Cliquez sur une case pour comparer le poids de chaque thème suivant les candidats !", "select-year" , 80, 50, true, 0);
				}
				break;
				case 'select-cloud':{
					cl.loadButtons(1981);
					loadgraph();
					showTooltip("Effectuez un clic droit sur un mot pour changer de candidat !", "select-year" , 80, 50, true, 1000);
				}
				break;
			}
		}
		break;

		case 'select-1988':{
			switch(storedTheme){
				case 'select-treemap':{
					writeSpecificContentTreemap();
					tm.switchData('json/debat1988.json');
					loadgraph();
					showTooltip("Cliquez sur une case pour comparer le poids de chaque thème suivant les candidats !", "select-year" , 80, 50, true, 0);
				}
				break;
				case 'select-cloud':{
					cl.loadButtons(1988);
					loadgraph();
					showTooltip("Effectuez un clic droit sur un mot pour changer de candidat !", "select-year" , 80, 50, true, 1000);
				}
				break;
			}
		}
		break;

		case 'select-1995':{
			switch(storedTheme){
				case 'select-treemap':{
					writeSpecificContentTreemap();
					tm.switchData('json/flare.json');
					loadgraph();
					showTooltip("Cliquez sur une case pour comparer le poids de chaque thème suivant les candidats !", "select-year" , 80, 50, true, 0);
				}
				break;
				case 'select-cloud':{
					cl.loadButtons(1995);
					loadgraph();
					showTooltip("Effectuez un clic droit sur un mot pour changer de candidat !", "select-year" , 80, 50, true, 1000);
				}
				break;
			}
		}
		break;

		case 'select-2007':{
			switch(storedTheme){
				case 'select-treemap':{
					writeSpecificContentTreemap();
					tm.switchData('json/debat2007.json');
					loadgraph();
					showTooltip("Cliquez sur une case pour comparer le poids de chaque thème suivant les candidats !", "select-year" , 80, 50, true, 0);
				}
				break;
				case 'select-cloud':{
					cl.loadButtons(2007);
					loadgraph();
					showTooltip("Effectuez un clic droit sur un mot pour changer de candidat !", "select-year" , 80, 50, true, 1000);
				}
				break;
			}
		}
		break;
		 }
};


// Permet au bouton "Vision synthétique" d'afficher l'abstract
function abstractButton(){
		cleanDiv();
		unloadgraph();
		var ab = new Abstract();
		ab.createAbstract();
		ab.drawAbstract();
		loadgraph();
}
// Affiche le contenu du "body-content"
function loadgraph(){
	d3.select("#body-content-graph").transition()        
          .duration(1000)      
          .style("opacity", 1); 
}

function unloadgraph(){
	d3.select("#body-content-graph").style("opacity", 0); 
}

function loadyear(){
	document.getElementById("select-visu-spec").style.visibility = "visible";
}

// Nettoie les div dans le body-content avant d'afficher un autre graphe
function cleanDiv(){
	document.getElementById("body-content-text").innerHTML = "";
	document.getElementById("body-content-specific").innerHTML = "";
	document.getElementById("body-content-graph").innerHTML = "";
	document.getElementById("body-content-specific-low").innerHTML = "";
}

function showTooltipSpec(){
showTooltip("Cherchez des mots dans le words cloud. Tapez un mot, puis appuyez sur \"Entrée\"", "search-bar" , 45, 7, true, 0);
}

function callAbout(){

cleanDiv();
d3.select("#body-content-specific").style("opacity",0);
d3.select(".body-content").style("opacity",0);

d3.select(".body-content").transition()        
          .duration(1000)      
          .style("opacity", 1); 
d3.select("#body-content-specific").transition()        
          .duration(1000)      
          .style("opacity", 1); 
	
document.getElementById("body-content-text").innerHTML = '<h3>Description du projet</h3></br>Comment évoluent les stratégies de communication adoptées par les candidats lors des élections présidentielles ? Quels sont les thèmes de prédilection des candidats lors d’une élection? Ces analyses, réalisées par des sociologues et des journalistes, font de plus en plus appel à des techniques de fouilles de données textuelles avec le récent engouement de la communauté journalistique pour le “data-journalisme” ou journalisme de données.</br>De manière générale, la fouille de données ou data mining consiste en le développement de méthodes pour l’exploration et l’analyse de gros volumes de données. L’objectif est de faire émerger de ces données des structures à l’origine invisibles par un analyste humain. Les méthodes impliquées relèvent des domaines de l’intelligence artificielle, de l’apprentissage, des statistiques et des systèmes de bases de données.</br>L’objectif de ce projet est d’imaginer et de développer une interface de navigation dans les transcriptions des débats des présidentielles qui permettent aux journalistes et sociologues d’étayer leurs analyses.</br>Cette interface pourra proposer :</br><ul><li>Des méthodes statistiques de fouille de données textuelles intégrant différents niveaux de complexité (ex: fréquences de mots, calcul de similarité, classification), afin d’extraire par exemple les caractéristiques lexicales discriminant les débats d’un candidat par rapport à un autre.</li><li>Une interface de visualisation des résultats des analyses et de navigation dans les débats sera imaginée et développée.</li></ul>'
			
document.getElementById("body-content-specific").innerHTML = "Les membres de l'équipe(par ordre alphabétique)<ul><li>Groupe analyse de données:</li><ul><li>Benjamin Battino</li><li>Martin Chochod</li><li>Dimitri Garcia</li></ul><li>Groupe visualisation</li><ul><li>Anthony Hu</li><li>Patrick Tailheuret</li><li>Rémy Soukarie</li></ul></ul>";
}
