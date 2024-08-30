flatpickr("#inline-calendar", {
    mode: "range",
    showMonths: 1,
    inline: true,  // This ensures the calendar is always visible
    onClose: function(selectedDates) {
        if (selectedDates.length === 2) {
            let startDate = selectedDates[0];
            let endDate = selectedDates[1];
            let differenceInTime = endDate.getTime() - startDate.getTime();
            let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        }
    }
});
