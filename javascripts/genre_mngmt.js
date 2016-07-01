function genre_mngmt(Livres) {
    
var jsonLivres_length = Object.keys(Livres).length;

// ==============SIZE COMPUTATION=================		
var taille_bibliotheque = 0;
var subgenre1_size = 0;
var subgenre2_size = 0;
var subgenre3_size = 0;
var subgenre4_size = 0;
var subgenre5_size = 0;
var subgenre6_size = 0;
var subgenre7_size = 0;
var subgenre8_size = 0;
var subgenre9_size = 0;
var subgenre10_size = 0;
var subgenre11_size = 0;
var subgenre12_size = 0;


for (i = 0; Livres.length > i; i += 1) {
  taille_bibliotheque = taille_bibliotheque + Livres[i].tomes;

  if (Livres[i].subgenre == "Science-fiction") {
    subgenre1_size = subgenre1_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Space-op\xE9ra") {
    subgenre2_size = subgenre2_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Uchronie") {
    subgenre3_size = subgenre3_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Policier") {
    subgenre4_size = subgenre4_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Classique") {
    subgenre5_size = subgenre5_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Dark fantasy") {
    subgenre6_size = subgenre6_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Fantasy") {
    subgenre7_size = subgenre7_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Histoire") {
    subgenre8_size = subgenre8_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Ecologie") {
    subgenre9_size = subgenre9_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Societ\xE9") {
    subgenre10_size = subgenre10_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "Anarchisme") {
    subgenre11_size = subgenre11_size + Livres[i].tomes;
  } else if (Livres[i].subgenre == "OLNI") {
    subgenre12_size = subgenre12_size + Livres[i].tomes;
  }

  if (Livres[i].subgenre2 == "Science-fiction") {
    subgenre1_size = subgenre1_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Space-op\xE9ra") {
    subgenre2_size = subgenre2_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Uchronie") {
    subgenre3_size = subgenre3_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Policier") {
    subgenre4_size = subgenre4_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Classique") {
    subgenre5_size = subgenre5_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Dark fantasy") {
    subgenre6_size = subgenre6_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Fantasy") {
    subgenre7_size = subgenre7_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Histoire") {
    subgenre8_size = subgenre8_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Ecologie") {
    subgenre9_size = subgenre9_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Societ\xE9") {
    subgenre10_size = subgenre10_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "Anarchisme") {
    subgenre11_size = subgenre11_size + Livres[i].tomes;
  } else if (Livres[i].subgenre2 == "OLNI") {
    subgenre12_size = subgenre12_size + Livres[i].tomes;
  }
};


var scale_genre = 0;
var scale_genre_c = 20;
var nodes_data_name_temp = ["Fantasy","Dark fantasy","Policier","Science-fiction","Space-op\xE9ra","Uchronie","Histoire", "Ecologie", "Anarchisme", "Societ\xE9", "Classique", "OLNI"];

var clusters_data_temp = [{
  name: "Fantasy",
  tomes: subgenre7_size,
  radius: subgenre7_size * scale_genre + scale_genre_c,
  color: "rgb(200, 100, 200)",
  type: "genre",
  cluster: 0
},{
  name: "Dark fantasy",
  tomes: subgenre6_size,
  radius: subgenre6_size * scale_genre + scale_genre_c,
  color: "rgb(150, 50, 150)",
  type: "genre",
  cluster: 1
}, {
  name: "Policier",
  tomes: subgenre4_size,
  radius: subgenre4_size * scale_genre + scale_genre_c,
  color: "rgb(100, 100, 100)",
  type: "genre",
  cluster: 2
},{
  name: "Science-fiction",
  tomes: subgenre1_size,
  radius: subgenre1_size * scale_genre + scale_genre_c,
  color: "rgb(000, 080, 150)",
  type: "genre",
  cluster: 3
}, {
  name: "Space-op\xE9ra",
  tomes: subgenre2_size,
  radius: subgenre2_size * scale_genre + scale_genre_c,
  color: "rgb(000, 180, 240)",
  type: "genre",
  cluster: 4
}, {
  name: "Uchronie",
  tomes: subgenre3_size,
  radius: subgenre3_size * scale_genre + scale_genre_c,
  color: "rgb(080, 200, 170)",
  type: "genre",
  cluster: 5
}, {
  name: "Histoire",
  tomes: subgenre8_size,
  radius: subgenre8_size * scale_genre + scale_genre_c,
  color: "rgb(050, 120, 100)",
  type: "genre",
  cluster: 6
}, {
  name: "Ecologie",
  tomes: subgenre9_size,
  radius: subgenre9_size * scale_genre + scale_genre_c,
  color: "rgb(000, 190, 000)",
  type: "genre",
  cluster: 7
}, {
  name: "Anarchisme",
  tomes: subgenre11_size,
  radius: subgenre11_size * scale_genre + scale_genre_c,
  color: "rgb(000, 000, 000)",
  type: "genre",
  cluster: 8
}, {
  name: "Societ\xE9",
  tomes: subgenre10_size,
  radius: subgenre10_size * scale_genre + scale_genre_c,
  color: "rgb(220, 050, 000)",
  type: "genre",
  cluster: 9
}, {
  name: "Classique",
  tomes: subgenre5_size,
  radius: subgenre5_size * scale_genre + scale_genre_c,
  color: "rgb(220, 110, 000)",
  type: "genre",
  cluster: 10
},{
  name: "OLNI",
  tomes: subgenre1_size,
  radius: subgenre12_size * scale_genre + scale_genre_c,
  color: "rgb(230, 180, 000)",
  type: "genre",
  cluster: 11
}];
var RES = {};
RES.clusters_data=clusters_data_temp;
RES.nodes_data_name=nodes_data_name_temp;
return RES;
}
