<script>
import Muuri from "muuri";
import Panel from "./Panel.vue";
import { bus } from "../main";

export default {
	name: "Wall",
	components: {
		Panel,
	},
	props: {
		wallData: Array,
		isEditMode: Boolean
	},
	data: () => {
		return {
			muuriObject: null,
			dirtyContent: {},
			wallUpdates: 0,
			currentSearchTerm: "",
			visiblePanels: [],
			visiblePanelTypes: [],
			enabledTypes: {
				item: true,
				class: true,
				story: true,
				misc: true,
				lore: true,
				neutral: true
			}
		};
	},
	computed: {
		currentOrder: function () {
			if (this.muuriObject) {
				//Get the current panel order (JUST THE IDs) and return as an array.
				//When we save, we'll re-order the panels on in the subdocument collection.
				let itemIds = this.muuriObject.getItems().map(function (item) {
					return item.getElement().getAttribute("data-id");
				});
				return itemIds;
			}
			return [];
		},
		wallClean: function() {
			//If there's anything in the dirtyContent obj we know we have stuff to save
			return Object.keys(this.dirtyContent).length === 0;
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.muuriObject = new Muuri(".js--muurify", {
				dragEnabled: this.isEditMode,
			});

			//Every time we move an object, update data so that currentOrder repopulates.
			let that = this;
			this.muuriObject.on('move', function () {
				that.dirtyContent.currentOrder = that.currentOrder;
			});

			//Likewise with 'send' - once we have 1+ buckets for Muuri
			// this.muuriObject.on('send', function () {
			// 	this.wallClean = false;
			// });
		});
	},
	created: function() {
		let that = this;
		
		bus.$on("save-wall-success", function() {
			that.resetDirtyContent(); 
		});
		
		bus.$on("search-wall", function(term) {
			that.currentSearchTerm = term;
			that.updateFilters();
		});

		bus.$on("update-filters", function(enabledTypes) {
			that.enabledTypes = enabledTypes
			that.updateFilters();
		});
	},
	methods: {
		resetDirtyContent: function() {
			this.dirtyContent = {};
		},
		saveWallChanges: function() {
			//Emit the content we need to save
			//Exepcting to receive 'save-wall-success' on finish
			bus.$emit("save-wall", this.dirtyContent);
		},
		updateFilters: function() {
			let that = this;
			this.visiblePanels = this.wallData.filter((panel) => {
				//TODO Search on more than just title? Config for this???
				return (that.enabledTypes[panel.type] //If match, not filtered out.
					&&  panel.title.toLowerCase().includes(that.currentSearchTerm.toLowerCase())); //Contains search term
			});
			this.muuriObject.filter(function(item) {
				let itemId = item.getElement().getAttribute("data-id");
				let panel = that.wallData[itemId];
				return that.visiblePanels.includes(panel);
			});
		},
		recalculate: function () {
			this.wallUpdates++;
		}
	},
};
</script> 

<template>
	<div class="wall js--muurify">
		<Panel v-for="panel in wallData"
			:key="panel.title"
			:width="panel.panelWidth"
			:height="panel.panelHeight"
			:panelData="panel"
			:panelId="panel.id"
		/>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
