<script>
import { bus } from "../main";
export default {
    name: 'OuterUI',
    data: () => {
        return {
            previousSearchTerm: "",
            searchTerm: "",
            minimumSearchLength: 2
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
        }
    }

}
</script>

<template>
    <nav>
        <ul class="nav nav__main">
            <li class="nav-item mr-2 nav__title">
                DungeonWall
            </li>
            <li class="nav-item mr-2">
                <button aria-label="Create New Page" class="btn btn-lg btn-info">
                    <i class="fas fa-plus"></i>
                    Create New Page
                </button>
            </li>
            <li class="nav-item mr-2">
                <button aria-label="Load Page" class="btn btn-lg btn-info">
                    <i class="fas fa-folder-open"></i>
                    Load Page
                </button>
            </li>
            <li class="nav-item mr-2">
                <input class="input-group-text nav__search" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                <b-button v-if="this.searchTerm.length > 0">X</b-button>
            </li>
        </ul>
    </nav>
</template>