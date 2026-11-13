/* ============================================
   KALKULATORNORGE.NO - DEL OG LAGRE
   Felles deling for kalkulatorer uten egne
   delefunksjoner. Leser resultatet fra #results.
   ============================================ */
(function () {
    'use strict';

    var JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

    function pageTitle() {
        var h1 = document.querySelector('h1');
        return h1 ? h1.textContent.trim() : document.title;
    }

    function pageUrl() {
        return window.location.origin + window.location.pathname;
    }

    function clean(text) {
        return text.replace(/\s+/g, ' ').trim();
    }

    function resultRows() {
        var results = document.getElementById('results');
        if (!results) return [];
        var rows = [];
        results.querySelectorAll('.results-table tbody tr, .result-row').forEach(function (row) {
            if (row.offsetParent === null) return;
            var cells = row.querySelectorAll('td, .result-row-label, .result-row-value');
            if (cells.length >= 2) rows.push([clean(cells[0].textContent), clean(cells[cells.length - 1].textContent)]);
        });
        results.querySelectorAll('.total-label, .monthly-label, .result-card-title').forEach(function (label) {
            var value = label.nextElementSibling;
            if (label.classList.contains('result-card-title')) value = label.parentElement.querySelector('.result-card-subtitle');
            if (value) rows.push([clean(label.textContent), clean(value.textContent)]);
        });
        return rows;
    }

    function summaryText() {
        return [pageTitle(), ''].concat(resultRows().map(function (r) { return r[0] + ': ' + r[1]; }))
            .concat(['', 'Beregnet med ' + pageUrl()]).join('\n');
    }

    function withJsPDF(callback) {
        if (window.jspdf) return callback();
        var script = document.createElement('script');
        script.src = JSPDF_URL;
        script.onload = callback;
        script.onerror = function () { alert('Kunne ikke laste PDF-verktøyet. Prøv igjen senere.'); };
        document.head.appendChild(script);
    }

    function pdf() {
        withJsPDF(function () {
            var doc = new window.jspdf.jsPDF();
            var y = 22;
            doc.setFontSize(18);
            doc.text(pageTitle(), 20, y);
            y += 8;
            doc.setFontSize(10);
            doc.text('Generert ' + new Date().toLocaleDateString('nb-NO') + ' - kalkulatornorge.no', 20, y);
            y += 12;
            doc.setFontSize(11);
            resultRows().forEach(function (r) {
                if (y > 275) { doc.addPage(); y = 20; }
                doc.text(doc.splitTextToSize(r[0], 110), 20, y);
                doc.text(r[1], 190, y, { align: 'right' });
                y += 8;
            });
            y += 6;
            doc.setFontSize(9);
            doc.text('Beregningen er veiledende. Se ' + pageUrl() + ' for detaljer.', 20, y);
            doc.save(pageTitle().toLowerCase().replace(/[^a-z0-9æøå]+/g, '-') + '.pdf');
        });
    }

    function email() {
        window.location.href = 'mailto:?subject=' + encodeURIComponent(pageTitle()) + '&body=' + encodeURIComponent(summaryText());
    }

    function open(url) {
        window.open(url, '_blank', 'noopener');
    }

    function shareText() {
        return 'Jeg brukte ' + pageTitle() + ' på Kalkulatornorge.no - gratis og enkelt!';
    }

    function copy() {
        var text = summaryText();
        if (!navigator.clipboard) { prompt('Kopier teksten:', text); return; }
        navigator.clipboard.writeText(text).then(function () {
            alert('Resultatet er kopiert til utklippstavlen!');
        }).catch(function () { prompt('Kopier teksten:', text); });
    }

    window.KalkShare = {
        pdf: pdf,
        email: email,
        copy: copy,
        x: function () { open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText()) + '&url=' + encodeURIComponent(pageUrl())); },
        facebook: function () { open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl())); },
        linkedin: function () { open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(pageUrl())); }
    };
})();
