// Création automatique des subgenres
// 4 variables de sorties
// 1) RES.data_subgenre avec toutes les infos d'un subgenre
// 2) RES.data_name_subgenre les noms des subgenre
// 3) RES.data_counter_subgenre le nombre de livre par subgenre
// 4) RES.taille_bibliotheque la taille de la bibliotheque
function genre_mngmt(Livres) {
    var taille_bibliotheque = 0;
    data_name_subgenre = []; // Noms des genres
    data_counter_subgenre = []; // Nombre de livres par genre

    for (i = 0; Livres.length > i; i += 1) {
        taille_bibliotheque = taille_bibliotheque + Livres[i].tomes; // Nombre de livres dans la bibliothèques

        subgenre_i = Livres[i].subgenre;
        subgenre2_i = Livres[i].subgenre2;
        tomes_i = Livres[i].tomes;
        // PREMIER GENRE
        var indice_subgenre_i = data_name_subgenre.indexOf(subgenre_i); // recherche du genre
        if (indice_subgenre_i == -1) {
            data_name_subgenre.push(subgenre_i); // Il n'existe pas, on l'ajoute
            data_counter_subgenre.push(tomes_i); // On compte les livres
        } else { // Il existe
            data_counter_subgenre[indice_subgenre_i] = data_counter_subgenre[indice_subgenre_i] + tomes_i; // On compte les livres
        }
        // SECOND GENRE
        if (subgenre2_i != undefined) { // Il ya un second genre
            // recherche du second genre
            var indice_subgenre2_i = data_name_subgenre.indexOf(subgenre2_i);
            if (indice_subgenre2_i == -1) {
                data_name_subgenre.push(subgenre2_i); // Il n'existe pas, on l'ajoute
                data_counter_subgenre.push(tomes_i); // On compte les livres
            } else { // Il existe
                data_counter_subgenre[indice_subgenre2_i] = data_counter_subgenre[indice_subgenre2_i] + tomes_i;
            }
        }
    };

    var scale_genre = 0;
    var scale_genre_c = 20;
    var data_subgenre = [];
    for (i = 0; data_name_subgenre.length > i; i += 1) {
        var color_temp = [];
        if (data_name_subgenre[i] == "Fantasy") {
            color_temp = "rgb(200, 100, 200)";
        } else if (data_name_subgenre[i] == "Dark fantasy") {
            color_temp = "rgb(150, 050, 150)";
        } else if (data_name_subgenre[i] == "Policier") {
            color_temp = "rgb(100, 100, 100)";
        } else if (data_name_subgenre[i] == "Science-fiction") {
            color_temp = "rgb(000, 080, 150)";
        } else if (data_name_subgenre[i] == "Space-opéra") {
            color_temp = "rgb(000, 200, 255)";
        } else if (data_name_subgenre[i] == "Uchronie") {
            color_temp = "rgb(030, 050, 120)";
        } else if (data_name_subgenre[i] == "Histoire") {
            color_temp = "rgb(030, 120, 050)";
        } else if (data_name_subgenre[i] == "Ecologie") {
            color_temp = "rgb(000, 190, 000)";
        } else if (data_name_subgenre[i] == "Anarchisme") {
            color_temp = "rgb(000, 000, 000)";
        } else if (data_name_subgenre[i] == "Société") {
            color_temp = "rgb(220, 050, 000)";
        } else if (data_name_subgenre[i] == "Classique") {
            color_temp = "rgb(255, 170, 170)";
        } else if (data_name_subgenre[i] == "OLNI") {
            color_temp = "rgb(230, 180, 000)";
        }

        temp = {
            name: data_name_subgenre[i],
            tomes: data_counter_subgenre[i],
            radius: data_counter_subgenre[i] * scale_genre + scale_genre_c,
            color: color_temp,
            type: "genre",
            cluster: i
        };
        data_subgenre.push(temp);
    }
    var RES = {};
    RES.data_subgenre = data_subgenre;
    RES.data_name_subgenre = data_name_subgenre;
    RES.data_counter_subgenre = data_counter_subgenre;
    RES.taille_bibliotheque = taille_bibliotheque;
    return RES;
}
