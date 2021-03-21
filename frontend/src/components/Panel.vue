<script>
import { bus } from '../main';

export default {
    name: 'Panel',
    props: {
        panelId: Number,
        panelData: Object
    },
    data: function() {
        return { 
            body: "",
            title: "",
            subtitle: "",
            bottomText: "",
            currentUses: 0,
            maxUses: 0,
            panelType: "",
            useResourceCost: 0,
            useResourceFrequency: "",
            useResourceName: ""
        };
    },
    computed: {
        hasUses: function() {
            return this.maxUses > 0;
        },
        resourceUse: function() {
            var resourceName = (this.useResourceFrequency.length > 0 ? this.useResourceFrequency : this.useResourceName);
            return this.currentUses + " / " + this.maxUses + (resourceName ? " " + this.resourceName : "");
        },
        classes: function() {
            let classes = [];
            if (this.panelData.panelWidth) {
                classes.push("width--" + this.panelData.panelWidth);
            }
            
            if (this.panelData.panelHeight) {
                classes.push("height--" + this.panelData.panelHeight);
            }

            if (this.panelData.panelHeight == "small" || this.panelData.panelWidth == "small") {
                classes.push("panel__text--small")
            }

            if (this.panelData.panelType) {
                classes.push("color--border--" + this.panelData.panelType);
            } else {
                classes.push("color--border--white");
            }

            return classes.join(" ");
        },
        panelTypeClasses: function() {
            if (this.panelData.panelType) {
                return "panel__type color--bg--" + this.panelData.panelType;
            } else {
                return ""
            }
        },
        panelUseClasses: function() {
            if (this.panelData.panelType) {
                return "panel__uses border--small color--border--" + this.panelData.panelType;
            } else {
                return "panel__uses border--small color--border--white"
            }
        }
    },
    mounted: function() {
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

        if (this.panelData.panelType) {
            this.panelType = this.panelData.panelType;
        }
    },
    methods: {
        openPanel: function(panelId) {
            bus.$emit('panel-opened', [panelId]);
        }
    }
}
</script>

<template>
    <div class="panel card" :class="classes" v-on:dblclick="openPanel(panelId)">
        <div class="panel__content card-body">
            <h3 class="panel__title pt-3">{{title}}</h3>
            <div class="justify-content-between position-absolute w-100 left--0 top--0 pt-2 pl-4 pr-4 d-flex">
                <span :class="panelTypeClasses">{{panelType}}</span>
                <span :class="panelUseClasses" v-if="hasUses">{{resourceUse}}</span>
            </div>
            <h4>{{subtitle}}</h4>
            <VueShowdown :markdown="body" />
            <h5 class="position-absolute bottom--0 right--0 pr-4 pb-2 ">{{bottomText}}</h5>
        </div>
    </div>
</template>