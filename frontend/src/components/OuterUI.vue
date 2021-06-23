<script>
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
            uiUpdates: 0, //Used to force visual update. See elementUpdates in vuex store
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
    mounted: async function () {
        const keycodeEvents = {
            "Backslash" : "searchTerm",
            "Digit1" : "toggleItem",
            "Digit2" : "toggleCharacter",
            "Digit3" : "toggleLore",
            "Digit4" : "toggleStory",
            "Digit5" : "toggleMisc",
            "Digit6" : "toggleNeutral",
            "Digit0" : "toggleAllOn"
        };

        //TODO Rewrite. Scrap the switch, do something more programmatic to get toggle+Type.        
        this.$root.$on("ui-keyboard", (uiEvent) => {
            console.log(uiEvent);
            switch (keycodeEvents[uiEvent.code]) {
                case "searchTerm":
                    if (document.activeElement != this.$refs.searchTerm) {
                        uiEvent.preventDefault();
                        this.$refs.searchTerm.focus();
                    }
                    break;
                case "toggleItem":
                case "toggleCharacter":
                case "toggleLore":
                case "toggleStory":
                case "toggleMisc":
                case "toggleNeutral":
                    if (uiEvent.ctrlKey && uiEvent.shiftKey) {
                        uiEvent.preventDefault();
                        this.toggleAllTypes(false);
                        this.$refs[keycodeEvents[uiEvent.code]].focus();
                        this.$refs[keycodeEvents[uiEvent.code]].click();
                    } else if (uiEvent.shiftKey) {
                        uiEvent.preventDefault();
                        this.$refs[keycodeEvents[uiEvent.code]].focus();
                        this.$refs[keycodeEvents[uiEvent.code]].click();
                    }
                    break;
                case "toggleAllOn":
                    uiEvent.preventDefault();
                    console.log("A");
                    this.toggleAllTypes(true);
                    break;
                default:
                    break;
            }
        });
    },
    computed: {
        wallClean: function() {
            return Object.keys(this.$store.state.dirtyContent).length == 0;
        }
    },
    methods: {
        updateSearchTerm: function() {
            if (this.searchTerm.length === 0) {
                this.$root.$emit("search-wall", "");
            }

            if (this.searchTerm.length >= this.minimumSearchLength && this.searchTerm != this.previousSearchTerm) {
                this.previousSearchTerm = this.searchTerm;
                this.$root.$emit("search-wall", this.searchTerm);
            }
        },
        toggleType: function(panelType) {
            this.enabledTypes[panelType] = !this.enabledTypes[panelType];
            this.$root.$emit("update-filters", this.enabledTypes);
        },
        toggleAllTypes: function(setTo) {
            Object.keys(this.enabledTypes).forEach((key) => {
                this.enabledTypes[key] = setTo;
            });
        },
        addPanel: function () {
			this.$root.$emit("add-panel", []);
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
                <div>
                    <button class="btn btn-light" v-on:click="addPanel()">
                        Add Panel
                    </button>
                    <button class="btn btn-secondary" :disabled="wallClean" v-on:click="saveWallChanges()">
                        Save Changes
                    </button>
                </div>
            </li>
            <li class="nav__wall-search">
                <div class="d-flex">
                    <input ref="searchTerm" class="input-group-text" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                    <b-button class="nav__wall-search__button">X</b-button>
                </div>
                <div class="wall__controls form-inline">
                    <b-button ref="toggleItem" :pressed="!this.enabledTypes['item']" pill class="filter--item btn-sm mr-2" v-on:click="toggleType('item')">{{this.enabledTypes['item'] ? 'Hide' : 'Show'}} Item</b-button>
                    <b-button ref="toggleCharacter" :pressed="!this.enabledTypes['character']" pill class="filter--character btn-sm mr-2" v-on:click="toggleType('character')">{{this.enabledTypes['character'] ? 'Hide' : 'Show'}} Character</b-button>
                    <b-button ref="toggleLore" :pressed="!this.enabledTypes['lore']" pill class="filter--lore color--text--black btn-sm mr-2" v-on:click="toggleType('lore')">{{this.enabledTypes['lore'] ? 'Hide' : 'Show'}} Lore</b-button>
                    <b-button ref="toggleStory" :pressed="!this.enabledTypes['story']" pill class="filter--story btn-sm mr-2" v-on:click="toggleType('story')">{{this.enabledTypes['story'] ? 'Hide' : 'Show'}} Story</b-button>
                    <b-button ref="toggleMisc" :pressed="!this.enabledTypes['misc']" pill class="filter--misc btn-sm mr-2" v-on:click="toggleType('misc')">{{this.enabledTypes['misc'] ? 'Hide' : 'Show'}} Misc</b-button>
                    <b-button ref="toggleNeutral" :pressed="!this.enabledTypes['neutral']" pill class="filter--neutral btn-sm mr-2" v-on:click="toggleType('neutral')">{{this.enabledTypes['neutral'] ? 'Hide' : 'Show'}} Unlabelled</b-button>
                </div>
            </li>
        </ul>
    </nav>
</template>