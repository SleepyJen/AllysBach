$(document).ready(function () {
    $('.voting').on('click', function () {
        window.location.href = './voting.html';
    });

    start();

    var name;
    var dates = [];
    var locations = [];

    $('.submit').on('click', function () {
        name = $('#name').val();
        $.each($("input[name='dates']:checked"), function () {
            dates.push($(this).val());
        });

        $.each($("input[name='locations']:checked"), function () {
            locations.push($(this).val());
            console.log(locations);
        });

        if (name === '') {
            alert('Please enter your name');
            console.log(locations);
        } else {
            handleResults();
        }
    });

    function handleResults() {
        $.ajax({
            method: 'GET',
            url: '/votes'
        }).then(result => {
            let people = [];
            if (result.length === 0) {
                add();
                addDates();
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
        });
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
                    if (mapLocations[thisLocations[j]]) {
                        mapDates[thisDate[j]] = mapDates[thisLocations[j]] + 1;
                    } else {
                        mapLocations[[thisLocations[j]]] = 1;
                    }
                }
                console.log(mapDates);
                console.log(mapLocations);
            }
        });
    }

});
