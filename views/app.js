$(document).ready(function () {
    $('.voting').on('click', function () {
        window.location.href = './voting.html';
    });

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
                console.log(people);
                if (people.includes(name)) {
                    $.ajax({
                        method: 'GET',
                        url: '/votes/getName',
                        data: { name: name }
                    }).then(res => {
                        let date = res[0].dates;
                        console.log(date);
                    });
                    //addDates();
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
    }

    function addDates() {
        for (let i = 0; i < dates.length; i++) {

            // $.ajax({
            //     method: 'POST',
            //     url: `/votes/dates/${name}`,
            //     data: { dates }
            // });
        }

    }

});
