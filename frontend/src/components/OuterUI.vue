<script>
import { bus } from "../main";
export default {
    name: 'OuterUI',
    props: {
        wallTitle: String
    },
    data: () => {
        return {
            previousSearchTerm: "",
            searchTerm: "",
            minimumSearchLength: 2,
            enabledTypes: {
				item: true,
				character: true,
				story: true,
				misc: true,
				lore: true,
				neutral: true
			}
        };
    },
    methods: {
        updateSearchTerm: function() {
            if (this.searchTerm.length === 0) {
                bus.$emit("search-wall", "");
            }

            if (this.searchTerm.length >= this.minimumSearchLength && this.searchTerm != this.previousSearchTerm) {
                this.previousSearchTerm = this.searchTerm;
                bus.$emit("search-wall", this.searchTerm);
            }
        },
        toggleType: function(panelType) {
            this.enabledTypes[panelType] = !this.enabledTypes[panelType];
            bus.$emit("update-filters", this.enabledTypes);
        },
        addPanel: function () {
			bus.$emit("add-panel", []);
        },
        saveWallChanges: function() {
			//Emit the content we need to save
			//Exepcting to receive 'save-wall-success' on finish
			this.$store.commit("saveWallContent");
		},
    }

}
</script>

<template>
    <nav>
        <ul class="nav__main nav d-flex">
            <li class="nav__title">
                DungeonWall
                <!-- TODO: Logo can go here. -->
            </li>
            <li class="nav__wall-info text-center">
                <h1>
                    {{this.wallTitle}}
                </h1>
                <div class="d-flex">
                    <h2>Subtitle?</h2>
                    <button class="btn btn-light" v-on:click="addPanel()">
                        Add Panel
                    </button>
                    <!-- <button class="btn btn-secondary" :disabled="!wallClean" v-on:click="saveWallChanges()"> -->
                    <button class="btn btn-secondary" v-on:click="saveWallChanges()">
                        Save Changes
                    </button>
                </div>
            </li>
            <li class="nav__wall-search">
                <div class="d-flex">
                    <input class="input-group-text" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                    <b-button class="nav__wall-search__button">X</b-button>
                    <b-button class="nav__wall-search__button">X</b-button>
                </div>
                <div class="wall__controls form-inline">
                    <b-button :pressed="!this.enabledTypes['item']" pill class="filter--item btn-sm mr-2" v-on:click="toggleType('item')">{{this.enabledTypes['item'] ? 'Hide' : 'Show'}} Item</b-button>
                    <b-button :pressed="!this.enabledTypes['character']" pill class="filter--character btn-sm mr-2" v-on:click="toggleType('character')">{{this.enabledTypes['character'] ? 'Hide' : 'Show'}} Character</b-button>
                    <b-button :pressed="!this.enabledTypes['lore']" pill class="filter--lore color--text--black btn-sm mr-2" v-on:click="toggleType('lore')">{{this.enabledTypes['lore'] ? 'Hide' : 'Show'}} Lore</b-button>
                    <b-button :pressed="!this.enabledTypes['story']" pill class="filter--story btn-sm mr-2" v-on:click="toggleType('story')">{{this.enabledTypes['story'] ? 'Hide' : 'Show'}} Story</b-button>
                    <b-button :pressed="!this.enabledTypes['misc']" pill class="filter--misc btn-sm mr-2" v-on:click="toggleType('misc')">{{this.enabledTypes['misc'] ? 'Hide' : 'Show'}} Misc</b-button>
                    <b-button :pressed="!this.enabledTypes['neutral']" pill class="filter--neutral btn-sm mr-2" v-on:click="toggleType('neutral')">{{this.enabledTypes['neutral'] ? 'Hide' : 'Show'}} Unlabelled</b-button>
                </div>
            </li>
        </ul>
    </nav>
</template>