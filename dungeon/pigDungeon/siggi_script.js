// Init
npc.setTempData("StartDialogDone",false);
npc.setTempData("HealingCD", 0);
npc.executeCommand("/setblock -219 47 82 minecraft:air");

// Update
if(npc.getTempData("HealingCD") != 0) {
  npc.setTempData("HealingCD", npc.getTempData("HealingCD")-1);
}


// Target
if(!npc.getTempData("StartDialogDone")) {
  npc.say("You shouldn't have come here!");
  npc.setTempData("StartDialogDone",true);
}

// Damaged
if(npc.getTempData("HealingCD") == 0 && npc.getHealth() <= npc.getMaxHealth() * 0.6) {
  npc.say("Don't underestimate me!");
  npc.setHealth(npc.getMaxHealth());
  npc.setTempData("HealingCD",40);
}


// Killed
npc.say("NOO, HOW COULD THIS HAPPEN!!!!");
npc.executeCommand("/summon FallingSand -219 47 82 {TileID:76,Time:1,DropItem:0}");
