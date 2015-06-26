// Mise en place du texte

function writeTextCloud(){

texte.style("opacity",0);

texte.transition()        
          .duration(2000)      
          .style("opacity", 1); 
					
document.getElementById("body-content-text").innerHTML = "Cliquez sur les mots pour voir le contexte.";


}

var dataset, tableauDebat;
var leftdata, rightdata;
var cloudPoliticianLeft, cloudPoliticianRight;

var texte= d3.select("#body-content-text");
var contexte= d3.select("#body-content-specific-low");

var cloudGauche = true;

//va chercher dans le texte brut la phrase correspondant au mot cliqué
   	var changePar = function(evt){

      for (var k=0;k<dataset.length;k++) {
				contexte.style("opacity",0);
        switch(evt.target.id) {
          case dataset[k].texte:
          var i = Math.floor(Math.random()*(dataset[k].position.length)) + 1;
					
          // Le tooltip apparait progressivement (500ms)
        contexte.transition()        
          .duration(500)      
          .style("opacity", 1);  

          contexte.html("<b><u>Contexte du mot</b></u> (" + i + "/" + dataset[k].position.length +  ") : <br></br>" + creerPhrase(tableauDebat,dataset[k].position[i-1]));

          
          break;
        }

      }

    }

//retourne la phrase correspondant à la position du mot clé dans son contexte
      function creerPhrase(tableauDebat,position) {
        var phrase = "";
        var i = position;

        //va jusqu'au premier point rencontré vers la droite
        while(tableauDebat[i]!=".") {
            if (tableauDebat[i]!=null)
              phrase = phrase.concat(tableauDebat[i]+" ");
          i++;
        }
        //pour rajouter le point final
        phrase = phrase.substring(0,phrase.length-1);
        phrase = phrase.concat(tableauDebat[i]);

        i = position-1;
        //va jusqu'au premier point rencontré vers la gauche
        while(tableauDebat[i]!=".") {
            if (tableauDebat[i]!=null)
              phrase = tableauDebat[i] + " " + phrase;
          i--;
        }
        return phrase;
      }


