<script>
import Vue from 'vue'
import Wall from "./components/Wall.vue";
import OuterUI from './components/OuterUI.vue'
import PanelEditor from "./components/PanelEditor.vue";
import PanelViewer from "./components/PanelViewer.vue";

//Vue Toast Notifications
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

import axios from "axios";

export default {
	name: "App",
	components: {
		OuterUI,
		Wall,
		PanelViewer,
		PanelEditor,
	},
	mounted: async function () {
		await this.loadWall(0);

		this._keyListener = function(e) {
			//todo If PanelViewer/PanelEditor are open, return early. 
			
			//NOTE - We'll pass the whole event so we can do e.preventDefault at the source (if we need it)
            if (["\\", "!", "@", "#", "$", "%", "^"].includes(e.key)) {
				this.$root.$emit("ui-keyboard", e);
            }
        };

        document.addEventListener('keydown', this._keyListener.bind(this));

	},
	data: function () {
		return {
			activePanel: {
				id: -1,
				title: "New Panel",
				subtitle: "",
				body: "Loading...",
				bottomText: "",
				height: "medium",
				width: "medium",
				type: "neutral",
			},
			maxPanels: 25,
			dirtyContent: {}
		};
	},
	computed: {
		wallTitle: function () { return this.$store.state.wallTitle }, //alias
		panels: function () { return this.$store.state.panels }, //alias
		panelOrder: function () { return this.$store.state.panelOrder }, //alias
		uiUpdates: function() { return this.$store.state.elementUpdates["ui"] }, //alias
		wallUpdates: function() { return this.$store.state.elementUpdates["wall"] }, //alias
		wallStyle: function() {
			return {
				backgroundColor: this.$store.state.wallColor
			};
		},
		currentIdList: function () { return this.$store.state.panels.map((panel) => panel.id); },
	},
	methods: {
		loadWall: async function (wallIndex, showToast) {
			let wallData = await axios.get("http://localhost:3000/wall/605e874fee94445c5d577bd1")
				.then(function (result) {
					//TODO: Eventually this will be figured out on the backend instead
					// let id = 0;
					// result.data.panels.forEach((panel) => {
					// 	panel.id = id;
					// 	id++;
					// });

					if (showToast)
						Vue.$toast.success("Wall loaded.");
					return result.data;
				})
				.catch(function () {
					Vue.$toast.error("Couldn't connect to server.");
					return { data: [] };
				});

			this.$store.commit("updateActiveWall", wallData);
		},
		newPanel: function () {
			this.$root.$emit("add-panel", []);
		},
		resetActivePanel: function () {
			this.activePanel = {
				id: -1,
				title: "New Panel",
				subtitle: "",
				body: "",
				bottomText: "",
			};
		},
		updatePanel: function (panelData) {
			let updated = this.panels.find((panel) => panel.id == panelData.id);
			if (updated != null) {
				this.panels[panelData.id] = panelData;
			} else {
				Vue.$toast.error("Couldn't update panel.");
			}
		},
		addPanel: function (panelData) {
			//TODO Validate.
			for (let i = 0; i < this.maxPanels; i++) {
				if (!this.currentIdList.includes(i)) {
					panelData.id = i;

					this.panels.push(panelData);
					return;
				}
			}
			
			Vue.$toast.error("Too many panels. Delete some and try again.");
		},
		deletePanel: async function() {
			if (this.activePanel.id == undefined) {
				Vue.$toast.error("Missing panel ID!");
				return;
			}

			const vm = this;
			await axios.delete("http://localhost:3000/wall/605e874fee94445c5d577bd1/" + this.activePanel.id)
			.then(function (result) {
				Vue.$toast.success(result.data);
				//Close modals
				vm.$bvModal.hide("panelModal");
				vm.$bvModal.hide("deletePanelModal");
				vm.$store.commit("deletePanel", vm.activePanel.id);
			});
		},
		getPanelById: function(panelId) {
			for (let i = 0; i < this.panels.length; i++) {
				if (this.panels[i].id == panelId)
					return i;
			}
		}
	},
	created: function () {
		const vm = this;
		this.$root.$on("panel-opened", (panelId) => {
			vm.$bvModal.hide("editorModal");
			vm.$bvModal.show("panelModal");
			this.activePanel = this.panels[this.getPanelById(panelId)];
		});

		this.$root.$on("add-panel", () => {
			this.resetActivePanel();
			vm.$bvModal.hide("panelModal");
			vm.$bvModal.show("editorModal");
		});

		this.$root.$on("edit-panel", () => {
			vm.$bvModal.hide("panelModal");
			vm.$bvModal.show("editorModal");
		});

		this.$root.$on("delete-panel", () => {
			vm.$bvModal.show("deletePanelModal");
		});

		this.$root.$on("save-panel", (panelData, editorMode) => {
			if (editorMode == "Create") {
				this.addPanel(panelData);
			} else if (editorMode == "Edit") {
				this.updatePanel(panelData);
			}
			//TODO Error handling - show a msg, but don't close the modal.
			vm.$bvModal.hide("editorModal");
		});

		this.$root.$on("create-panel", (panelData) => {
			this.newPanel(panelData);
		});
	}
};
</script>

<template>
	<div id="app">
		<OuterUI :wallTitle="this.wallTitle" :key="uiUpdates" />
		<Wall
			v-if="this.panels != undefined && this.panels.length > 0"
			:wallData="this.panels"
			:isEditMode="true"
			:style="this.wallStyle"
			:key="wallUpdates"
		/>
		<div v-else>
			<p>Loading...</p>
		</div>

		<PanelViewer :panelData="activePanel" />
		<PanelEditor :panelData="activePanel" />
		<b-modal id="deletePanelModal" size="m" :title='"Delete \"" + this.activePanel.title + "\""'>
			Are you sure you want to delete this panel?
			<template #modal-footer="{ close }">
				<b-button @click="close()" size="lg">Cancel</b-button>
				<b-button v-on:click="deletePanel()" size="lg" variant="warning">Delete</b-button>
			</template>
		</b-modal>
	</div>
</template>