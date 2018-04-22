// Init
npc.setTempData("StartDialogDone",false);
npc.setTempData("GlobalCD",6);
// Lava Skill Data
npc.setTempData("LavaCD",10);
npc.setTempData("LavaDespawn",0);
npc.setTempData("LavaPosX",0);
npc.setTempData("LavaPosY",0);
npc.setTempData("LavaPosZ",0);
npc.setTempData("LavaIsActive",false);
// Cleave Skill getTempData
npc.setTempData("CleaveCD",20);
// Weapon-Switch
npc.setTempData("LavaWeapon","customnpcs:npcBronzeMace");
npc.setTempData("CleaveWeapon","customnpcs:npcEmeraldBattleAxe");
npc.setTempData("SwitchCD",20);
// set Start Weapon
npc.setTempData("ActiveWeapon",npc.getTempData("LavaWeapon"));
npc.setRightItem(world.createItem(npc.getTempData("LavaWeapon"),0,1));


// Update
if(npc.getTempData("LavaCD") != 0) {
  npc.setTempData("LavaCD", npc.getTempData("LavaCD")-1);
}
if(npc.getTempData("CleaveCD") != 0) {
  npc.setTempData("CleaveCD", npc.getTempData("CleaveCD")-1);
}
if(npc.getTempData("LavaDespawn") == 0 && npc.getTempData("LavaIsActive")){
  var x = npc.getTempData("LavaPosX");
  var y = npc.getTempData("LavaPosY");1
  var z = npc.getTempData("LavaPosZ");
  npc.executeCommand("/setblock " + x + " " + y + " " + z + " 0");
  npc.setTempData("LavaIsActive",false);
}
else if (npc.getTempData("LavaDespawn") != 0) {
  npc.setTempData("LavaDespawn", npc.getTempData("LavaDespawn")-1);
}

if(npc.getTempData("GlobalCD") != 0) {
  npc.setTempData("GlobalCD", npc.getTempData("GlobalCD")-1);
}

//TODO: Waffen-Wechsel mehr random machen
if(npc.getTempData("SwitchCD") == 0) {
    switch(npc.getTempData("ActiveWeapon")) {
      case npc.getTempData("LavaWeapon"):
        npc.setTempData("ActiveWeapon",npc.getTempData("CleaveWeapon"));
        npc.setRightItem(world.createItem(npc.getTempData("CleaveWeapon"),0,1));
      break;
      case npc.getTempData("CleaveWeapon"):
        npc.setTempData("ActiveWeapon",npc.getTempData("LavaWeapon"));
        npc.setRightItem(world.createItem(npc.getTempData("LavaWeapon"),0,1));
      break;
    }
    npc.setTempData("GlobalCD",4);
    npc.setTempData("SwitchCD",20);
}
else {
  npc.setTempData("SwitchCD", npc.getTempData("SwitchCD")-1);
}


// Attack

// Lava Skill
if(npc.getTempData("LavaCD") == 0 && npc.getTempData("GlobalCD") == 0 && npc.getTempData("ActiveWeapon") == npc.getTempData("LavaWeapon")) {
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
  npc.setTempData("LavaIsActive",true);
}

// Cleave Skill (AOE, which should be soaked)
if(npc.getTempData("CleaveCD") == 0 && npc.getTempData("GlobalCD") == 0  && npc.getTempData("ActiveWeapon") == npc.getTempData("CleaveWeapon")) {
  var nearbyPlayers = npc.getSurroundingEntities(3,1);
  var allPlayers = npc.getSurroundingEntities(20,1);
  var maxHealth = nearbyPlayers[0].getMaxHealth();
  var allDmg = maxHealth * 0.5 * allPlayers.length;
  var dmgPerPlayer = parseInt(allDmg / nearbyPlayers.length);
  for(i = 0; i < nearbyPlayers.length; i++) {
    nearbyPlayers[i].setHealth(nearbyPlayers[i].getHealth() - dmgPerPlayer);
  }
  npc.say("LEAVE ALONE!!!");
  npc.setTempData("CleaveCD",40);
}

// Target
if(!npc.getTempData("StartDialogDone")) {
  npc.say("Ogron SMASH You!");
  npc.setTempData("StartDialogDone",true);
}

// Killed
npc.say("AAAAAGH! Ogron Sma... UGH");
//npc.executeCommand("/summon FallingSand -219 47 82 {TileID:76,Time:1,DropItem:0}");
