		
		// Funktion zum Extrahieren von Parametern aus der URL
		function getParameterByName(name, url) {
			// Überprüft, ob die URL angegeben ist, andernfalls wird die aktuelle URL verwendet
			if (!url) url = window.location.href;
			// Ersetzt spezielle Zeichen im Namen des Parameters für den Einsatz im regulären Ausdruck
			name = name.replace(/[\[\]]/g, "\\$&");
			// Erstellt einen regulären Ausdruck, um den Wert des Parameters aus der URL zu extrahieren
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			// Überprüft, ob ein Ergebnis vorliegt, andernfalls wird null zurückgegeben
			if (!results) return null;
			// Überprüft, ob ein Wert vorhanden ist, andernfalls wird ein leerer String zurückgegeben
			if (!results[2]) return '';
			// Dekodiert den extrahierten Wert und ersetzt "+" durch Leerzeichen
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		}

	// Funktion zum Anzeigen der extrahierten Parameterwerte
	function anzeigenName() {
		// Extrahiert die Parameterwerte aus der URL
		var name = getParameterByName('name');
		var krisengebiet = getParameterByName('krisengebiet');
		var kleidung = getParameterByName('kleidung');
		var kleidunggroesse = getParameterByName('kleidunggroesse');
		// Elemente für die Anzeige der Parameterwerte
		var nameAnzeige = document.getElementById('nameAnzeige');
		var krisengebietAnzeige = document.getElementById('krisengebietAnzeige');
		var kleidungAnzeige = document.getElementById('kleidungAnzeige');
		var kleidunggroesseAnzeige = document.getElementById('kleidunggroesseAnzeige');
		// Anzeige des Benutzernamens oder einer Fehlermeldung
		if (name !== null && name !== '') {
			nameAnzeige.innerHTML = '<p>Willkommen, ' + name + '!' + ' <br><br> Vielen Dank für deine Registrierung und deine Spende!</p>';
		} else {
			nameAnzeige.innerHTML = '<p>Benutzername nicht gefunden.</p>';
		}
		// Anzeige des ausgewählten Krisengebiets oder einer Fehlermeldung
		if (krisengebiet !== null && krisengebiet !== '') {
			krisengebietAnzeige.innerHTML = '<p>Ausgewähltes Kriegsgebiet: ' + krisengebiet + '</p>';
		} else {
			krisengebietAnzeige.innerHTML = '<p>Kriegsgebiet nicht ausgewählt.</p>';
		}
		// Anzeige der ausgewählten Kleidung oder einer Fehlermeldung
		if (kleidung !== null && kleidung !== '') {
			kleidungAnzeige.innerHTML = '<p>Ausgewählte Kleidung: ' + kleidung + '</p>';
		} else {
			kleidungAnzeige.innerHTML = '<p>Kleidung nicht ausgewählt.</p>';
		}
		// Anzeige der ausgewählten Kleidungsgröße oder einer Fehlermeldung
		if (kleidunggroesse !== null && kleidunggroesse !== '') {
			kleidunggroesseAnzeige.innerHTML = '<p>Ausgewählte Größe: ' + kleidunggroesse + '</p>';
		} else {
			kleidunggroesseAnzeige.innerHTML = '<p>Größe nicht ausgewählt.</p>';
		}
	}





// Rufe die Funktionen beim Laden der Seite auf
window.onload = function () {
    anzeigenName();
	anzeigenUhrzeitDatum();
};


			// Funktion zum Ein- oder Ausblenden von Formularfeldern basierend auf der Auswahl
			function toggleFormFields() {
				// Elemente für die Abfrage der Auswahl und Formularfelder
				var umfrageDropdown = document.getElementById('umfrage');
				var abholungDetails = document.getElementById('abholungDetails');
				var plzInput = document.getElementById('plz');
				var strasseInput = document.getElementById('strasse');
				var hausnummerInput = document.getElementById('hausnummer');

				// Überprüft die Auswahl und passt die Anzeige der Formularfelder entsprechend an
				if (umfrageDropdown.value === 'nein') {
					abholungDetails.style.display = 'block';
					plzInput.setAttribute("required", "true");
					strasseInput.setAttribute("required", "true");
					hausnummerInput.setAttribute("required", "true");
				} else {
					abholungDetails.style.display = 'none';
					plzInput.removeAttribute("required");
					strasseInput.removeAttribute("required");
					hausnummerInput.removeAttribute("required");
				}
			}

	// Funktion Überprüfung ob die PLZ mit "79" startet
	function isValidPLZ(plz) {
		return plz.startsWith("79");
	}



