angular.module('app', [ 'ui.bootstrap', 'app.controllers', 'app.directives', 'app.services', 'app.filters','ngDialog']);
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('app.filters', []);

angular.module('app').controller('MainController', function( $rootScope, $scope, $modal, $compile ) {

/*$scope.eventobj = [
        {
          id: 1,
          title: 'All Day Event',
          start: '2014-06-01',
          end: '2014-06-02'
        },
        {
          id: 2,
          title: 'Long Event',
          start: '2014-06-07',
          end: '2014-06-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2014-06-09T16:00:00',
          end: '2014-06-10T16:00:00'
        },
        {
          id: 99,
          title: 'Repeating Event',
          start: '2014-06-16T16:00:00',
          end: '2014-06-17T16:00:00'
        },
        {
        	id: 3,
          title: 'Meeting',
          start: '2014-06-12T10:30:00',
          end: '2014-06-13T12:30:00'
        },
        {
        	id: 4,
          title: 'Lunch',
          start: '2014-06-12T12:00:00',
          end: '2014-06-13T12:00:00'
        },
        {
        	id: 5,
          title: 'Birthday Party',
          start: '2014-06-13T07:00:00',
          end: '2014-06-14T07:00:00'

        }
      ];*/

      $scope.cat1 = [
        {
          id: 165,
          title: 'Cat1 aa',
          start: '2014-06-01',
          end: '2014-06-02',
          color  : '#f12',
          category: 'cat1'
        },
        {
        	id: 67,
          title: 'Cat1 bb',
          start: '2014-06-01',
          end: '2014-06-02',
          color  : '#f12',
          category: 'cat1'
          
        }
      ];



      $scope.cat2 = [
        {
          id: 11,
          title: 'Cat2 ave',
          start: '2014-06-06',
          end: '2014-06-07',
          color  : '#339966',
          category: 'cat2'
        },
        {
        	id: 14,
          title: 'Cat2 addve',
          start: '2014-06-08T12:00:00',
          end: '2014-06-09T12:00:00',
          color  : '#339966',
          category: 'cat2'
        },
        {
        	id: 51,
          title: 'Cat2 rr',
          start: '2014-06-10T07:00:00',
          end: '2014-06-11T07:00:00',
          color  : '#339966',
          category: 'cat2'

        }
      ];

      $scope.cat3 = [
        {
          id: 113,
          title: 'Cat3 wefw',
          start: '2014-06-12',
          end: '2014-06-13',
          color  : '#663311',
          category: 'cat3'
        },
        {
        	id: 143,
          title: 'Cat3 sdvf',
          start: '2014-06-12T12:00:00',
          end: '2014-06-13T12:00:00',
          color  : '#663311',
          category: 'cat3'
        },
        {
        	id: 513,
          title: 'Cat3 fdbdf',
          start: '2014-06-12T07:00:00',
          end: '2014-06-13T07:00:00',
          color  : '#663311',
          category: 'cat3'

        }
      ];



  $scope.eventobj = [$scope.cat1,$scope.cat2,$scope.cat3];

var getdatafromDB;

    $scope.savedata = function(data){
    	console.log('main ctrl savedata func');
    	getdatafromDB=data;
    	console.log(data);
    }  

    $scope.cleardata = function(){
    	$scope.eventobj=[];
    	$compile($('fullcalendar'))($scope);
    	
    	//$compile('drag-category')($scope);
    }


    $scope.getdata = function(){
		$scope.eventobj=getdatafromDB;
		$compile($('fullcalendar'))($scope);
    }

});