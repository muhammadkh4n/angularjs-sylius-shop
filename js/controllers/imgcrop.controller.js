(function(){
  'use strict';

  angular.module('aha')
    .controller('ImageCropController', ImageCropController);

  ImageCropController.$inject = ['$scope'];
  function ImageCropController($scope) {
    var ctrl = this;
    ctrl.cropImage = cropImage;

    activate();
    return;
    ///////////////////////////////

    function activate() {
      $scope.imageToCrop = '';
      $scope.croppedImage = '';
      $scope.blockingObject = {block:true};
      $scope.blockingObject.callback = callback;
      $scope.callTestFunction = callTestFunction;
    }

    function cropImage(image) {
      $scope.imageToCrop = image;
    }

    function callTestFunction(){
      $scope.blockingObject.render(function(dataURL){
        console.log('via render');
        console.log(dataURL.length);
      });
    }
    
    function callback(dataURL){
      console.log('via function');
      console.log(dataURL.length);
    }
    
    function handleFileSelect(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.imageToCrop = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
  }
})();
