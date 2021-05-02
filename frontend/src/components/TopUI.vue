<script>
import { bus } from "../main";
export default {
    name: 'TopUI',
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
                <a class="btn btn-lg btn-info" href="#">Create New Page</a>
            </li>
            <li class="nav-item mr-2">
                <a class="btn btn-lg btn-info" href="#">Load Page</a>
            </li>
            <li class="nav-item mr-2">
                <input class="input-group-text nav__search" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                <b-button v-if="this.searchTerm.length > 0">X</b-button>
            </li>
        </ul>
    </nav>
</template>