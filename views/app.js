$(document).ready(function () {
    $('.voting').on('click', function () {
        window.location.href = './voting.html';
    });

    start();

    var name;
    var dates = [];
    var locations = [];
    var suggestions;
    var tshirt = "";

    $('.submit').on('click', function () {
        name = $('#name').val();

        tshirt = $('input[name="tshirt"]:checked').val();
        console.log(tshirt);

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
        $('#suggestions').val('');
        if (name === '') {
            alert('Please enter your name');
        } else {
            handleSuggestions();
        }
    });

    function handleSuggestions() {
        $.ajax({
            method: 'GET',
            url: `/votes/getName/${name}`
        }).then(result => {
            if (result.length < 1) {
                add();
                alert('please add your suggestion again');
            } else {
                addSuggestions(result);
            }
        });
    }

    function addSuggestions(resultTest) {
        //the suggestion and the vote. 
        let suggestion = resultTest.suggestions;
        if (suggestion.length < 1) {
            console.log('hit');
            $.ajax({
                method: 'POST',
                url: `/votes/suggestions/${resultTest.name}`,
                data: { suggestions: suggestions }
            }).then(res => {
                console.log('added suggestion');
                addCounter(resultTest);
            });
        } else {
            for (let i = 0; i < suggestion.length; i++) {
                if (suggestion[i] === suggestions) {
                    alert('You have already suggested this');
                } else if (suggestion[i] != suggestions && i === suggestion.length - 1) {
                    $.ajax({
                        method: 'POST',
                        url: `/votes/suggestions/${name}`,
                        data: { suggestions: suggestions }
                    }).then(res2 => {
                        console.log(res2);
                        addCounter(resultTest);
                    });
                }
            }
        }
    }

    function addCounter(user) {
        let voterId = user._id;
        let counter = 0;
        $.ajax({
            method: 'GET',
            url: '/counter/getSuggestions',
            data: { suggestion: suggestions }
        }).then(result => {
            if (!result) {
                $.ajax({
                    method: 'POST',
                    url: '/counter/create',
                    data: { suggestion: suggestions, voterId: voterId, counter: counter }
                }).then(res => {
                    console.log(res);
                });
            } else {
                console.log(result);
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
                        url: `/votes/getName/${name}`
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
        start();
    }

    function add() {
        $.ajax({
            method: 'POST',
            url: '/votes/name',
            data: {
                name: name,
                tshirt: tshirt
            }
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