// New handleFormSubmit function
function handleFormSubmit(event) {
    event.preventDefault(); // Prevents the default form submission

    // Collect selected values
    var umfrageValue = document.getElementById('umfrage').value;
    var nameValue = document.getElementById('name').value;
    var krisengebietValue = document.getElementById('krisengebiet').value; // Neues Feld
    var kleidungValue = document.getElementById('kleidung').value;
    var kleidunggroesseValue = document.getElementById('kleidunggroesse').value;

    // Additional values for pickup
    var plzValue = "";
    var strasseValue = "";
    var hausnummerValue = "";

    if (umfrageValue === 'nein') {
        plzValue = document.getElementById('plz').value;
        strasseValue = document.getElementById('strasse').value;
        hausnummerValue = document.getElementById('hausnummer').value;

        // Überprüfung ob die PLZ mit "79" startet
        if (!isValidPLZ(plzValue)) {
            alert("Die Abholadresse muss im Bereich der Postleitzahlen 79 liegen.");
            return; 
        }
    }

    // Neue Überprüfung für das ausgewählte Kriegsgebiet
    if (krisengebietValue === '') {
        alert("Bitte wählen Sie ein Kriegsgebiet aus.");
        return; 
    }

    // Wenn alle Überprüfungen erfolgreich sind, leite zur Registrierungsseite weiter
    window.location.href = "Registrierung.html?name=" + encodeURIComponent(nameValue) + "&krisengebiet=" + encodeURIComponent(krisengebietValue) + "&kleidung=" + encodeURIComponent(kleidungValue) + "&kleidunggroesse=" + encodeURIComponent(kleidunggroesseValue);

}

        // Funktion zum Anzeigen der aktuellen Uhrzeit und des Datums
        function anzeigenUhrzeitDatum() {
            var uhrzeitDatumAnzeige = document.getElementById('uhrzeitDatumAnzeige');
            var aktuelleZeit = new Date();

            var stunden = aktuelleZeit.getHours();
            var minuten = aktuelleZeit.getMinutes();
            var sekunden = aktuelleZeit.getSeconds();

            var tag = aktuelleZeit.getDate();
            var monat = aktuelleZeit.getMonth() + 1; // Monate werden von 0 bis 11 gezählt
            var jahr = aktuelleZeit.getFullYear();

            // Formatierung der Uhrzeit und des Datums
            var formatierteUhrzeit = stunden + ':' + minuten + ':' + sekunden;
            var formatiertesDatum = tag + '.' + monat + '.' + jahr;

            uhrzeitDatumAnzeige.innerHTML = '<p>Datum: ' + formatiertesDatum + ' ' + formatierteUhrzeit +  '</p>';
        }
		
		
		
		
// Füge die Klasse .active zum aktuellen Navigationslink hinzu, basierend auf der aktuellen URL
document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname.split('/').pop(); // Hole den Dateinamen der aktuellen Seite
    var navLinks = document.querySelectorAll('.nav-link');

    // Iteriere durch die Navigationslinks und füge .active hinzu, wenn die URL übereinstimmt
    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

document.getElementById('name').addEventListener('input', function() {
    const nameInput = this.value.trim();
    const validNamePattern = /^[a-zA-Z\s]+$/;
    if (!validNamePattern.test(nameInput)) {
        alert('Der Name darf nur Buchstaben und Leerzeichen enthalten.');
        this.value = ''; // Setzen Sie das Eingabefeld zurück oder zeigen Sie eine Fehlermeldung an
    }
});

		document.getElementById('plz').addEventListener('input', function() {
			// Entfernen Sie Leerzeichen und prüfen Sie, ob es sich nur um Zahlen handelt
			const plzInput = this.value.trim();
			const validPlzPattern = /^\d{1,5}$/;
			if (!validPlzPattern.test(plzInput)) {
				alert('Die PLZ darf nur aus Zahlen bestehen und maximal 5 Zeichen haben.');
				this.value = '';
			}
		});

document.getElementById('strasse').addEventListener('input', function() {
    const strasseInput = this.value.trim();
    const validStrassePattern = /^[a-zA-ZäöüßÄÖÜ\s]+$/; // Erlaubt nur Buchstaben, Leerzeichen und Umlaute

    if (!validStrassePattern.test(strasseInput)) {
        alert('Ungültige Eingabe für die Straße. Es dürfen nur Buchstaben verwendet werden.');
		this.value = '';
    }
});


document.getElementById('hausnummer').addEventListener('input', function() {
    const hausnummerInput = this.value.trim();
    const validHausnummerPattern = /^[0-9a-zA-Z\/\-]+$/; // Erlaubt Zahlen, Buchstaben, '-', '/'

    if (!validHausnummerPattern.test(hausnummerInput)) {
        alert('Ungültige Eingabe für die Hausnummer. Erlaubt sind nur Zahlen, Buchstaben, "-" und "/"');
        this.value = ''; // Setzen Sie das Eingabefeld zurück oder zeigen Sie eine Fehlermeldung an
    }
});