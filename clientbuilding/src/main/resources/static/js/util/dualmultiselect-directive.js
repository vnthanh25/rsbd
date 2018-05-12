app
.directive("dualmultiselect", [function () {
    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        controller: function ($scope) {
            $scope.transferList = clientmain.transferList;
        },
        template: '<div class="dualmultiselect"> <div class="row"> <div class="col-lg-12 col-md-12 col-sm-12"> <h4>{{options.title}}<small>&nbsp;{{options.helpMessage}}</small> </h4> <input class="form-control" placeholder="{{options.filterPlaceHolder}}" ng-model="searchTerm"> </div></div><div class="row"> <div class="col-lg-6 col-md-6 col-sm-6"> <label>{{options.labelAll}}</label> <button type="button" class="btn btn-default btn-xs" ng-click="transferList(options.items, options.selectedItems, -1)">{{options.labelSelectAll}}</button> <div class="pool"> <ul> <li ng-repeat="item in options.items | filter: searchTerm | orderBy: options.orderProperty"> <a href="" ng-click="transferList(options.items, options.selectedItems, options.items.indexOf(item))">{{item[options.displayProperty]}}&nbsp;&rArr; </a> </li></ul> </div></div><div class="col-lg-6 col-md-6 col-sm-6"> <label>{{options.labelSelected}}</label> <button type="button" class="btn btn-default btn-xs" ng-click="transferList(options.selectedItems, options.items, -1)">{{options.labelDeselectAll}}</button> <div class="pool"> <ul> <li ng-repeat="item in options.selectedItems | orderBy: options.orderProperty"> <a href="" ng-click="transferList(options.selectedItems, options.items, options.selectedItems.indexOf(item))"> &lArr;&nbsp;{{item[options.displayProperty]}}</a> </li></ul> </div></div></div></div>'
    };
}]);
