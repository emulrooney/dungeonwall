<script>
import Vue from 'vue';
import { bus } from "../main";
import axios from "axios";

export default {
	name: "PanelEditor",
	props: {
		panelData: Object,
	},
	data: function () {
		return {
			panelSizeSelect: [
				{ value: "small", text: "Small" },
				{ value: "medium", text: "Medium" },
				{ value: "large", text: "Large" },
			],
			panelTypeSelect: [
				{ value: "item", text: "Inventory Item" },
				{ value: "character", text: "Character Ability/Feature" },
				{ value: "lore", text: "Campaign Lore" },
				{ value: "story", text: "Story Note" },
				{ value: "misc", text: "Miscellaneous" },
				{ value: "neutral", text: "None" },
			],
			editTitleActive: false,
			awaitingSaveResponse: false,
		};
	},
	computed: {
		editorMode: function () {
			return this.panelData.id < 0 ? "Create" : "Edit";
		},
		renderedMarkdown: function () {
			if (this.panelData.body.length > 0) return this.panelData.body;

			return "Panel body can accept any valid markdown.";
		},
	},
	methods: {
		savePanel: function () {
			this.submitPanelUpdate(this.editorMode);
			bus.$emit("save-panel", this.panelData, this.editorMode);
		},
		submitPanelUpdate: async function (mode) {
			Vue.$toast.default("Please wait...");
			this.awaitingSaveResponse = true;

			let axiosMethod = (mode == "Create" ? "post" : "put");
			let toastMessage = (mode == "Create" ? " created." : " updated.")

			await axios({
				method: axiosMethod,
				url: "http://localhost:3000/wall/605e874fee94445c5d577bd1/" + (this.panelData.id >= 0 ? this.panelData.id : ""),
				responseType: "json",
				data: this.panelData
			}).then(() => {
				Vue.$toast.success("'" + this.panelData.title + "'" + toastMessage);
			}).catch((err) => {
				Vue.$toast.error("'" + this.panelData.title + "' couldn't be " + toastMessage);
				console.log(err);
			});

			this.$store.commit("forceComponentUpdate", ["wall"]);
			this.awaitingSaveResponse = false;
		},
	},
};
</script>

<template>
	<b-modal
		id="editorModal"
		size="xl"
		:title="panelData.title"
		content-class="enforced-height--max"
		modal-class="backdrop--opaque"
	>
		<template #modal-header>
			<div v-if="!editTitleActive">
				<h5 class="modal-title">
					{{ panelData.title }}
					{{ panelData.subtitle.length > 0 ? "-" : "" }}
					{{ panelData.subtitle }}
					{{
						panelData.bottomText.length > 0
							? "(" + panelData.bottomText + ")"
							: ""
					}}
				</h5>
			</div>
			<div v-else class="w-100 form-row">
				<div class="col">
					<b-form-input
						v-model="panelData.title"
						placeholder="Panel Title"
					></b-form-input>
				</div>
				<div class="col">
					<b-form-input
						v-model="panelData.subtitle"
						placeholder="Panel Subtitle"
					></b-form-input>
				</div>
				<div class="col">
					<b-form-input
						v-model="panelData.bottomText"
						placeholder="Bottom Text - ie. page number, book"
					></b-form-input>
				</div>
			</div>
			<b-button
				v-on:click="editTitleActive = !editTitleActive"
				:pressed="editTitleActive"
			>
				{{ editTitleActive ? "Save" : "Edit" }}
			</b-button>
		</template>

		<textarea
			class="w-50 enforced-height--80p"
			v-model="panelData.body"
		></textarea>
		<VueShowdown
			class="w-50 float-right pl-4"
			:markdown="renderedMarkdown"
		/>

		<div class="position-absolute left--0 right--0 bottom--0 m-3">
			<h4>Settings</h4>
			<div class="form-row">
				<div class="col">
					<label for="editorPanelWidth">Panel Width</label>
					<b-form-select
						name="editorPanelWidth"
						v-model="panelData.width"
						:options="panelSizeSelect"
					></b-form-select>
				</div>
				<div class="col">
					<label for="editorPanelHeight">Panel Height</label>
					<b-form-select
						v-model="panelData.height"
						:options="panelSizeSelect"
					></b-form-select>
				</div>
				<div class="col">
					<label for="editorPanelType">Type Label</label>
					<b-form-select
						v-model="panelData.type"
						:options="panelTypeSelect"
					></b-form-select>
				</div>
			</div>
		</div>
		<template #modal-footer="{ close }">
			<b-button @click="close()" size="lg"> Cancel </b-button>
			<b-button
				v-on:click="savePanel()"
				size="lg"
				variant="success"
				:pressed="awaitingSaveResponse"
				:disabled="awaitingSaveResponse"
			>
				Save
			</b-button>
		</template>
	</b-modal>
</template>