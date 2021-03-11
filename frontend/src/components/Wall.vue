

<template>
  <div class="hello">
    <h1>{{ wallTitle }}</h1>
    <div class="wall js--muurify">
      <div class="card w1 h 2">
        <div class="card__content">
          <h3>Unarmored Defense</h3>
          <h4>Monk Level 1</h4>
          <p>Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.</p>
          <h5>PHP p76</h5>
        </div>
      </div>

      <div class="card w2 h3">
        <div class="card__content">
          <h3>Martial Arts</h3>
          <h4>Monk Level 1</h4>
          <p>
            Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don't have the two-handed or heavy property.
            <br>
            You gain the following benefits while you are unarmed or wielding only monk weapons and you aren't wearing armor or wielding a shield.
            <br>
            <ul>
              <li>
                You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.
              </li>
              <li>
                You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.
              </li>
              <li>
                When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven't already taken a bonus action this turn.
              </li>
            </ul>
            <br>
            Certain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama).
          </p>
          <h5>PHP p76</h5>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import Muuri from 'muuri'

export default {
  name: 'Wall',
  props: {
    wallTitle: String
  },
  mounted: function() {
    this.$nextTick(function() {
      //Default options here.
      new Muuri('.js--muurify', {
        dragEnabled: true

      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wall {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.card {
  position: absolute;
  width: 600px;
  height: 200px;
  margin: 32px;
  background-color: orange;

  text-align: left;
}

.card__content {
  padding: 8px 16px;
}

.w1 {
  width: 200px;
}

.w2 {
  width: 400px;
}

.w3 {
  width: 600px;
}

.h1 {
  height: 200px;
}

.h2 {
  height: 400px;
}

.h3 {
  height: 600px;
}

</style>
