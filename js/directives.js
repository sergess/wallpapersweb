'use strict';
wallpapersApp.directive('gallery', function () {
    return {
        link: function (scope, element, attrs) {
            //console.log('test');
            var index = 0;
            scope.setImg = function (imgt) {
                index = scope.imageUrl.indexOf(imgt);
                var dom = $(
                    '<div class="angular-lightbox-overlay" style="display: none">' +
                    '<span class="angular-lightbox-inner">' +
                    '<a href class="previous" title="Previous">&laquo;</a>' +
                    '<img class="img" alt="" />' +
                    '<a href class="next" title="Next">&raquo;</a>' +
                    '<a href class="close" title="Close">x</a>' +
                    '</span>' +
                    '</div>'
                );
                scope.dom = dom;
                dom.appendTo(document.body);
                scope.dom.show();
                var dom = angular.element(document.querySelector(".angular-lightbox-overlay"));
                var elem = angular.element(document.querySelector(".img"));
                elem.attr("src", imgt);

                dom.on('click', 'a.close', function() {
                    scope.dom.remove();
                    return false;
                });
                dom.on('click', 'a.previous', function() {
                    scope.prevSlide();
                    return false;
                });
                dom.on('click', 'a.next', function() {
                    scope.nextSlide();
                    return false;
                });
                scope.nextSlide = function (){
                    index++;
                    scope.newImg = scope.imageUrl[index == scope.images.length ? index=scope.images.length-1 : index];
                    elem.attr("src", scope.newImg);
                };
                scope.prevSlide = function (){
                    index--;
                    scope.newImg = scope.imageUrl[index==-1 ? index=0 : index];
                    elem.attr("src", scope.newImg);
                };
            };

            $(document).keydown(function(e) {
                switch (e.which) {
                    case 37:
                        scope.prevSlide();
                        break;
                    case 39:
                        scope.nextSlide();
                        break;
                    case 27:
                        scope.dom.remove();
                        break;
                }
            });
        }
    };
});
wallpapersApp.directive('paginations', function () {
    return {
        link: function (scope, element, attrs) {
            scope.currentPage = 0;
            scope.pageSize = 8;
            scope.numberOfPages=function(){
                if (!scope.images) { return; }
                return Math.ceil(scope.images.length/scope.pageSize);
            }
        },
        restrict:'A',
        template:'<button ng-disabled="currentPage == 0" ng-click="currentPage=currentPage-1">'+
            'Previous' +
        '</button>' +
        '{{currentPage+1}}/{{numberOfPages()}}' +
    '<button ng-disabled="currentPage >= images.length/pageSize - 1" ng-click="currentPage=currentPage+1">' +
        'Next' +
        '</button>',
        transclude: true
    };
});