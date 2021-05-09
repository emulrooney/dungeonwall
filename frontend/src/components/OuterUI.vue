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
                <input class="input-group-text" type="text" placeholder="Search on Page" v-model="searchTerm" @keyup="updateSearchTerm" />
                <b-button>X</b-button>
                <b-button>X</b-button>
            </li>
        </ul>
    </nav>
</template>