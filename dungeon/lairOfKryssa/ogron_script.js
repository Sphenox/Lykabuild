// Init
npc.setTempData("StartDialogDone",false);
npc.setTempData("LavaCD",10);
npc.setTempData("LavaPosX",0);
npc.setTempData("LavaPosY",0);
npc.setTempData("LavaPosZ",0);


// Update
if(npc.getTempData("LavaCD") != 0) {
  npc.setTempData("LavaCD", npc.getTempData("LavaCD")-1);
}
if(npc.getTempData("LavaDespawn") != 0) {
  npc.setTempData("LavaDespawn", npc.getTempData("LavaDespawn")-1);
}
if(npc.getTempData("LavaDespawn") == 0){
  var x = npc.getTempData("LavaPosX");
  var y = npc.getTempData("LavaPosY");
  var z = npc.getTempData("LavaPosZ");
  npc.executeCommand("/setblock " + x + " " + y + " " + z + " 0");
}


// Attack
if(npc.getTempData("LavaCD") == 0) {
  // Remove Fire Resistance
  npc.executeCommand("/effect @a[r=20] 12 0");
  npc.say("DIE!!");
  var x = target.getBlockX();
  var y = target.getBlockY();
  var z = target.getBlockZ();
  npc.setTempData("LavaPosX",x);
  npc.setTempData("LavaPosY",y);
  npc.setTempData("LavaPosZ",z);
  npc.executeCommand("/setblock " + x + " " + y + " " + z + " 10");
  npc.setTempData("LavaDespawn",10);
  npc.setTempData("LavaCD",40);
}

// Target
if(!npc.getTempData("StartDialogDone")) {
  npc.say("Ogron SMASH You!");
  npc.setTempData("StartDialogDone",true);
}

// Killed
npc.say("AAAAAGH! Ogron Sma... UGH");
//npc.executeCommand("/summon FallingSand -219 47 82 {TileID:76,Time:1,DropItem:0}");
