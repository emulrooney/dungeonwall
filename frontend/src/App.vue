<script>
import { bus } from "./main";
import Wall from "./components/Wall.vue";
import OuterUI from './components/OuterUI.vue'
import PanelEditor from "./components/PanelEditor.vue";
import PanelViewer from "./components/PanelViewer.vue";

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
		uiUpdates: function() { return this.$store.state.elementUpdates["ui"] }, //alias
		wallUpdates: function() { return this.$store.state.elementUpdates["wall"] }, //alias
		currentIdList: function () { return this.$store.state.panels.map((panel) => panel.id); },
	},
	methods: {
		loadWall: async function (wallIndex) {
			console.log("Loading wall #" + wallIndex);
			let wallData = await axios.get("http://localhost:3000/wall/605e874fee94445c5d577bd1")
				.then(function (result) {
					//TODO: Eventually this will be figured out on the backend instead
					let id = 0;

					console.log(result);

					result.data.panels.forEach((panel) => {
						panel.id = id;
						id++;
					});
					
					return result.data;
				})
				.catch(function (error) {
					console.log(error);
					return { data: [] };
				});

			this.$store.commit("updateActiveWall", wallData);
		},
		newPanel: function () {
			bus.$emit("add-panel", []);
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
				console.log("Couldn't update panel. :( ");
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
			console.log("Couldn't add panel... too many on the wall.");
		}
	},
	created: function () {
		const vm = this;
		bus.$on("panel-opened", (panelId) => {
			vm.$bvModal.hide("editorModal");
			vm.$bvModal.show("panelModal");
			this.activePanel = this.panels[panelId];
		});

		bus.$on("add-panel", () => {
			this.resetActivePanel();
			vm.$bvModal.hide("panelModal");
			vm.$bvModal.show("editorModal");
		});

		bus.$on("edit-panel", () => {
			vm.$bvModal.hide("panelModal");
			vm.$bvModal.show("editorModal");
		});

		bus.$on("save-panel", (panelData, editorMode) => {
			if (editorMode == "Create") {
				this.addPanel(panelData);
			} else if (editorMode == "Edit") {
				this.updatePanel(panelData);
			}
			//TODO Error handling - show a msg, but don't close the modal.
			vm.$bvModal.hide("editorModal");
		});

		bus.$on("create-panel", (panelData) => {
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
			:key="wallUpdates"
		/>
		<div v-else>
			<p>Loading...</p>
		</div>

		<PanelViewer :panelData="activePanel" />
		<PanelEditor :panelData="activePanel" />
	</div>
</template>