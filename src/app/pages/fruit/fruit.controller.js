(function() {
    'use strict';

    angular.module('App.pages')
    	.controller('FruitController', FruitController);
    
    FruitController.$inject = ['fruitService'];

    function FruitController(fruitService) {
    	var vm = this;

    	// local variables
		vm.fruitList = [];
		vm.updateFruit = {};

		// functions
		vm.createFruit = createFruit;
		vm.editFruit = editFruit;
		vm.deleteFruit = deleteFruit;
		vm.toggleEdit = toggleEdit;
		vm.toggleDelete = toggleDelete;

		// init
		loadingToggleOn();
		renderTable();

		///////////////////////////////////////////////////////

		function createFruit(newFruit) {
			if (newFruit == null) {
				alert("can't be null");
				return;
			}

			loadingToggleOn();
			fruitService.createFruit(newFruit)
				.then(function(response) {
					var success = response.meta.success;
					var message = response.meta.message;

					if (success) {
						renderTable();
					} else {
						loadingToggleOff();
						alert(message);
					}
				});
		}

		function editFruit(updateFruit) {
			if (updateFruit == null) {
				alert("can't be null");
				return;
			}

			loadingToggleOn();
			fruitService.updateFruit(updateFruit)
				.then((function(response) {
					var success = response.meta.success;
					var message = response.meta.message;

					if (success == true) {
						renderTable();
					} else {
						loadingToggleOff();
						alert(message);
					}
				}));
		}

		function deleteFruit(deleteFruit) {
			if (deleteFruit == null) {
				alert("can't be null");
				return;
			}

			loadingToggleOn();
			fruitService.deleteFruit(deleteFruit)
				.then(function(response) {
					var success = response.meta.success;
					var message = response.meta.message;

					if (success == true) {
						renderTable();
					} else {
						loadingToggleOff();
						alert(message);
					}
				});
		}

		function toggleEdit(fruit) {
			if (fruit != null) {
				vm.updateFruit = {
					"id": fruit.id, 
					"name": fruit.name
				};
			}
		}

		function toggleDelete(fruit) {
			if (fruit != null) {
				vm.deleteFruit = {
					"id": fruit.id, 
					"name": fruit.name
				};
			}
		}

		function renderTable() {
			fruitService.getFruitList()
				.then(function(response) {
					vm.fruitList = response.data;
					$('#createModal').modal('hide');
					$('#editModal').modal('hide');
					loadingToggleOff();
				});
		}

		function hi() {
			console.log('Andrew was here');
		}
    }

})();