app.controller('productsCtrl', function ($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('products').then(function(data){
        $scope.products = data.data;
    });
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the asset")){
            console.log(product.id);
            Data.delete("products/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                selectedObject.updated = null;
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.name = selectedObject.name;
                p.description = selectedObject.description;
                p.creation = selectedObject.creation;
                p.updated = selectedObject.updated;
            }
        });
    };
    
 $scope.columns = [
                    {text:"*",predicate:"-",sortable:true},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Date Creation",predicate:"creation",sortable:true},
                    {text:"Date Updated",predicate:"updated",sortable:true},
                ];

});


app.controller('productEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Asset' : 'Add Asset';
        $scope.buttonText = (item.id > 0) ? 'Update Asset' : 'Add New Asset';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            product.uid = $scope.uid;
            console.log(product.id);
            if(product.id > 0){
                Data.put('products/'+product.id, product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('products', product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});

