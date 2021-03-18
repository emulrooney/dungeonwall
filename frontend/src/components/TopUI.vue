<script>
export default {
  name: 'TopUI',
  props: {
  }
}
</script>

<template>
    <nav>
        <ul class="nav">
            <li class="nav-item mr-2">
                <a class="nav-link">DungeonWall</a>
            </li>
            <li class="nav-item mr-2">
                <a class="nav-link active" href="#">Create New Page</a>
            </li>
            <li class="nav-item mr-2">
                <a class="nav-link active" href="#">Load Page</a>
            </li>
            <li class="nav-item mr-2">
                <input class="input-group-text" type="text" placeholder="Search on Page" />
            </li>
        </ul>
    </nav>
</template>