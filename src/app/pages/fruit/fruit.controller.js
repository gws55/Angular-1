(function() {
    'use strict';

    angular.module('App.pages')
    	.controller('FruitController', FruitController);
    
    FruitController.$inject = ['fruitService', '$timeout'];

    function FruitController(fruitService, $timeout) {
    	var vm = this;
    	var self = this;

    	// private variables and fucntions
    	self.editingList = [];
    	self.toggleOffEdit = toggleOffEdit;

    	// public variables and functions
		vm.fruitList = [];
		vm.createFruit = createFruit;
		vm.deleteFruit = deleteFruit;
		vm.isEditing = isEditing;
		vm.setEditing = setEditing;
		vm.saveEdit = saveEdit;
		vm.cancelEdit = cancelEdit;

		// init
		loadingToggleOn();
		renderTable();

		///////////////////////////////////////////////////////

		function renderTable(goToLastPage) {
			var formatDates = function(fruit) {
				var formatted_create_date = fruit.create_date.split("-").join("/")
				fruit.create_date = new Date(formatted_create_date);

				var formatted_update_date = fruit.update_date.split("-").join("/")
				fruit.update_date = new Date(formatted_update_date);

				return fruit;
			};

			fruitService.getFruitList()
				.then(function(response) {
					// format dates first
					response.data.map(formatDates);

					vm.fruitList = response.data;
					$('#createModal').modal('hide');
					$('#editModal').modal('hide');

					if (goToLastPage != null) {
						$timeout(function(){
						 	// Any code in here will automatically have an $scope.apply() run afterwards
							$("#stPager-lastPage").click();	// go to last page in table
							// And it just works!
						});
					}

					loadingToggleOff();
				});
		}

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
						renderTable(true);
					} else {
						loadingToggleOff();
						alert(message);
					}
				});
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

		function isEditing(fruit) {
			var retVal;
			for (var i = 0; i < self.editingList.length; i++) {
				if (self.editingList[i].id == fruit.id) {
					return true;
				}
			}
			return false;
		}

		function setEditing(fruit) {
			var snapshot = {
				id: fruit.id,
				name: fruit.name
			};
			self.editingList.push(snapshot);
		}

		function saveEdit(fruit) {
			if (fruit.name == null || fruit.name == '') {
				alert("Name can't be empty!");
				return;
			}

			loadingToggleOn();

			fruitService.updateFruit(fruit)
				.then((function(response) {
					var success = response.meta.success;
					var message = response.meta.message;

					if (success == true) {
						renderTable();
						self.toggleOffEdit(fruit);
					} else {
						loadingToggleOff();
						alert(message);
					}
				}));
		}

		function toggleOffEdit(fruit) {
			self.editingList = self.editingList.filter(function(item) {
				return item.id != fruit.id;
			});
		}

		function cancelEdit(fruit) {
			for (var i = 0; i < self.editingList.length; i++) {
				if (self.editingList[i].id == fruit.id) {
					fruit.name = self.editingList[i].name;
				}
			}
			self.toggleOffEdit(fruit);
		}

    }

})();