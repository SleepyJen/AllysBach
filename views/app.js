$(document).ready(function () {
    $('.voting').on('click', function () {
        window.location.href = './voting.html';
    });

    start();

    var name;
    var dates = [];
    var locations = [];
    var suggestions;

    $('.submit').on('click', function () {
        name = $('#name').val();
        $.each($("input[name='dates']:checked"), function () {
            dates.push($(this).val());
        });

        $.each($("input[name='locations']:checked"), function () {
            locations.push($(this).val());
        });

        if (name === '') {
            alert('Please enter your name');
        } else {
            handleResults();
        }
    });

    $('.suggestionsBtn').on('click', function () {
        name = $('#nameSuggestion').val();
        suggestions = $('#suggestions').val();

        if (name === '') {
            alert('Please enter your name');
        } else {
            handleSuggestions();
        }
    });

    function handleSuggestions() {
        $.ajax({
            method: 'GET',
            url: '/votes/getName',
            data: { name: name }
        }).then(result => {
            if (!result) {
                add();
                addSuggestions();
            } else {

            }
        });
    }

    function addSuggestions() {
        //the suggestion and the vote. 
        $.ajax({
            method: 'GET',
            url: '/votes/getName',
            data: { name: name }
        }).then(result => {
            let suggestion = result.suggestions;
            if (suggestion.length < 1) {
                let sugg = [suggestions, 1];
                $.ajax({
                    methid: 'POST',
                    url: `/votes/suggestions/${name}`,
                    data: { suggestions: sugg }
                }).then(res => {
                    console.log('added suggestion');
                });
            } else {
                for (let i = 0; i < suggestion.length; i++) {
                }
            }
        });
    }

    function handleResults() {
        $.ajax({
            method: 'GET',
            url: '/votes'
        }).then(result => {
            let people = [];
            if (result.length === 0) {
                add();
            } else {
                for (let i = 0; i < result.length; i++) {
                    people.push(result[i].name);
                }
                if (people.includes(name)) {
                    $.ajax({
                        method: 'GET',
                        url: '/votes/getName',
                        data: { name: name }
                    }).then(res => {
                        let date = res.dates;
                        let location = res.locations;
                        console.log(res);
                        addDates(date);
                        addLocations(location);
                    });
                } else {
                    add();
                }
            }
        });
    }

    function add() {
        $.ajax({
            method: 'POST',
            url: '/votes/name',
            data: { name: name }
        }).then(result => {
            console.log(result);
            for (let i = 0; i < dates.length; i++) {
                $.ajax({
                    method: 'POST',
                    url: `/votes/dates/${name}`,
                    data: { dates: dates[i] }
                }).then(res => {
                    console.log('cool dates');
                });
            }
            for (let j = 0; j < locations.length; j++) {
                $.ajax({
                    method: 'POST',
                    url: `/votes/locations/${name}`,
                    data: { locations: locations[j] }
                }).then(res2 => {
                    console.log('cool locations');
                });
            }
        });

    }

    function addDates(date) {
        for (let i = 0; i < dates.length; i++) {
            if (!date.includes(dates[i])) {
                $.ajax({
                    method: 'POST',
                    url: `/votes/dates/${name}`,
                    data: { dates: dates[i] }
                }).then(result => {
                    console.log(result);
                });
            }
        }
    }

    function addLocations(location) {
        for (let i = 0; i < locations.length; i++) {
            if (!location.includes(locations[i])) {
                $.ajax({
                    method: 'POST',
                    url: `/votes/locations/${name}`,
                    data: { locations: locations[i] }
                }).then(result => {
                    console.log(result);
                });
            }
        }
    }

    function start() {
        $.ajax({
            method: 'GET',
            url: '/votes'
        }).then(result => {
            let mapDates = {};
            let mapLocations = {};
            let mostDate = [];
            let mostLocation = [];
            let maxDate = -1;
            let maxLocation = -1;

            for (let i = 0; i < result.length; i++) {
                let thisDate = result[i].dates;
                let thisLocations = result[i].locations;
                console.log(result[i]);
                for (let j = 0; j < thisDate.length; j++) {
                    if (mapDates[thisDate[j]]) {
                        mapDates[thisDate[j]] = mapDates[thisDate[j]] + 1;
                    } else {
                        mapDates[[thisDate[j]]] = 1;
                    }
                }
                for (let k = 0; k < thisLocations.length; k++) {
                    if (mapLocations[thisLocations[k]]) {
                        mapDates[thisDate[k]] = mapDates[thisLocations[k]] + 1;
                    } else {
                        mapLocations[[thisLocations[k]]] = 1;
                    }
                }

            }
            for (const element in mapDates) {
                if (mapDates[element] >= maxDate) {
                    maxDate = mapDates[element];
                }
            }
            for (const element in mapDates) {
                if (mapDates[element] === maxDate) {
                    mostDate.push(element);
                }
            }

            for (const element in mapLocations) {
                if (mapLocations[element] >= maxLocation) {
                    maxLocation = mapLocations[element];
                }
            }
            for (const element in mapLocations) {
                if (mapLocations[element] === maxLocation) {
                    mostLocation.push(element);
                }
            }

            for (let i = 0; i < mostDate.length; i++) {
                $('.date').append(`
                <h6 class="information">${mostDate[i]}</h6>
                `);
            }

            for (let j = 0; j < mostLocation.length; j++) {
                $('.location').append(`
                <h6 class="information">${mostLocation[j]}</h6>
                `);
            }

        });
    }

});
