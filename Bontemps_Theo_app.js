let listRegion;
let listDesNomsDeRegions = []
let regionRandom;
let thisRegion;
let nom;
function demarrer() {
    //On charge les infos des régions
    chargerJSON("./listRegion.json", (text) => { listRegion = JSON.parse(text) })
    setTimeout(() => {
    	for(let region in listRegion) {
    		listDesNomsDeRegions.push(region)
    	}

    	regionRandom = listDesNomsDeRegions[Math.floor((Math.random() * listDesNomsDeRegions.length))]
	    //On fait l'abonnement de toutes les zones de la carte
	    var allPath = document.getElementsByTagName('path');
	    for(var i=0; i<allPath.length; i++) {
	        if(allPath[i].id.startsWith('region_')) {
	    		if(allPath[i].id == regionRandom) {
	    			thisRegion = document.getElementById(allPath[i].id)
	    			afficherProfil(thisRegion)
	    		}
	        }
	    }
    }, 100)
}

function afficherProfil(thisRegion) {
    oldRegionId = thisRegion.id
    thisRegion.style.fill = "rgb(255, 255, 255)"
    nom = listRegion[thisRegion.id].nom
    let prefecture = listRegion[thisRegion.id].prefecture
    let population = listRegion[thisRegion.id].population
    let sectionUl = document.getElementById('departement')
    sectionUl.innerHTML = ""
    document.getElementById('nom').innerHTML = "?"
    document.getElementById('prefecture').innerHTML = `Prefecture : ${prefecture}`
    document.getElementById('population').innerHTML = `Nombre d'habitants : ${population}`
    document.getElementById('listDep').innerHTML = "Liste des departements :"

    for(let i=0;i<listRegion[thisRegion.id].departements.length;i++) {
        let li = document.createElement('li')
        li.innerHTML = listRegion[thisRegion.id].departements[i]
        sectionUl.appendChild(li)
    }
}

function verifInput(event){
    if(event.key != "Enter") return
    console.log(document.getElementById("input").value)
    console.log(nom)
    if(document.getElementById("input").value == nom) {
        document.getElementById('nom').innerHTML = nom
        document.getElementById('infos').className = "infosV"
    } else {
        document.getElementById('nom').innerHTML = nom
        document.getElementById('infos').className = "infosX"
    }
}


function chargerJSON(file, callback) {
    let rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", file, true)
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState == 4 && rawFile.status == "200") {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}

window.addEventListener('keydown', verifInput)
window.addEventListener('load', demarrer)