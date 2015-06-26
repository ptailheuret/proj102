// Mise en place du texte
			
function writeTextTreemap(){
	
	texte.style("opacity",0);
	
	texte.transition()        
          .duration(1000)      
          .style("opacity", 1); 
					
document.getElementById("body-content-text").innerHTML = "La treemap a été crée en 1991 par Ben Shneiderman, elle subdivise récursivement des zones en rectangle. En tant que graphique hiérarchique, elle permet de voir de façon clair la différence de poids entre divers noeuds à niveau/profondeur égale.</br></br>Par soucis de lisibilité nous avons ajouté quelques fonctions:    <ul><li>Des infobulles s'affichent lorsque l'on survole une case, on connait alors le locuteur, le thème associé au mot, son poids, et le poids chez le candidat adverse.</li><li>Lorsque l'on survole un case, le thème correspondant reste opaque, quand les autre s'effacent</li><li>Un clic gauche sur un rectangle va occasionner un zoom sur le thème en question, et fournir une vue plus précise, un clic droit ramène à la vue générale</li></ul>";
}

var specificContent = d3.select("#body-content-specific");


function writeSpecificContentTreemap(){
specificContent.style("opacity", 0);


specificContent          
					.transition()        
          .duration(1000)      
          .style("opacity", 1);
					
document.getElementById("body-content-specific").innerHTML = '<div id="container">\
				<div id="left">Le candidat de gauche est: <span id="gauche"></span></div>\
				<div id="center"><span id="centre"></span></div>\
				<div id="right">Le candidat de droite est : <span id="droite"></span></div></div>';
}

