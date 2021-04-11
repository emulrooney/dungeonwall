<script>
import { bus } from "./main";
import Wall from "./components/Wall.vue";
// import TopUI from './components/TopUI.vue'
import PanelEditor from "./components/PanelEditor.vue";
import PanelViewer from "./components/PanelViewer.vue";

import axios from "axios";

export default {
	name: "App",
	components: {
		// TopUI,
		Wall,
		PanelViewer,
		PanelEditor,
	},
	mounted: async function () {
		let loaded = await this.loadWall(0);
		this.wallTitle = loaded.title;
		this.panels = loaded.panels;
	},
	data: function () {
		return {
			wallUpdates: 0,
			panels: {},
			wallTitle: "",
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
		};
	},
	computed: {
		currentIdList: function () {
			return this.panels.map((panel) => panel.id);
		},
	},
	methods: {
		loadWall: function (wallIndex) {
			console.log("Loading wall #" + wallIndex);
			let wallData = axios.get("http://localhost:3000/debug")
				.then(function (result) {
					//TODO: Eventually this will be figured out on the backend instead
					let id = 0;
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

			return wallData;
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
					this.rerenderWall();
					return;
				}
			}

			console.log("Couldn't add panel... too many on the wall.");
		},
		rerenderWall: function () {
			this.wallUpdates++;
		},
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
			this.rerenderWall();
		});

		bus.$on("create-panel", (panelData) => {
			this.newPanel(panelData);
		});

		bus.$on("save-wall", (savedWallContent) => {
			console.log("Dirty Content");
			console.log(savedWallContent);
			axios.post("http://localhost:3000/wall/0", savedWallContent)
				.then(function (result) {
					console.log(result);
					bus.$emit("save-wall-success", []);
				}).catch(function (err) {
					console.log(err);
				});
			
		});
	}
};
</script>

<template>
	<div id="app">
		<!-- <TopUI /> -->
		<Wall
			v-if="this.panels != undefined && this.panels.length > 0"
			:wallData="this.panels"
			:wallTitle="this.wallTitle"
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