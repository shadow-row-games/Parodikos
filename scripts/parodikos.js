var slash=new move("Slash",function(user, target){
	var targetOldHealth=target.health;
	target.health-=getStandardDamageCurve(user,target,1,0,0);
	var message="";
	if (user==player){
		message+="You";
	}
	else{
		if (user.generic==true){
			message+="The ";
		}
		message+=user.nameSing;
	}
	message+=" slashed";
	if (target==player){
		message+=" you";
	}
	else{
		if (target.generic==true){
			message+=" the";
		}
		message+=" "+target.nameSing;
	}
	message+=" for "+(targetOldHealth-target.health)+" damage!";
	return message;
});
var stab=new move("Stab",function(user, target){
	var targetOldHealth=target.health;
	target.health-=getStandardDamageCurve(user,target,1,0,0);
	var message="";
	if (user==player){
		message+="You";
	}
	else{
		if (user.generic==true){
			message+="The";
		}
		message+=" "+user.nameSing;
	}
	message+=" stabbed";
	if (target==player){
		message+=" you";
	}
	else{
		if (target.generic==true){
			message+=" the";
		}
		message+=" "+target.nameSing;
	}
	message+=" for "+(targetOldHealth-target.health)+" damage!";
	return message;
});
var bash=new move("Bash",function(user, target){
	var targetOldHealth=target.health;
	target.health-=getStandardDamageCurve(user,target,0,0,1);
	var message="";
	if (user==player){
		message+="You";
	}
	else{
		if (user.generic==true){
		message+="The";
		}
		message+=" "+user.nameSing;
	}
	message+=" bashed";
	if (target==player){
		message+=" you";
	}
	else{
		if (target.generic==true){
			message+=" the";
		}
		message+=" "+target.nameSing;
	}
	message+=" for "+(targetOldHealth-target.health)+" damage!";
	return message;
});
var poisonSlash=new move("Poison Slash",function(user, target){
	var targetOldHealth=target.health;
	target.health-=getStandardDamageCurve(user,target,0,0,1);
	var message="";
	if (user==player){
		message+="You";
	}
	else{
		if (user.generic==true){
			message+="The";
		}
		message+=" "+user.nameSing;
	}
	message+=" used Poison Slash on";
	if (target==player){
		message+=" you";
	}
	else{
		if (target.generic==true){
			message+=" the";
		}
		message+=" "+target.nameSing;
	}
	message+=" for "+(targetOldHealth-target.health)+" damage!";
	var i=0;
	var isPoisoned=false;
	for (i=0;i<target.statusEffect.length;i++){
		if (target.statusEffect[i]==poison){
			isPoisoned=true;
		}
	}
	if (isPoisoned==false && seed%4==0){
		target.statusEffect.push(poison=new statusEffect("Poison",3,function(){
			var targetOldHealth=target.health;
			target.health-=Math.ceil(target.maxHealth/32);
			var message="";
			if (target==player){
				message+="You";
			}
			else{
				if (target.generic==true){
					message+="The";
				}
				message+=" "+target.nameSing;
			}
			message+=" took "+(targetOldHealth-target.health)+" damage from the poison!";
			return message;
		}));
		if (target==player){
			message+="<br>You were poisoned!";
		}
		else{
			if (target.generic==true){
				message+="<br>The ";
			}
			message+=target.nameSing+" was poisoned!";
		}
	}
	return message;
});
var bladeCrash=new combo("Blade Crash",[slash,slash,stab],function(user, target){
	var targetOldHealth=target.health;
	target.health-=getStandardDamageCurve(user,target,3,0,0);
	var message="";
	if (user==player){
		message+="You";
	}
	else{
		if (user.generic==true){
			message+="The";
		}
		message+=" "+user.nameSing;
	}
	message+=" used Blade Crash on";
	if (target==player){
		message+=" you";
	}
	else{
		if (target.generic==true){
			message+=" the";
		}
		message+=" "+target.nameSing;
	}
	message+=" for "+(targetOldHealth-target.health)+" damage!";
	return message;
});
var betaSword=new weaponPhysical("Beta Sword",slash,stab,bash,[bladeCrash]);
var betaArmor=new armor("Beta Armor",0,0,0);
var player=new playerCharacter();
player.weaponEquipped=betaSword;
var beta=new enemy("Beta","Betae",true,8,1,1,1,betaArmor,function(){
	if (seed%5<=1){
		return poisonSlash;
	}
	else{
		return slash;
	}
});
increment=1;
function playerCharacter(){
	this.nameSing="";
	this.generic=false;
	this.maxHealth=100;
	this.health=this.maxHealth;
	this.attack=1;
	this.defense=1;
	this.magic=1;
	this.weaponEquipped=0;
	this.armorEquipped=0;
	this.statusEffect=[];
}
function enemy(nameSingParam, namePlParam, genericParam, maxHealthParam, attackParam, defenseParam, magicParam, armorEquippedParam, AIParam){
	this.nameSing=nameSingParam;
	this.namePl=namePlParam;
	this.generic=genericParam;
	this.maxHealth=maxHealthParam;
	this.health=this.maxHealth;
		this.attac=attackParam;
		this.defense=defenseParam;
		this.magic=magicParam;
		this.armorEquipped=armorEquippedParam;
		this.statusEffect=[];
		this.AI=AIParam;
	}
	function weaponPhysical(nameSingParam, primaryAttackParam, secondaryAttackParam, tertiaryAttackParam, comboParam){
		this.nameSing=nameSingParam;
		this.primaryAttack=primaryAttackParam;
		this.secondaryAttack=secondaryAttackParam;
		this.tertiaryAttack=tertiaryAttackParam;
		this.combo=comboParam;
	}
	function armor(nameSingParam, slashDefenseParam, punctureDefenseParam, impactDefenseParam){
		this.nameSing=nameSingParam;
		this.slashDefense=slashDefenseParam;
		this.punctureDefense=punctureDefenseParam;
		this.impact=impactDefenseParam;
	}
	function move(nameParam, executeParam){
		this.name=nameParam;
		this.execute=executeParam;
	}
	function combo(nameParam, comboMoveParam, executeParam){
		this.name=nameParam;
    	this.comboMove=comboMoveParam;
		this.execute=executeParam;
	}
	function statusEffect(nameParam, durationTotalParam, executeParam){
		this.name=nameParam;
		this.durationTotal=durationTotalParam;
		this.durationRemaining=this.durationTotal;
		this.execute=executeParam;
	}
	function getStandardDamageCurve(user, target, slash, puncture, impact){
		var damage=Math.ceil(slash/4)+Math.ceil(puncture/4)+Math.ceil(impact/4);
		if ((1/8)*(2*Math.pow((user.attack+slash)-(target.defense+target.armorEquipped.slashDefense),2)+Math.pow(-1,(user.attack+slash)-(target.defense+target.armorEquipped.slashDefense))+7)>0){
			damage+=Math.ceil((1/8)*(2*Math.pow((user.attack+slash)-(target.defense+target.armorEquipped.slashDefense),2)+Math.pow(-1,(user.attack+slash)-(target.defense+target.armorEquipped.slashDefense))+7));
		}
		if ((1/8)*(2*Math.pow((user.attack+puncture)-(target.defense+target.armorEquipped.punctureDefense),2)+Math.pow(-1,(user.attack+puncture)-(target.defense+target.armorEquipped.punctureDefense))+7)>0){
			damage+=Math.ceil((1/8)*(2*Math.pow((user.attack+puncture)-(target.defense+target.armorEquipped.punctureDefense),2)+Math.pow(-1,(user.attack+puncture)-(target.defense+target.armorEquipped.punctureDefense))+7));
		}
		if ((1/8)*(2*Math.pow((user.attack+impact)-(target.defense+target.armorEquipped.impactDefense),2)+Math.pow(-1,(user.attack+impact)-(target.defense+target.armorEquipped.impactDefense))+7)>0){
			damage+=Math.ceil((1/8)*(2*Math.pow((user.attack+impact)-(target.defense+target.armorEquipped.impactDefense),2)+Math.pow(-1,(user.attack+impact)-(target.defense+target.armorEquipped.impactDefense))+7));
		}
		return damage;
	}
	function mainMenu(){
		$("#mainText").html("<input type='button' value='New Game' onclick='setName();'><br><br><input type='button' value='Load Game' onclick='loadGame();'>");
	}
	function setName(){
		$("#mainText").html("What is your name?<br><input id='nameInput' type='text' autofocus><input type='button' value='Submit' onclick='difficulty();'>");
	}
	function difficulty(){
		player.nameSing=$("#nameInput").val();
		seed=parseInt(player.nameSing,36)
		if (player.nameSing=="" || isNaN(seed)){
			return;
		}
		$("#mainText").html("What difficulty do you want to play on?<br>(This cannot be changed once set.)<br><br><input type='button' value='Normal' onclick='battle(beta)'>");
	}
	function battle(enemy){
		enemy.health=enemy.maxHealth;
		turnCount=1;
		playerTurnLog=[];
		enemyTurnLog=[];
		battleDisplay(enemy,"");
	}
	function battleDisplay(enemy, battleText){
		var isAttackMenuExpanded=false;
		var i=0;
		var j=0;
		$("#mainText").html("<div id='enemy' class='left'></div>");
		$("#enemy").append("/----------------\\<br>|");
		for (j=0;j<8-Math.ceil(enemy.nameSing.length/2);j++){
			$("#enemy").append(" ");
		}
		$("#enemy").append(enemy.nameSing);
		for (j=0;j<8-Math.floor(enemy.nameSing.length/2);j++){
			$("#enemy").append(" ");
		}
		$("#enemy").append("|<br>| <b>HP</b>[");
		for (j=0;j<10;j++){
			if (Math.ceil(10*enemy.health/enemy.maxHealth)>j){
				$("#enemy").append("/");
			}
			else{
				$("#enemy").append(" ");
			}
		}
		$("#enemy").append("] |<br>|    \\<b>"+enemy.health+"/"+enemy.maxHealth+"</b>/");
		for (j=9;j>enemy.health.toString().length+enemy.maxHealth.toString().length;j--){
			$("#enemy").append(" ");
		}
		$("#enemy").append("|<br>\\----------------/");
		$("#mainText").append("<br><br><br><br><br><div id='player'></div>");
		$("#player").append("<br><br>"+player.nameSing+" <b>HP</b> "+player.health);
		$("#mainText").append("<br><div id='message'>"+battleText+"</div>");
		$("#mainText").append("<div id='attackMenu'><br><input id='attackInput' type='button' value='Attack'></div>");
		$("#attackInput").click(function expandAttackMenu(){
			if (isAttackMenuExpanded==false){
				$("#attackMenu").append("<br>|--<input id='primaryAttackInput' type='button' value="+player.weaponEquipped.primaryAttack.name+"><br>|--<input id='secondaryAttackInput' type='button' value="+player.weaponEquipped.secondaryAttack.name+"><br>|--<input id='tertiaryAttackInput' type='button' value="+player.weaponEquipped.tertiaryAttack.name+">");
				$("#primaryAttackInput").click(function(){seed+=incrementSeed(0);battleTurn(player,enemy,player.weaponEquipped.primaryAttack,0);});
				$("#secondaryAttackInput").click(function(){seed+=incrementSeed(1);battleTurn(player,enemy,player.weaponEquipped.secondaryAttack,1);});
				$("#tertiaryAttackInput").click(function(){seed+=incrementSeed(2);battleTurn(player,enemy,player.weaponEquipped.tertiaryAttack,2);});
				isAttackMenuExpanded=true;
			}
			else{
				$("#attackMenu").html("<br><input id='attackInput' type='button' value='Attack'>");
				$("#attackInput").click(function(){expandAttackMenu();});
				isAttackMenuExpanded=false;
			}
		});
	}
	function battleTurn(player, enemy, playerMove){
		var enemyMove=enemy.AI();
		playerTurnLog[turnCount]=playerMove;
		enemyTurnLog[turnCount]=enemyMove;
		var i=0;
		var j=0;
		for (i=0;i<player.weaponEquipped.combo.length;i++){
			if (turnCount>=player.weaponEquipped.combo[i].comboMove.length){
				var isCombo=true;
				for (j=0;j<player.weaponEquipped.combo[i].comboMove.length;j++){
					if (!(player.weaponEquipped.combo[i].comboMove[j]==playerTurnLog[turnCount-player.weaponEquipped.combo[i].comboMove.length+j+1])){
						isCombo=false;
					}
				}
				if (isCombo==true){
					playerMove=player.weaponEquipped.combo[i];
					playerTurnLog[turnCount]=playerMove;
				}
			}
		}
		var message="";
		message+=playerMove.execute(player,enemy);
		for (i=0;i<player.statusEffect.length;i++){
			message+="<br>"+player.statusEffect[i].execute();
			player.statusEffect[i].durationRemaining--;
			if (player.statusEffect[i].durationRemaining<=0){
				player.statusEffect.splice(i,1);
			}
		}
		message+="<br>"+enemyMove.execute(enemy,player);
		for (i=0;i<enemy.statusEffect.length;i++){
			message+="<br>"+enemy.statusEffect[i].execute();
			enemy.statusEffect[i].durationRemaining--;
			if (enemy.statusEffect[i].durationRemaining<=0){
				enemy.statusEffect.splice(i,1);
			}
		}
		if (player.health<=0){
			alert("You lost...");
		}
		if (enemy.health<=0){
			alert("You win!");
		}
		turnCount++;
		battleDisplay(enemy,message);
	}
	function incrementSeed(skip){
		while (skip>=0){
			increment++;
			var i=increment-1;
			while (i!=1){
				if (checkDivisibility(increment,i)){
					increment++;
					i=increment;
				}
				i--;
			}
			skip--;
		}
		return increment;
	}
	function checkDivisibility(first, second){
		var greatest=first;
		var least=second;
		if (second>first){
			greatest=second;
			least=first;
		}
		if (Math.floor(greatest/least)==greatest/least){
			return true;
		}
		return false;
	}
