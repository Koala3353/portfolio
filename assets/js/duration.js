document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.duration-badge').forEach(function (badge) {
        var startStr = badge.getAttribute('data-start');
        if (!startStr) return;

        var parts = startStr.split('-');
        var startYear = parseInt(parts[0], 10);
        var startMonth = parseInt(parts[1], 10);

        var now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth() + 1;

        var totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
        if (totalMonths < 0) totalMonths = 0;

        var years = Math.floor(totalMonths / 12);
        var months = totalMonths % 12;

        var duration = '';
        if (years > 0) {
            duration += years + ' yr' + (years > 1 ? 's' : '');
        }
        if (months > 0) {
            if (duration) duration += ' ';
            duration += months + ' mo' + (months > 1 ? 's' : '');
        }
        if (!duration) duration = '< 1 mo';

        badge.textContent += ' · ' + duration;
    });
});
