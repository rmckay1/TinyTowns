<?php
session_start();
$username = $_SESSION['user'];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, <?php echo $username ?></title>
    <link rel="stylesheet" href="TinyTowns.css">
    <script src="TinyTowns.js" delay></script>
  </head>
  <body>
    <div class="buildables">
      <div id="well" class="buildables card">
        <div class="cardHead">
          <div class="title">Well</div>
          <div class="icon well" style="background-color: gray;"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="wood blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">1 <span class="mint"></span> for each adjacent <span style="color:turquoise;" class="buildableType"></span>.</div>
      </div>
      <div id="theatre" class="buildables card">
        <div class="cardHead">
          <div class="title">Theatre</div>
          <div class="icon theatre" style="background-color: rgb(145, 145, 48)"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="stone blocks" style="grid-row: 2; grid-column: 3;"></span>
            <span class="wood blocks" style="grid-row: 3; grid-column: 2;"></span>
            <span class="glass blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="wood blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">1 <span class="mint"></span> for each other unique building type in the same row and column as <span style="color:yellow;" class="buildableType"></span>.</div>
      </div>
      <div id="factory" class="buildables card">
        <div class="cardHead">
          <div class="title">Factory</div>
          <div class="icon factory" style="background-color: rgb(38, 41, 173);"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="wood blocks" style="grid-row: 2; grid-column: 1;"></span>
            <span class="brick blocks" style="grid-row: 3; grid-column: 1;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 2;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="brick blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description" style="font-size: 95%;">When constructed, place 1 of the 5 resources on <span style="color:navy;" class="buildableType"></span>. When another player names this resource, you may play a different resource instead.</div>
      </div>
      <div id="cottage" class="buildables card">
        <div class="cardHead">
          <div class="title">Cottage</div>
          <div class="icon cottage" style="background-color: rgb(36, 164, 178);"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="wheat blocks" style="grid-row: 2; grid-column: 4;"></span>
            <span class="brick blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="glass blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">3 <span class="mint"></span> if this building is fed.</div>
      </div>
      <div id="chapel" class="buildables card">
        <div class="cardHead">
          <div class="title">Chapel</div>
          <div class="icon chapel" style="background-color: rgb(198, 126, 49);"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="glass blocks" style="grid-row: 2; grid-column: 4;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 2;"></span>
            <span class="glass blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">1 <span class="mint"></span> for each fed <span style="color:turquoise;" class="buildableType"></span>.</div>
      </div>
      <div id="farm" class="buildables card">
        <div class="cardHead">
          <div class="title">Farm</div>
          <div class="icon farm" style="background-color: rgb(180, 43, 43);"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="wheat blocks" style="grid-row: 2; grid-column: 3;"></span>
            <span class="wheat blocks" style="grid-row: 2; grid-column: 4;"></span>
            <span class="wood blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="wood blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">Feeds 4 <span class="leaf"></span> buildings anywhere in your town.</div>
      </div>
      <div id="tavern" class="buildables card">
        <div class="cardHead">
          <div class="title">Tavern</div>
          <div class="icon tavern" style="background-color: rgb(17, 87, 29);"></div>
        </div>
        <div class="recipe" style="justify-content: center;">
          <div class="recipeGrid">
            <span class="brick blocks" style="grid-row: 3; grid-column: 2;"></span>
            <span class="brick blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="glass blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description"><span class="mint"></span>  based on your constructed <span style="color:green;" class="buildableType"></span>.</div>
        <div class="description tavern">
          <br><br>
          <div style="grid-row:1; padding-top: 5px; padding-left: 5px; word-spacing: 5px; white-space: pre;"><span style="color:green;" class="buildableType"></span> 1 2 3<span>&thinsp;</span><span>&thinsp;</span> 4  5</div>
          <div style="grid-row:2; padding-left: 7px; border-top-style: dotted; border-top-color: black; border-top-width: 2px; word-spacing: 5px;"><span class="mint"></span><span>&thinsp;</span> 2 5 9 14 20</div>
        </div>
      </div>
      <div id="Caterina" class="buildables card">
        <div class="cardHead">
          <div class="title">Cathedral of Caterina</div>
          <div class="icon Caterina" style="background-color: rgb(129, 54, 222);"></div>
        </div>
        <div class="recipe">
          <div class="recipeGrid">
            <span class="wheat blocks" style="grid-row: 2; grid-column: 3;"></span>
            <span class="stone blocks" style="grid-row: 3; grid-column: 3;"></span>
            <span class="glass blocks" style="grid-row: 3; grid-column: 4;"></span>
          </div>
        </div>
        <div class="description">2 <span class="mint"></span>. The empty squares in your town are worth 0 <span class="mint"></span> (instead of -1). <span class="mint"></span></span></div>
      </div>
    </div>

    <div class="matsAndBuildTile">
      <div id="resources" class ="resources"></div>
      
      <div id="ClearSelection" class="button">
        <button id="btnClearSelection" class="button" onclick="clearBuildSelection()">Clear Selection</button>
      </div>

      <div id="town" class="town">
      </div>
    </div>
    <form id="btnEndGame" method="post" action="scoreboard.php">
      <input type="hidden" name="brdStr" id="brdStr" value=""/>
      <input type="hidden" name="startTime" id="startTime" value=""/>
      
      <!-- Other fields could go here. -->
      <input type="submit" value="END GAME" onclick="endGame();"/>
    </form>
    <div id="popup"></div>
  </body>
</html>