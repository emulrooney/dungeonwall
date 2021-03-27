<script>
import Muuri from "muuri";
// eslint-disable-next-line no-unused-vars
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
			initialOrder: [], //Distinct from current - set on mount.
			wallUpdates: 0
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
	},
	mounted: function () {
		this.$nextTick(function () {
			let that = this;
			this.muuriObject = new Muuri(".js--muurify", {
				dragEnabled: this.isEditMode,
			});

			//Every time we move an object, update data so that currentOrder repopulates.
			this.muuriObject.on('move', function () {
				that.recalculate();
			});

			//Likewise with 'send' - once we have 1+ buckets for Muuri
			// this.muuriObject.on('send', function () {
			// 	that.recalculate();
			// });
			
			this.initialOrder = this.muuriObject.getItems().map(function (item) {
				return item.getElement().getAttribute("data-id");
			});
		});
	},
	methods: {
		addPanel: function () {
			bus.$emit("add-panel", []);
		},
		recalculate: function () {
			this.wallUpdates++;
		},
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
		</h1>
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
