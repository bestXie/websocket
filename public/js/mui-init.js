(function ($, doc) {
    $.init();
    $.ready(function () {
        var genderPicker = new $.PopPicker();
        var birth_date_Picker = new $.DtPicker({
            type: "date",
            beginDate: new Date(1900, 1, 1),
            endDate: new Date()
        });
        var gender_result = doc.getElementById('gender_result');
        var birth_date_result = doc.getElementById('birth_date_result');
        var hometown_result = doc.getElementById('hometown_result');

        genderPicker.setData(['男', '女']);
        doc.getElementById('gender').addEventListener('tap', function () {
            genderPicker.show(function (items) {
                gender_result.innerText = items[0];
                doc.getElementById('sex').value = items[0];
                gender_result.style.color = '#000';
            });
        }, false);

        doc.getElementById('birth_date').addEventListener('tap', function () {
            birth_date_Picker.show(function (rs) {
                birth_date_result.innerText = rs.text;
                doc.getElementById('birthday').value = rs.text;
                birth_date_result.style.color = '#000';
            });
        }, false);

        var cityPicker = new $.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData2);
        doc.getElementById('hometownbox').addEventListener('tap', function () {
            cityPicker.show(function (rs) {
                var str = '';
                if (rs[0].text == rs[1].text) {
                    str = rs[1].text;
                } else {
                    str = rs[0].text + '/' + rs[1].text
                }
                hometown_result.innerText = str;
                doc.getElementById('hometown').value = str;
                hometown_result.style.color = '#000';
            });
        }, false);
    });

})(mui, document);