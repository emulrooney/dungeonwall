<script>
export default {
    name: 'Panel',
    props: {
        panelId: Number,
        body: String,
        title: String,
        subtitle: String,
        bottomText: String

    },
    data: function() {
        return {
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
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            console.log("Panel #" + this.panelId + " is online");
        });
    }
}
</script>

<template>
    <div class="panel">
        <div class="panel__content">
            <h3>{{title}}</h3>
            <span class="panel__uses" v-if="hasUses">{{resourceUse}}</span>
            <h4>{{subtitle}}</h4>
            <slot></slot>
            <h5>{{bottomText}}</h5>
        </div>
    </div>
</template>