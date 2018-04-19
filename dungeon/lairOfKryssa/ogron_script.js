// Init
npc.setTempData("StartDialogDone",false);
npc.setTempData("CleaveCD",false);

// Update
if(npc.getTempData("CleaveCD") != 0) {
  npc.setTempData("CleaveCD", npc.getTempData("CleaveCD")-1);
}
if(npc.getTempData("LavaDespawn")

// Target
if(!npc.getTempData("StartDialogDone")) {
  npc.say("Ogron SMASH You!");
  npc.setTempData("StartDialogDone",true);
}
//ToDo Disable Players Fire Resistance

// Damaged
if(npc.getTempData("CleaveCD") == 0) {
  npc.say("DIE!!");
//ToDo add Command to Spawn Lava or Fire at HitRange.
  npc.setTempData("CleaveCD",40);
if(npc.setTempData("LavaDespawn") == 0){
//ToDo despawn Lava or Fire in Ogrons Room.
  npc.setTempData("CleaveCD",20);
	}
}

// Killed
npc.say("AAAAAGH! Ogron Sma... UGH");
npc.executeCommand("/summon FallingSand -219 47 82 {TileID:76,Time:1,DropItem:0}");
