var AVERAGE_PERCENTS = {
	css: 3.25,
	html: 2.5,
	js: 16.5,
	images: 63,
	video: 9.75,
	fonts: 5 
};

var CONNECTION_SPEEDS = {
	mobile2gSlow: 4.375,
	dialup: 7,
	mobile2g: 18.75,
	mobileEdge: 30, 
	mobile3gSlow: 97.5, 
	dsl: 187.5,
	mobile3gFast: 200,
	cable: 625, 
	fios: 2500
};

var app = angular.module('app', ['rzModule']);

app.controller('BudgetCtrl', function($scope, $rootScope, $timeout){
	$scope.loadtime = "";
	$scope.budget = 100;
	$scope.connection = "";
	$scope.error = "";
	$scope.step = 1;
	$scope.cssSlider = 0;
	$scope.htmlSlider = 0;
	$scope.jsSlider = 0;
	$scope.imagesSlider = 0;
	$scope.videoSlider = 0;
	$scope.fontsSlider = 0;

	$scope.mobile2gSlow = 0;
	$scope.dialup = 0;
	$scope.mobile2g = 0;
	$scope.mobileEdge = 0;
	$scope.mobile3gSlow = 0;
	$scope.dsl = 0;
	$scope.mobile3gFast = 0;
	$scope.cable = 0;
	$scope.fios = 0;

	$scope.calculate = function() {
		var connectionSpeed = parseFloat($scope.connection);
		var loadTime = parseFloat($scope.loadtime);

		if(isNaN(connectionSpeed) || isNaN(loadTime)) {
			$scope.error = 'Please enter both the number of second and select a connection type';
		}
		else {
			$scope.budget = loadTime * connectionSpeed;
			$scope.total = $scope.budget;
			setDefaults($scope.budget);
			$scope.step = 2;

			$timeout(function(){
				$rootScope.$broadcast('rzSliderForceRender');
			}, 10)			
		}
	};

	$scope.finish = function() {
		calculateEstimates($scope.budget);
		$scope.step = 3;
	};

	$scope.$watch('cssSlider', updateTotal);
	$scope.$watch('htmlSlider', updateTotal);
	$scope.$watch('jsSlider', updateTotal);
	$scope.$watch('videoSlider', updateTotal);
	$scope.$watch('fontsSlider', updateTotal);
	$scope.$watch('imagesSlider', updateTotal);

	function updateTotal(newValue, oldValue) {
		$scope.total = $scope.cssSlider + $scope.htmlSlider + $scope.jsSlider + $scope.videoSlider + $scope.fontsSlider + $scope.imagesSlider;
	}

	function setDefaults (budget) {
		$scope.cssSlider = Math.round((budget * AVERAGE_PERCENTS.css) / 100);
		$scope.htmlSlider = Math.round((budget * AVERAGE_PERCENTS.html) / 100);
		$scope.jsSlider = Math.round((budget * AVERAGE_PERCENTS.js) / 100); 
		$scope.videoSlider = Math.round((budget * AVERAGE_PERCENTS.video) / 100);
		$scope.fontsSlider = Math.round((budget * AVERAGE_PERCENTS.fonts) / 100);
		$scope.imagesSlider = budget - $scope.cssSlider - $scope.htmlSlider - $scope.jsSlider - $scope.videoSlider - $scope.fontsSlider;
	}

	function calculateEstimates(budget) {
		$scope.mobile2gSlow = round2dp(budget / CONNECTION_SPEEDS.mobile2gSlow);
		$scope.dialup = round2dp(budget / CONNECTION_SPEEDS.dialup);
		$scope.mobile2g = round2dp(budget / CONNECTION_SPEEDS.mobile2g);
		$scope.mobileEdge = round2dp(budget / CONNECTION_SPEEDS.mobileEdge);
		$scope.mobile3gSlow = round2dp(budget / CONNECTION_SPEEDS.mobile3gSlow);
		$scope.dsl = round2dp(budget / CONNECTION_SPEEDS.dsl);
		$scope.mobile3gFast = round2dp(budget / CONNECTION_SPEEDS.mobile3gFast);
		$scope.cable = round2dp(budget / CONNECTION_SPEEDS.cable);
		$scope.fios = round2dp(budget / CONNECTION_SPEEDS.fios);
	}

	function round2dp(number) {
		return Math.round(number * 100) / 100;
	}
});

app.directive('numberMask', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.on('keydown', function(e){
            	var code = (e.which) ? e.which : e.keyCode;
			    var value = this.value;

			    if (code > 31 && (code < 48 || code > 57) && (code !== 190 || value.match(/\./g))) {
			    	e.preventDefault();
			    }

            });
        }
    }
});