document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen, initialisiere App...');
    
    // Tab-Wechsel
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Faktoren berechnen und anzeigen
    function updateFactors(pattern) {
        // Maschenprobe Anleitung
        const anleitungMaschen = parseFloat(document.getElementById(`${pattern}-anleitung-maschen`).value) || 0;
        const anleitungMaschenCm = parseFloat(document.getElementById(`${pattern}-anleitung-maschen-cm`).value) || 10;
        
        // Maschenprobe Meine
        const meineMaschen = parseFloat(document.getElementById(`${pattern}-meine-maschen`).value) || 0;
        const meineMaschenCm = parseFloat(document.getElementById(`${pattern}-meine-maschen-cm`).value) || 10;
        
        // Reihenprobe Anleitung
        const anleitungReihen = parseFloat(document.getElementById(`${pattern}-anleitung-reihen`).value) || 0;
        const anleitungReihenCm = parseFloat(document.getElementById(`${pattern}-anleitung-reihen-cm`).value) || 10;
        
        // Reihenprobe Meine
        const meineReihen = parseFloat(document.getElementById(`${pattern}-meine-reihen`).value) || 0;
        const meineReihenCm = parseFloat(document.getElementById(`${pattern}-meine-reihen-cm`).value) || 10;
        
        // Normalisierte Werte (auf 10cm)
        const anleitungMaschenNorm = anleitungMaschen * (10 / anleitungMaschenCm);
        const meineMaschenNorm = meineMaschen * (10 / meineMaschenCm);
        const anleitungReihenNorm = anleitungReihen * (10 / anleitungReihenCm);
        const meineReihenNorm = meineReihen * (10 / meineReihenCm);
        
        // Faktoren berechnen
        let maschenFaktor = 1;
        let reihenFaktor = 1;
        
        if (anleitungMaschenNorm > 0 && meineMaschenNorm > 0) {
            maschenFaktor = meineMaschenNorm / anleitungMaschenNorm;
        }
        
        if (anleitungReihenNorm > 0 && meineReihenNorm > 0) {
            reihenFaktor = meineReihenNorm / anleitungReihenNorm;
        }
        
        // Faktoren anzeigen
        document.getElementById(`${pattern}-maschen-faktor`).textContent = maschenFaktor.toFixed(3);
        document.getElementById(`${pattern}-reihen-faktor`).textContent = reihenFaktor.toFixed(3);
        
        console.log(`Faktoren für ${pattern} aktualisiert:`, {
            maschenFaktor: maschenFaktor.toFixed(3),
            reihenFaktor: reihenFaktor.toFixed(3)
        });
    }
    
    // Umrechnung durchführen
    function updateConversion(pattern) {
        const maschenFaktor = parseFloat(document.getElementById(`${pattern}-maschen-faktor`).textContent);
        const reihenFaktor = parseFloat(document.getElementById(`${pattern}-reihen-faktor`).textContent);
        
        const anleitungMaschen = document.getElementById(`${pattern}-convert-maschen-anleitung`).value;
        const anleitungReihen = document.getElementById(`${pattern}-convert-reihen-anleitung`).value;
        
        console.log(`Umrechnung für ${pattern}:`, {
            maschenFaktor,
            reihenFaktor,
            anleitungMaschen,
            anleitungReihen
        });
        
        if (anleitungMaschen) {
            const meineMaschen = Math.round(parseFloat(anleitungMaschen) * maschenFaktor);
            document.getElementById(`${pattern}-convert-maschen-meine`).value = meineMaschen;
            console.log(`Maschen umgerechnet: ${anleitungMaschen} → ${meineMaschen}`);
        } else {
            document.getElementById(`${pattern}-convert-maschen-meine`).value = '';
        }
        
        if (anleitungReihen) {
            const meineReihen = Math.round(parseFloat(anleitungReihen) * reihenFaktor);
            document.getElementById(`${pattern}-convert-reihen-meine`).value = meineReihen;
            console.log(`Reihen umgerechnet: ${anleitungReihen} → ${meineReihen}`);
        } else {
            document.getElementById(`${pattern}-convert-reihen-meine`).value = '';
        }
    }
    
    // Event-Listener für alle Eingabefelder
    ['normal', 'rib'].forEach(pattern => {
        // Liste aller Eingabefelder, die die Faktoren beeinflussen
        const factorInputs = [
            `${pattern}-anleitung-maschen`,
            `${pattern}-anleitung-maschen-cm`,
            `${pattern}-meine-maschen`,
            `${pattern}-meine-maschen-cm`,
            `${pattern}-anleitung-reihen`,
            `${pattern}-anleitung-reihen-cm`,
            `${pattern}-meine-reihen`,
            `${pattern}-meine-reihen-cm`
        ];
        
        // Event-Listener für Faktor-Eingabefelder
        factorInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    updateFactors(pattern);
                    updateConversion(pattern);
                });
            } else {
                console.warn(`Element mit ID ${id} nicht gefunden`);
            }
        });
        
        // Event-Listener für Umrechnungs-Eingabefelder
        const convertInputs = [
            `${pattern}-convert-maschen-anleitung`,
            `${pattern}-convert-reihen-anleitung`
        ];
        
        convertInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    updateConversion(pattern);
                });
            } else {
                console.warn(`Element mit ID ${id} nicht gefunden`);
            }
        });
    });
    
    // Initialisierung
    updateFactors('normal');
    updateFactors('rib');
    
    console.log('App initialisiert');
});