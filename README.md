# Hacking Ayakashi Ghost Guild

[Ayakashi Ghost Guild (AGG)](https://ayakashi-ghost-guild.fandom.com/wiki/AGGWiki) is a [gacha](https://en.wikipedia.org/wiki/Gacha_game) mobile game that I enjoyed playing for many months until the game studio closed in 2015. When I learned from other players that the game can be run in the browser I was thrilled.  It stoked my developer curiosity and I wondered if I can automate some of the repetitive actions in the game.

Armed with my knowledge of web development I opened the game with debugger window open and started poking around. With many code snippet experiments and soft bans later, I'm ready to share my adventures.

# Story Mode

## Background
AGG has role playing elements, and the player starts with a health points of some predetermined amount.  One of the things a player can do in the game is start Story Mode, choose an episode, and spend health points to "investigate" in the story.  As shown in the video, investigating and spending health gives you XP, which is used to level up the player. Random card drops can also happen as story progresses.  As the player levels up, his stats increase, thus encouraging more story exploration.  Episodes can be re-investigated to search for common card drops or sealstone card drops.  Health points are replenished at 1 point per minute.

As I leveled up my player, I had a large amount of health points, and I want to grind the 1st episode to collect magatamas or cards that I can sell.  But there a lot of boring, manual things i had to do:
* I had to focus on clicking investigate and sift through the dialogs depending on whether or not I got cards
* I had would have to stop playing when my health points ran out and return to the game when my health points were restored.
* I had to be careful not to investigate, or do any action that required interaction with the servers.  Doing so caused me to get a 24 hr ban.  Basically, instead of AGG adding throttling logic for server requests, their backend just flat out banned people for too many requests at a time :(

These headaches inspired me to create the [story.js](story.js) script.

![Video demonstrating playing through story mode](story.gif "Logo Title Text 1")

## What is the code doing?
Looks like AGG uses jQuery so I started find my dom elements representing the investigate button, the players health, and other important game data.  

Once I had a handle of my element, I proceed to override all AJAX requests using the `$.ajaxSetup` method. This allows me to intercept the data that the server returns when performing an investigation.  The data included player data like how much health points were left.

Armed with this knowledge, i navigated to a story page on the browser. The script would start with clicking the investigate button.  Then after the server response, depending on how much health I had, i would repeat the investigation or stop.  I would also tack a setTimeout before every investigate attempt for fear of getting soft banned.  Once my health was 0 my script would do a larger setTimeout to wait for health to restore so the story can be investigated again.

The story.js snippet approached this with `ajaxSetup` method, and it also uses the mutationObserver object methods.  I used the mutationObserver methods since as the player investigated, the UI updated to reflect the health point spent.  This mean the dom elements representing the health bar also changed and this was my hook to listen and have my code react to those changes.  

Both approaches work, but since the game is no longer around, i can't verify it now :(

# Sealstone Battle
## Background
Some of the demon cards can only be unlocked by gathering 6 of its sealstones of varying colors.  The movie I have shown is demonstrating a the player battling a predetermined battle with a CPU player, but as the I progressed through the game, I will actually battle real players to "steal" their sealstone.  I battle the players by summoning my deck versus theirs.  Through the battle sequence that appears, if the attacker's total attack spirit is higher than the defenders defense spirit, he wins the battle and takes the sealstone.

![Video demonstrating sealstone battle](battle.gif "Logo Title Text 1")
 
Here is the tedious part of this task.
* Click the "Refresh Opponent list"
* Browse the list of opponents and check that their defense spirit is sufficiently lower then my players attack spirit.  
* Most real players I encounter I have a higher defense spirit then mine, but occasionally I come across a new account that has a lower enough spirit for me to battle and take their sealstone.  I could be refreshing opponent list for a very long time to find this rare occurence.
* Once I finally found an opponent weak enough, click the "Battle" button.

With that, here is the [battle.js](battle.js) script.

## What is the code doing?
Similar to the story script, I use `$.ajaxSetup` method to intercept the data that the server returns when performing refreshing the opponents list.  The data will include the list of opponents and their defense spirit.  

Armed with this knowledge, i navigated to a sealstone battle section for particular demon i wanted to unlock on the games home screen.  The script would see if the current list of players have lower enough defense spirit.  If there is such an opponent, click on their icon and proceed to battle.  Otherwise, I have a setTimeouts tied to clicking "Refresh Opponent List" button, reading their new opponent data from the server, and try to find a opponent to battle again.  I repeat until there is a suitable opponent to battle.


### Attributions
Videos extracted from [Ayakashi: Ghost Guild - Universal - HD Gameplay Trailer
](https://www.youtube.com/watch?v=Z56bHNyV2LI)