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
        }
    },
    mounted: function() {
        this.body = this.panelData.body;
        this.title = this.panelData.title;
        this.subtitle = this.panelData.subtitle;
        this.bottomText = this.panelData.bottomText;
        
        this.$nextTick(function() {
            console.log("Panel #" + this.panelId + " is mounted.");
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
            <p>{{body}}</p>
            <h5>{{bottomText}}</h5>
        </div>
    </div>
</template>