var Treemap = (function(){

		var Treemap = function(){};
		
		var margin, height, width, color, treemap, div, tooltip;

		Treemap.prototype.createTreemap = function(){

		// Définition de la taille du div (la rendre variable plus tard)
		margin = {top: 40, right: 10, bottom: 10, left: 10},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// Définition de la palette de couleurs		
		color = d3.scale.category20c();

		// Création de la treemap selon les dimensions du div
		treemap = d3.layout.treemap()
					.size([width, height])
					.sticky(true)
					.padding(null)
					.value(function(d) { return d.size; });

		// Création du div
		div = d3.select("#body-content-graph").append("div").attr("id","treemap").attr("class","body")
					.style("position", "relative")
					.style("width", (width + margin.left + margin.right) + "px")
					.style("height", (height + margin.top + margin.bottom) + "px")
					.style("left", margin.left + "px")
					.style("top", margin.top + "px")

		// Création du tooltip
		tooltip = d3.select("body").append("div")   
					.attr("class", "tooltip")               
					.style("opacity", 0);

};



		// Mode zoom si true
		var zoomed = false;


		Treemap.prototype.switchData = function(datajson){

				// Mise en place des candidats
				switch(datajson){
					case 'json/debat1981.json':{
				document.getElementById("droite").innerHTML = "Valérie Giscard D'Estaing";
				document.getElementById("gauche").innerHTML = "François Mitterand";
				document.getElementById("centre").innerHTML = "C'est le débat 1981";
				}
				break;
					case 'json/debat1988.json':{
				document.getElementById("droite").innerHTML = "Jacques Chirac";
				document.getElementById("gauche").innerHTML = "François Mitterand";
				document.getElementById("centre").innerHTML = "C'est le débat 1988";
				}
				break;
					case 'json/debat1995.json':{
				document.getElementById("droite").innerHTML = "Jacques Chirac";
				document.getElementById("gauche").innerHTML = "Lionel Jospin";
				document.getElementById("centre").innerHTML = "C'est le débat 1995";
				}
				break;
					case 'json/debat2007.json':{
				document.getElementById("droite").innerHTML = "Nicolas Sarkozy";
				document.getElementById("gauche").innerHTML = "Ségolène Royal";
				document.getElementById("centre").innerHTML = "C'est le débat 2007";
				}
				break;
					case 'json/flare.json':{
				document.getElementById("droite").innerHTML = "Titus Pullo";
				document.getElementById("gauche").innerHTML = "Lucius Vorenus";
				document.getElementById("centre").innerHTML = "C'est le débat romain";
					}
				break;
					default:{
				document.getElementById("droite").innerHTML = "Alpha";
				document.getElementById("gauche").innerHTML = "Beta";
				document.getElementById("centre").innerHTML = "On est encore en construction";
					}
				}

				treemap = d3.layout.treemap()
					.size([width, height])
					.sticky(true)
					.value(function(d) { return d.size; });
		
				document.getElementById("treemap").innerHTML = "";
	
			drawTreemap(datajson)
		}


		function drawTreemap(datajson){
			d3.json(datajson, function(error, root) {
				if (error) throw error;
	
				var nodes = [];
	
				nodes = treemap.nodes(root);

				var visu_node = null;

				//Crée les noeuds 
				visu_node = div.datum(root).selectAll(".node")
					.data(nodes)
				.enter().append("div")
					.attr("class", "node")
					.attr("id", function(d){
				switch(d.depth){
					case 0:{
					return d.name;
				}
				break;
					case 1:{
					return d.name;
					}
				break;
					case 2:{
					return d.name + " " + d.parent.name;
					}
				break;
					case 3:{
					return d.name + " " + d.parent.parent.name;
					}
				break;
					default:{
					return "rien";
					}
				}})
					.call(position)
					.text(function(d) { return d.children ? null : d.name; })
		
				visu_node
				.on("mouseover", function(d){									// S'active lorsque la souris est sur la treemap
					
				// Sélectionne le nom de la catégorie de la case sur laquelle est le curseur
				var themeCandidat0 = d.parent.name + " " 
						+ d.parent.parent.parent.children[0].name;
				var themeCandidat1 = d.parent.name + " " 
						+ d.parent.parent.parent.children[1].name;
		
				// Sélectionne les éléments (div) des catégories des cases concernées
				var parentCandidat0 = document.getElementById(themeCandidat0);
				var parentCandidat1 = document.getElementById(themeCandidat1);
		
				if(zoomed == false){
				// Fade toutes les cases
				visu_node.style("opacity", 0.1); 
				}

				// Hightlight les cases des catégories 
				parentCandidat0.style.opacity = 1;
				parentCandidat1.style.opacity = 1;
		
				// Hightlight le mot
				d3.select(this).style("opacity", 1.5);
				})
				.on("mouseout",function(){										//S'active lorsque le curseur quitte la treemap

				// Plus de fading quand le curseur est hors treemap				
				visu_node.style("opacity", 1);
				
				// Le tooltip s'efface progressivement (500ms)		
				tooltip.transition()        
					.duration(500)      
					.style("opacity", 0);   
							})
				.on("mousemove", function(d){									// S'active lorsque la souris se déplace sur la treemap
		
				// Le tooltip apparait progressivement (500ms)
				tooltip.transition()        
					.duration(500)      
					.style("opacity", .9);    

				// Remplissage du tooltip  
				tooltip.html("Locuteur: " + d.parent.parent.name+"<br/>"+
					"Thème: " +  d.parent.name+"<br/>"+
					"Poids du thème: " + d.parent.value+"<br/>"+
					"Poids du mot: " + d.size)  
					.style("left", d3.event.pageX -170 + "px")     
					.style("top", (d3.event.pageY - 28) + "px");   

				})
				.on("dblclick", function(d){									// S'active lors d'un double clic sur la treemap
				visu_node.style("opacity", 1);
		
				})
				.on("click", function(d) {										// S'active lors d'un clic (gauche) sur la treemap
					zoomed = true;
			
					showTooltip("Faites un clic droit pour revenir à la treemap globale !", "global-treemap" , 80, 60, true);
			
					div.selectAll("div")
						.data(treemap.value(function(e) { 
							if(e.parent.name == d.parent.name){
								return e.size;}
							if(e.parent.parent.name == d.parent.parent.name){
								return e.parent.size;}
							else{
								return 0;}
							}))
						 .style("background", function(f) {
						nodesbis = nodes;
						nodesbis = nodesbis.filter(function(obj){return obj.depth == 1 ? true : false})
						console.log(nodesbis)
						 if(f == nodesbis[0]){
							return '887F7F';}
						if(f == nodesbis[1]){
							return 'EE88CC';}
							})
						.transition()
						.duration(1500)
						.call(position);
						
						//Ajoute le nom du thème en bas
						contexte.style("opacity",0);
						
						contexte.transition()        
						.duration(2000)      
						.style("opacity", 1);  

						contexte.html("C'est le thème: "+ d.parent.name);
					
					})
				.on("contextmenu", function(d) {										// S'active lors d'un clic (droit) sur la treemap
					div.selectAll("div")
						.data(treemap.value(function(e) { return e.size;}))
						 .style("background", function(e) { return e.children ? color(e.name) : null;})
						.transition()
						.duration(1500)
						.call(position);
						
						//Supprime le nom du thème
						contexte.transition()        
						.duration(1000)      
						.style("opacity", 0);  
						
						contexte.html("");
				
						zoomed = false;})
				.transition().duration(1000).style("background", function(d) { return d.children ? color(d.name) : null; });


				//Passage de count à size, et inversement (caché dans la version finale)
				d3.selectAll("input").on("change", function change() {
				var value = this.value === "count"
					? function() { return 1; }
					: function(d) { return d.size; };
		

				visu_node
					.data(treemap.value(value).nodes)
					.transition()
					.duration(1500)
					.call(position);
				});
			
			//Fonction positionnant les rectangles
			function position() {
				this.style("left", function(d) { return d.x + "px"; })
					.style("top", function(d) { return d.y + "px"; })
					.style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
					.style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
			}
			});
		};

return Treemap;

})();

