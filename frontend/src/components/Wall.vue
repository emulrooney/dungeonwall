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
		wallTitle: String,
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
				skill: true,
				misc: true,
				race: true,
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
	},
	methods: {
		addPanel: function () {
			bus.$emit("add-panel", []);
		},
		resetDirtyContent: function() {
			this.dirtyContent = {};
		},
		saveWallChanges: function() {
			//Emit the content we need to save
			//Exepcting to receive 'save-wall-success' on finish
			bus.$emit("save-wall", this.dirtyContent);
		},
		toggleType: function(panelType) {
			this.enabledTypes[panelType] = !this.enabledTypes[panelType];

			this.updateFilters();
		},
		updateFilters: function() {
			let that = this;
			this.visiblePanels = this.wallData.filter((panel) => {
				//TODO Search on more than just title? Config for this???
				return (that.enabledTypes[panel.type] //If match, not filtered out.
					&&  panel.title.toLowerCase().includes(that.currentSearchTerm.toLowerCase())); //Contains search term
			});
			this.muuriObject.filter(function(item) {
				// if (enabledPanels.length === 0)
				// 	return true;

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
	<div>
		<h1 class="text-center">
			{{ wallTitle }}
			<button class="btn btn-light mb-2 ml-5" v-on:click="addPanel()">
				Add Panel
			</button>
			<button class="btn btn-secondary mb-2 ml-3" :disabled="!wallClean" v-on:click="saveWallChanges()">
				Save Changes
			</button>
		</h1>
		<div class="wall__controls form-inline">
			<b-button :pressed="!enabledTypes['item']" pill class="filter--item mr-2" v-on:click="toggleType('item')">{{enabledTypes['item'] ? 'Hide' : 'Show'}} Item</b-button>
			<b-button :pressed="!enabledTypes['class']" pill class="filter--class mr-2" v-on:click="toggleType('class')">{{enabledTypes['class'] ? 'Hide' : 'Show'}} Class</b-button>
			<b-button :pressed="!enabledTypes['race']" pill class="filter--race color--text--black mr-2" v-on:click="toggleType('race')">{{enabledTypes['race'] ? 'Hide' : 'Show'}} Race</b-button>
			<b-button :pressed="!enabledTypes['skill']" pill class="filter--skill mr-2" v-on:click="toggleType('skill')">{{enabledTypes['skill'] ? 'Hide' : 'Show'}} Skill</b-button>
			<b-button :pressed="!enabledTypes['misc']" pill class="filter--misc mr-2" v-on:click="toggleType('misc')">{{enabledTypes['misc'] ? 'Hide' : 'Show'}} Misc</b-button>
			<b-button :pressed="!enabledTypes['neutral']" pill class="filter--neutral mr-2" v-on:click="toggleType('neutral')">{{enabledTypes['neutral'] ? 'Hide' : 'Show'}} Unlabelled</b-button>
		</div>
		<div class="wall js--muurify">
			<Panel v-for="panel in wallData"
				:key="panel.title"
				:width="panel.panelWidth"
				:height="panel.panelHeight"
				:panelData="panel"
				:panelId="panel.id"
			/>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
