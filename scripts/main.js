$(document).ready(function(){
    var arr = $('img');
    renderGifs(arr);

    $('#search').keyup(function() {
        var search = $(this).val();

        var found = false; 
        var chosen = [];
        var none = [];

        for(var i=0; i<arr.length; i++) {
            if(search == arr[i].name || (arr[i].name.indexOf(search) != -1) && search != '') {
                found = true;
                chosen.push(arr[i]);
            }
            else {
                $(arr[i]).css('display', 'none');
            }
            if(search !== arr[i].name) {
                function getRandomGif(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                }
                if(getRandomGif(1, arr.length) == arr[i].id) {
                    none.push(arr[i]);
                    alert(none.length);
                }
                for(var j=0; j<none.length; j++) {
                    $(none[j]).css('display', 'inline-block');
                    $('.wrap').append($('<li class="error">Sorry, not found</li>'));
                }
                // $('.error').remove();
                var none = [];
            }
        }

        if(!found) {
            for(var i=0; i<chosen.lehgth; i++){
                $(chosen[i]).css('display', 'inline-block');
            }
        }
    });

    function renderGifs(arr) {
        var pagination = new Pagination(arr, 20);
        pagination.init();

        $('.btn-link').click(function(){
            var pageNumber = $(this).text();
            $('.btn-link').removeClass('active');
            $(this).addClass('active');
            pagination.renderGif(pageNumber);
            // pagination.renderPagination();
        });
        $('.btn-link:first').addClass('active');

        function Pagination(arr, itemsPerPage) {
            this.arr = arr;
            this.itemsPerPage = itemsPerPage;
            this.init = function() {
                this.renderGif(1);
                this.renderPagination();
            },
            this.renderGif = function(page) {
                var endIndex = this.itemsPerPage * page;
                var currentIndex = endIndex - this.itemsPerPage;

                $('.wrap').empty();

                var myArr = this.arr;

                for(var i=currentIndex; i<endIndex; i++) {
                    var gif = myArr[i];
                    $('.wrap').append(gif);
                }
            },
            this.renderPagination = function() {
                var amountOfPages = Math.ceil(this.arr.length / this.itemsPerPage);
                $('.wrap').append('<div id="pagination" class="column six push-three reset"></div>');
                $('#pagination').append('<ul class="pagination"></ul>');
                $('.pagination').append('<button type="button" class="btn-left">' + '<<' + '</button>');

                for(var i=0; i<amountOfPages; i++) {
                    var pageButton = '<button type="button" class="btn btn-link">' + (i+1) + '</button>';
                    $('.pagination').append('<li>' + pageButton + '</li>');
                }

                $('.pagination').append('<button type="button" class="btn-right">' + '>>' + '</button>');
            }
        }
    }
});
