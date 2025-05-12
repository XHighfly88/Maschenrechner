document.addEventListener('DOMContentLoaded', function() {
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
        const anleitungMaschen = parseFloat(document.getElementById(`${pattern}-anleitung-maschen`).value);
        const meineMaschen = parseFloat(document.getElementById(`${pattern}-meine-maschen`).value);
        const anleitungReihen = parseFloat(document.getElementById(`${pattern}-anleitung-reihen`).value);
        const meineReihen = parseFloat(document.getElementById(`${pattern}-meine-reihen`).value);
        
        const maschenFaktor = meineMaschen / anleitungMaschen;
        const reihenFaktor = meineReihen / anleitungReihen;
        
        document.getElementById(`${pattern}-maschen-faktor`).textContent = maschenFaktor.toFixed(3);
        document.getElementById(`${pattern}-reihen-faktor`).textContent = reihenFaktor.toFixed(3);
    }
    
    // Umrechnung durchführen
    function updateConversion(pattern) {
        const maschenFaktor = parseFloat(document.getElementById(`${pattern}-maschen-faktor`).textContent);
        const reihenFaktor = parseFloat(document.getElementById(`${pattern}-reihen-faktor`).textContent);
        
        const anleitungMaschen = document.getElementById(`${pattern}-convert-maschen-anleitung`).value;
        const anleitungReihen = document.getElementById(`${pattern}-convert-reihen-anleitung`).value;
        
        if (anleitungMaschen) {
            const meineMaschen = Math.round(anleitungMaschen * maschenFaktor);
            document.getElementById(`${pattern}-convert-maschen-meine`).value = meineMaschen;
        } else {
            document.getElementById(`${pattern}-convert-maschen-meine`).value = '';
        }
        
        if (anleitungReihen) {
            const meineReihen = Math.round(anleitungReihen * reihenFaktor);
            document.getElementById(`${pattern}-convert-reihen-meine`).value = meineReihen;
        } else {
            document.getElementById(`${pattern}-convert-reihen-meine`).value = '';
        }
    }
    
    // Event-Listener für Eingabefelder
    ['normal', 'rib'].forEach(pattern => {
        // Maschenprobe-Eingaben
        document.getElementById(`${pattern}-anleitung-maschen`).addEventListener('input', () => {
            updateFactors(pattern);
            updateConversion(pattern);
        });
        
        document.getElementById(`${pattern}-meine-maschen`).addEventListener('input', () => {
            updateFactors(pattern);
            updateConversion(pattern);
        });
        
        document.getElementById(`${pattern}-anleitung-reihen`).addEventListener('input', () => {
            updateFactors(pattern);
            updateConversion(pattern);
        });
        
        document.getElementById(`${pattern}-meine-reihen`).addEventListener('input', () => {
            updateFactors(pattern);
            updateConversion(pattern);
        });
        
        // Umrechnungs-Eingaben
        document.getElementById(`${pattern}-convert-maschen-anleitung`).addEventListener('input', () => {
            updateConversion(pattern);
        });
        
        document.getElementById(`${pattern}-convert-reihen-anleitung`).addEventListener('input', () => {
            updateConversion(pattern);
        });
    });
    
    // Initialisierung
    updateFactors('normal');
    updateFactors('rib');
});