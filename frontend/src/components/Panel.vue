<script>
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
        sizeClasses: function() {
            let classes = [];
            if (this.panelData.panelWidth) {
                classes.push("width--" + this.panelData.panelWidth);
            }
            
            if (this.panelData.panelHeight) {
                classes.push("height--" + this.panelData.panelHeight);
            }

            return classes.join(" ");
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
    }
}
</script>

<template>
    <div class="panel card" :class="sizeClasses">
        <div class="panel__content card-body">
            <h3>{{title}}</h3>
            <span class="panel__uses" v-if="hasUses">{{resourceUse}}</span>
            <h4>{{subtitle}}</h4>
            <p>{{body}}</p>
            <h5>{{bottomText}}</h5>
        </div>
    </div>
</template>