<script>
import Muuri from "muuri";
import Panel from "./Panel.vue";

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
		dirtyContent: function() { return this.$store.state.dirtyContent },
		panelOrder: function () {
			if (this.muuriObject) {
				//Get the current panel order (JUST THE IDs) and return as an array.
				//When we save, we'll re-order the panels on in the subdocument collection.
				let itemIds = this.muuriObject.getItems().map(function (item) {
					return item.getElement().getAttribute("data-id");
				});
				return itemIds;
			}
			return [];
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.muuriObject = new Muuri(".js--muurify", {
				dragEnabled: this.isEditMode,
			});

			//Every time we move an object, update data so that panelOrder repopulates.
			let that = this;
			this.muuriObject.on('move', function () {
				that.$store.commit("updateDirtyContent", {"panelOrder": that.panelOrder});
				that.muuriObject.synchronize();
			});
		});
	},
	created: function() {
		let that = this;		
		this.$root.$on("search-wall", function(term) {
			that.currentSearchTerm = term;
			that.updateFilters();
		});

		this.$root.$on("update-filters", function(enabledTypes) {
			that.enabledTypes = enabledTypes
			that.updateFilters();
		});
	},
	methods: {
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
		}
	},
};
</script> 

<template>
	<div class="wall js--muurify">
		<Panel v-for="panel in wallData"
			:key="panel.id"
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