var Cloud = (function(){

		var Cloud = function(){};

var words, margin, width, height, dessin;

		Cloud.prototype.createCloud = function(){

			// Définition de la taille du div (la rendre variable plus tard)
			margin = {top: 40, right: 10, bottom: 10, left: 10},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			// Définition de la palette de couleurs		
			color = d3.scale.category20c();


			//variable globale qui contient le tableau avec texte et pondération
					dataset = [];
					//variable globale qui contient le texte brut
					tableauDebat = [];

					dessin = d3.select("#body-content-graph").append("svg").attr("id","dessin")
						      .attr("width", width)
						      .attr("height", height)
						    .append("g")
						    .selectAll("text")

		console.log("CreateCloud");

		};


   Cloud.prototype.changerDonnees = function(tableauMots,texteBrut) {

      d3.csv(tableauMots, function(data) {
        //conversion du fichier .csv en un tableau de données
        dataset = data.map(function(d) { return {texte: d.texte, poids : +d.poids, position: JSON.parse(d.position)}; });
          calculateData(dataset);
      });

      d3.csv(texteBrut, function(data) {
        //conversion du fichier debat.csv en un tableau de données
        tableauDebat = data.map(function(d) { return d.texte });

      });

		console.log("ChangerDonnees");

    }
		
		Cloud.prototype.loadButtons = function(year){
			
			switch(year){
					case 1981:{
          rightdata = ['csv/GiscardDansSonDebat.csv', 'csv/TexteBrutGiscardMiterrand1981.csv'];
          leftdata = ['csv/MiterrandDansSonDebat1981.csv', 'csv/TexteBrutGiscardMiterrand1981.csv'];
          Cloud.prototype.changerDonnees(leftdata[0],leftdata[1]);
          showTooltip("On commence avec François Miterrand!", "politician-name" , 70, 70, true, 200);
          cloudPoliticianLeft = "François Miterrand";
          cloudPoliticianRight = "Valéry Giscard D'Estaing";

				}
				break;
					case 1988:{
          rightdata = ['csv/ChiracDansSonDebat1988.csv', 'csv/TexteBrutChiracMiterrand1988.csv'];
          leftdata = ['csv/MiterrandDansSonDebat1988.csv', 'csv/TexteBrutChiracMiterrand1988.csv'];
          Cloud.prototype.changerDonnees(leftdata[0],leftdata[1]);
          showTooltip("On commence avec François Miterrand!", "politician-name" , 70, 70, true, 200);
          cloudPoliticianLeft = "François Miterrand";
          cloudPoliticianRight = "Jacques Chirac";

				}
				break;
					case 1995:{
				rightdata = ['csv/ChiracDansSonDebat1995.csv', 'csv/TexteBrutChiracJospin1995.csv'];
				leftdata = ['csv/JospinDansSonDebat.csv', 'csv/TexteBrutChiracJospin1995.csv'];
				Cloud.prototype.changerDonnees(rightdata[0],rightdata[1]);
				showTooltip("On commence avec Jacques Chirac!", "politician-name" , 70, 70, true, 200);
				cloudPoliticianLeft = "Lionel Jospin";
				cloudPoliticianRight = "Jacques Chirac";
				}
				break;
					case 2007:{
					rightdata = ['csv/SarkozyDansSonDebat.csv', 'csv/TexteBrutSarkozyRoyal2007.csv'];
					leftdata = ['csv/RoyalDansSonDebat.csv', 'csv/TexteBrutSarkozyRoyal2007.csv'];
					Cloud.prototype.changerDonnees(leftdata[0],leftdata[1]);
					showTooltip("On commence avec Ségolène Royal!", "politician-name" , 70, 70, true, 200);
					cloudPoliticianLeft = "Ségolène Royal";
					cloudPoliticianRight = "Nicolas Sarkozy";
				}
				break;				
			}
			
		}

		
      /*fonction qui à partir d'un tableau comptenant les mots accompagnés de leurs pondérations
        produit le tableau words qui contient le texte à afficher dans le nuage de mots et les caractéristiques de chaque mots (position, rotation, taille)*/
      function calculateData(dataset) {
				console.log("Début calcul");
          d3.layout.cloud().size([width, height])
              .words(dataset.map(function(d) {
                return {text: d.texte, size: 2^d.poids*5};
              }))
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw)
              .start();

			console.log("Fin calcul");

      }

      

      var fill = d3.scale.category20c();

      function draw(words) {
        //pour visualiser le tableau words
        console.log(words);

				d3.select("#svgdessin").remove();

        d3.select("#svgdessin").remove();

            dessin = d3.select("#dessin").append("svg").attr("id","nuage")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(470,225)")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
				.attr("id",function(d){return d.text;})
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; })
				.attr("onclick","changePar(evt)")
        .attr("cursor","pointer")
		.on("contextmenu", function(){
			d3.select("#nuage").remove();
			
			if(!cloudGauche){
				Cloud.prototype.changerDonnees(leftdata[0],leftdata[1]);
				showTooltip("C'est au tour de "+ cloudPoliticianLeft +"!", "politician-name" , 70, 50, true, 0);
				cloudGauche = true;
			}
			else{
				Cloud.prototype.changerDonnees(rightdata[0],rightdata[1]);
				showTooltip("C'est au tour de "+ cloudPoliticianRight +"!", "politician-name" , 70, 70, true, 0);
				cloudGauche = false;
			}
			})
			.on("mouseover", function(d){                     //augmente la transparence des autres mots lorsqu'on met la souris sur un mot-clé       
        
          //on met tout le nuage en transparent
          dessin.style("opacity", 0.1); 

          
          //surbrillance du mot-clé courant
          d3.select(this).style("opacity", 1);
          }).on("mouseout",function(){        

            //plus de transparence lorsque la souris est sur aucun mot  
            dessin.style("opacity", 1);
            });
      }

return Cloud;

})();
