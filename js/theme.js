/* ============================================
   KALKULATORNORGE.NO - LYS/MØRK MODUS
   Lastes i <head> uten defer slik at riktig tema
   settes før siden tegnes.
   ============================================ */
(function () {
    'use strict';

    var STORAGE_KEY = 'kalk-theme';
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function storedTheme() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function systemTheme() {
        return media && media.matches ? 'dark' : 'light';
    }

    function cssVar(name) {
        return getComputedStyle(root).getPropertyValue(name).trim();
    }

    function chartColor(index) {
        return cssVar('--chart-' + ((index % 6) + 1));
    }

    function syncCharts() {
        if (!window.Chart) return;
        window.Chart.defaults.color = cssVar('--color-text-secondary');
        window.Chart.defaults.borderColor = cssVar('--color-border');
        Object.keys(window.Chart.instances || {}).forEach(function (id) {
            window.Chart.instances[id].update();
        });
    }

    function syncToggles(theme) {
        var label = theme === 'dark' ? 'Bytt til lys modus' : 'Bytt til mørk modus';
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);
            btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        });
    }

    function apply(theme) {
        root.setAttribute('data-theme', theme);
        syncToggles(theme);
        syncCharts();
    }

    function setTheme(theme) {
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* privat modus */ }
        apply(theme);
    }

    function currentTheme() {
        return root.getAttribute('data-theme') || 'light';
    }

    var TOGGLE_HTML =
        '<svg class="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
        '<svg class="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

    function insertToggle() {
        var header = document.querySelector('.header-content');
        if (!header || header.querySelector('.theme-toggle')) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        btn.innerHTML = TOGGLE_HTML;
        btn.addEventListener('click', function () {
            setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        });
        header.appendChild(btn);
        syncToggles(currentTheme());
    }

    apply(storedTheme() || systemTheme());

    if (media) {
        var onSystemChange = function () {
            if (!storedTheme()) apply(systemTheme());
        };
        if (media.addEventListener) media.addEventListener('change', onSystemChange);
        else if (media.addListener) media.addListener(onSystemChange);
    }

    document.addEventListener('DOMContentLoaded', function () {
        insertToggle();
        syncCharts();
    });

    window.KalkTheme = {
        get: currentTheme,
        set: setTheme,
        cssVar: cssVar,
        chartColor: chartColor,
        /* Skriptbare Chart.js-verdier: evalueres på nytt ved hver oppdatering */
        segmentColor: function (ctx) { return chartColor(ctx.dataIndex); },
        surfaceColor: function () { return cssVar('--color-surface'); }
    };
})();
