<script>

export default {
	name: "Panel",
	props: {
		panelId: Number,
		panelData: Object,
	},
	data: function () {
		return {
			body: "",
			title: "",
			subtitle: "",
			bottomText: "",
			currentUses: 0,
			maxUses: 0,
			type: "",
			useResourceCost: 0,
			useResourceFrequency: "",
			useResourceName: "",
		};
	},
	computed: {
		hasUses: function () {
			return this.maxUses > 0;
		},
		resourceUse: function () {
			var resourceName =
				this.useResourceFrequency.length > 0 ? this.useResourceFrequency : this.useResourceName;
			return this.currentUses + " / " + this.maxUses + (resourceName ? " " + this.resourceName : "");
		},
		classes: function () {
			let classes = [];
			if (this.panelData.width) {
				classes.push("width--" + this.panelData.width);
			}

			if (this.panelData.height) {
				classes.push("height--" + this.panelData.height);
			}

			if (this.panelData.height == "small" || this.panelData.width == "small") {
				classes.push("panel__text--small");
			}

			if (this.panelData.type) {
				classes.push("color--border--" + this.panelData.type);
			} else {
				classes.push("color--border--white");
			}

			return classes.join(" ");
		},
		panelTypeClasses: function () {
			if (this.panelData.type) {
				return "panel__type color--bg--" + this.panelData.type;
			} else {
				return "";
			}
		},
		panelUseClasses: function () {
			if (this.panelData.type) {
				return "panel__uses border--small color--border--" + this.panelData.type;
			} else {
				return "panel__uses border--small color--border--white";
			}
		},
	},
	mounted: function () {
		this.body = this.panelData.body;
		this.title = this.panelData.title;
		this.subtitle = this.panelData.subtitle;
		this.bottomText = this.panelData.bottomText;

		if (this.panelData.currentUses && this.panelData.maxUses) {
			this.currentUses = this.panelData.currentUses;
			this.maxUses = this.panelData.maxUses;
		}

		if (this.panelData.useResourceFrequency) {
			this.useResourceFrequency = this.panelData.useResourceFrequency;
		}

		if (this.panelData.useResourceName) {
			this.useResourceName = this.panelData.useResourceName;
		}

		if (this.panelData.type) {
			this.type = this.panelData.type;
		}
	},
	methods: {
		openPanel: function (panelId) {
			this.$root.$emit("panel-opened", [panelId]);
		},
	},
};
</script>

<template>
	<div class="panel card" :class="classes" v-on:dblclick="openPanel(panelId)" :data-id="this.panelId" :data-type="this.type">
		<div class="panel__content card-body">
			<h3 class="panel__title pt-3">{{ title }}</h3>
			<div class="justify-content-between position-absolute w-100 left--0 top--0 pt-2 pl-4 pr-4 d-flex">
				<span :class="panelTypeClasses">{{ type }}</span>
				<span :class="panelUseClasses" v-if="hasUses">{{resourceUse}}</span>
			</div>
			<h4>{{ subtitle }}</h4>
			<VueShowdown class="panel__body" :markdown="body" />
			<h5 class="position-absolute bottom--0 right--0 pr-4 pb-2">
				{{ bottomText }}
			</h5>
		</div>
	</div>
</template>