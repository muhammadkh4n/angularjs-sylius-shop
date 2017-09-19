(function(){
  'use strict';

  angular.module('aha')
    .component('imgCrop', {
      bindings: {
        image: '<',
        show: '='
      },
      templateUrl: 'templates/crop-modal.html',
      controller: ImgCropComponentController
    });

  ImgCropComponentController.$inject = ['Search'];
  function ImgCropComponentController(Search) {
    var $ctrl = this;
    $ctrl.close = close;

    activate();
    return;
    ///////////////////////////////////

    function activate() {
      $ctrl.image = '';
      $ctrl.cropped = '';
      $ctrl.blockingObject = {block:true};
      $ctrl.blockingObject.callback = cropImage;
      $ctrl.cropImage = cropImage;
    }

    function cropImage(){
      $ctrl.blockingObject.render(function(dataURL){
        console.log('via render');
        postImage(dataURL);
        $ctrl.show = false;
      });
    }

    function close(e) {
      $ctrl.show = false;
    }

    function postImage(data) {
      Search.searchByImage(data)
        .then(function(res){
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.data);
        });
    }
  }
})();
