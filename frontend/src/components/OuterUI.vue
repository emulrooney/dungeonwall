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
				class: true,
				skill: true,
				misc: true,
				race: true,
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
		}
    }

}
</script>

<template>
    <nav>
        <ul class="nav__main nav display--flex">
            <li class="nav__title">
                DungeonWall
                <!-- TODO: Logo can go here. -->
            </li>
            <li class="nav__wall-info text-center">
                <h1>
                    {{this.wallTitle}}
                </h1>
            </li>
            <li class="nav__wall-search">
                <div class="display--flex">
                    <input class="input-group-text" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                    <b-button class="nav__wall-search__button">X</b-button>
                    <b-button class="nav__wall-search__button">X</b-button>
                </div>
                <div class="wall__controls form-inline">
                    <b-button :pressed="!this.enabledTypes['item']" pill class="filter--item btn-sm mr-2" v-on:click="toggleType('item')">{{this.enabledTypes['item'] ? 'Hide' : 'Show'}} Item</b-button>
                    <b-button :pressed="!this.enabledTypes['class']" pill class="filter--class btn-sm mr-2" v-on:click="toggleType('class')">{{this.enabledTypes['class'] ? 'Hide' : 'Show'}} Class</b-button>
                    <b-button :pressed="!this.enabledTypes['race']" pill class="filter--race color--text--black btn-sm mr-2" v-on:click="toggleType('race')">{{this.enabledTypes['race'] ? 'Hide' : 'Show'}} Race</b-button>
                    <b-button :pressed="!this.enabledTypes['skill']" pill class="filter--skill btn-sm mr-2" v-on:click="toggleType('skill')">{{this.enabledTypes['skill'] ? 'Hide' : 'Show'}} Skill</b-button>
                    <b-button :pressed="!this.enabledTypes['misc']" pill class="filter--misc btn-sm mr-2" v-on:click="toggleType('misc')">{{this.enabledTypes['misc'] ? 'Hide' : 'Show'}} Misc</b-button>
                    <b-button :pressed="!this.enabledTypes['neutral']" pill class="filter--neutral btn-sm mr-2" v-on:click="toggleType('neutral')">{{this.enabledTypes['neutral'] ? 'Hide' : 'Show'}} Unlabelled</b-button>
                </div>
            </li>
        </ul>
    </nav>
</template>