﻿USE [MYZCharacterSheet];
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] ([Id], [DisplayName], [Email], [FirebaseUserId])
VALUES (1, 'Fred', 'fred@myz.com', 'AKGrErHfEEaA0ywY88ZnhLH0EfG2'), (2, 'Sora', 'sora@secret.com', 'WPqdznHqkfeerKzmSJDjpwJQdJq1'), (3, 'Jasmine', 'jasmine@shoe.com', 'Rd2fbMd4HVOua1Thb2NXp0kuLtr2');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Role] ON
INSERT INTO [Role] ([Id], [Name], [Description], [KeyAttribute], [TypicalNames], [FaceSuggest], [BodySuggest], [ClothingSuggest], [ImageLocation])
VALUES (1, 'Enforcer', 'Every day is a fight for survival. No one knows that better than you. As long as you can remember, you have been fighting. For grub, for bullets, for respect. Your knuckles and your soul are hardened, crushing a jaw no longer hurts. You have learned the fighter’s secret: It’s not about who is the strongest. It’s about who will never quit.', 'Strength', 'Hugust, Lenny, Marl, Pontis,Otiak, Ingrit, Mubba, Nelma, Rebeth', 'broken nose, dead eyes, scarred head, welding mask, hockey mask, metal jaw', 'scarred, muscular, compact, wiry, huge, arm prosthesis', 'worn leather coat, dirty coverall, undersized T-shirt, cut-up car tires, hubcaps', null),
		(2, 'Gearhead', 'For other people, the Zone is an empty wasteland, littered with useless scrap and garbage. For you, it’s a gold mine that is never depleted. There are remains from the Old Age everywhere, broken technical wonders. You have mastered the art of turning them into new, working contraptions. They’re not pretty. But they work. Most of the time. And the People have learned to value your craft.', 'Wits', 'Quark, Octane, Plonk,Zingo, Zippo, Delta, Iridia, Loranga, Nafta, Zanova', 'goggles, grinning, spiked hair, hairless, bloodshot eyes, dirty, always chewing', 'thin, wiry, extremely skinny, very short, abnormally fat', 'dirty yellow coverall, bicycle chains, patched-up raincoat, T-shirt with heavy metal motif, cables and light bulbs', null),
		(3, 'Stalker', 'Let them stare at you in disgust. Let them shy away from you, afraid the Rot will infect them. Let them fear you like death itself. Let them. They hate you, but they need you. Only you know the way through the Zone, the safe paths crossing the gravelands of the Old Age. You know where the artifacts are hidden, you know where the monsters roam. You are a Stalker', 'Agility', 'Danko, Endel, Franton, Hammed, Max, Felin, Jena, Katin, Krin, Tula', 'hidden under a hood, scarred face, hairless, sickly pale, bandaged', 'androgynous, wiry, muscular, short', 'raincoat, coverall, camouflage gear, army boots, backpack', null),
		(4, 'Fixer', 'Bullets? Grub? Water? Artifacts? A warm body next to yours? Whatever people want, you can get it. Somehow. Seeing the needs of others and fulfilling them, that has been your strategy for survival as long as you can remember. Since you were a weak little runt and learned to survive by staying close to the strong kids.', 'Empathy', 'Abed, Denrik, Fillix, Jonar, Leodor, Jolisa, Lula, Marlian, Monja, Novia', 'pleasant, always smiling, unnaturally attractive, greasy', 'slender, skinny, short, abnormally fat, no legs', 'suit, dress, colorful T-shirt, leather coat, hat, gloves', null),
		(5, 'Dog Handler', 'If there’s something the Ark is not in short supply of, it’s wild mutts. Unlike you mutants, the dogs breed constantly and survive by feeding on refuse and – when needed – each other. You can’t even remember how your sorry excuse for a dog became yours, but now it’s worth more to you than any mutant. You live in a symbiotic mutual dependency – you give your dog grub, and it will tear the jugular off anyone who stands in your way.', 'Agility', 'Finn, Jony, Mohan, Montiak, Rasper, Anny, Brie, Krinnel, Linna, Sofin', 'hairless, scarred, pastry pale, unblinking, disfigured', 'wiry, scrawny, short, hunched', 'overalls, padded jacket, leather jacket, hoodie, heavy boots', null),
		(6, 'Chronicler', 'Everything must be recorded. All the People do must be taken note of, nothing forgotten. The Elder has been saying that as long as you can remember. The most gifted among you he made Chroniclers, tasked with writing down the fate of the People in yellowed notebooks. You have filled many books by now. The Elder will soon be gone – but you won’t betray your pledge to him.', 'Empathy', 'Erister, Olias, Maxim, Silas, Victon, Amara, Danova, Johalin, Hanneth, Miri', 'sickly pale skin, hairless head, friendly face, piercing eyes, serious', 'skinny, hunchback, abnormally tiny, gnarled', 'worn coveralls with a number on it, raincoat, worn suit, covered by paraphernalia from the Old Age', null),
		(7, 'Boss', 'Human civilization may have collapsed, but the world hasn’t ended equally for all. Some lead and others follow - now as in the Old Age. You lead. Through intrigue, manipulation, and naked violence you have convinced a gang of mutants to follow you as their leader. That doesn’t mean your life is simple – there is always another Boss who wants to break you or some underling who wants to take your place.', 'Wits', 'Augustian, Kristor, Maximon, Mohamin, Oskartian, Briktoria, Elona, Gunitt, Natara, Bris', 'moon face, scarred face, hairless, greasy hair, watery eyes', 'standing upright, short, abnormally fat, has no legs and needs to be carried', 'suit, dress, protective coverall, fur coat, hat, jewelry', null),
		(8, 'Grunt', 'It feels good to work hard. To toil with your bare hands, to have a purpose. Not having to choose your own path, doing your master’s bidding. To make her proud. And still. Somewhere, deep inside, you have a dream of a new place, a new life. Where everything could be different.', 'Strength', 'Dink, Fils, Hent, Mart, Wilo, Alia, Eria, Henny, Kim, Lin', 'expressionless, disfigured, rough, dead eyes, hairless', 'powerful, muscular, skinny, hunchback, ape-like', 'none, chains, torn T-shirt, dirty coverall', null);
SET IDENTITY_INSERT [Role] OFF

SET IDENTITY_INSERT [Skill] ON
INSERT INTO [Skill] ([Id], [RoleId], [Name], [Description], [PageReference])
VALUES (1, null, 'Endure (Strength)', 'When the Zone takes its toll, when your legs won’t carry you any more, you roll for Endure. For example, this skill is used when you are traveling in rough weather or when you suffer severely cold conditions.', 49),
		(2, null, 'Force (Strength)', 'When wreckage or debris block your way and you need to push or lift something heavy, roll for Force. Use this skill for any feat of strength.', 49), 
		(3, null, 'Fight (Strength)', 'The world of Mutant: Year Zero is a brutal place. Sometimes, you have no choice but to fight for your life, eye to eye. Roll for this skill when you attack someone in close combat.', 49),
		(4, null, 'Sneak (Agility)', 'Often enough, it’s wiser to avoid conflict and instead Sneak by your enemies. Use this skill when you try to move without being noticed or when you attempt a sneak attack . Roll an opposed roll, using your Sneak score against a Scout roll for your enemy.', 50),
		(5, null, 'Move (Agility)', 'When the heat is on and you are trying to dodge the jaws of death, you need to keep a cool head and Move fast. Roll for Move when you want to get out of a conflict or some other hazardous situation.', 50),
		(6, null, 'Shoot (Agility)', 'If you have a gun, and a bullet to load it with, you can take down your enemy from a distance without getting your hands bloody. You can barter for Jury-Rigged guns in the Ark, and more powerful weapons from the Old Age can be found in the Zone.', 50),
		(7, null, 'Scout (Wits)', 'In the Zone you need to keep your eyes open if you want to stay alive. You use your Scout score to spot someone sneaking. You can also  when you see someone or something in the distance, to learn more about it.', 51),
		(8, null, 'Comprehend (Wits)', 'The world after the Apocalypse is a strange, incomprehensible place for most mutants. The knowledge of the Old Age has been worn out, just like the crumbling ruins of the dead cities. Roll for Comprehend when you want to read an old text, know what a particular ruin was used for, or understand and use an artifact whose DEV level is higher than the Ark’s.', 52),
		(9, null, 'Know The Zone (Wits)', 'The zonelands beyond the Ark’s borders are unknown wastes to most of the People. But there are some individuals – mostly Stalkers and some daring Chroniclers – who have ventured out and seen what is out there. Roll for Know the Zone when you encounter some creature or phenomenon in the Zone and want to know stuff about it. The GM will give you a modification depending on how rare it is.', 52),
		(10, null, 'Sense Emotion (Empathy)', 'To be able to read another mutant like an open book can be a mightier weapon than even a firearm from the Old Age. You roll for Sense Emotion when someone tries to Manipulate you. You can also use the skill when you want to know an NPC’s mood or intent toward you.', 52),
		(11, null, 'Manipulate (Empathy)', 'Lie, argue, threaten, seduce, or just reason sensibly. There are many ways to get another mutant to see things your way. This is an opposed roll (page 48), where you roll for Manipulate and your opponent rolls for Sense Emotion. The GM will give you a modification depending on your bargaining position.', 53),
		(12, null, 'Heal (Empathy)', 'When you can’t take it anymore, when the Zone has broken you and you’ve bitten the irradiated dirt, you need friends to help you back up.', 53),
		(13, 1, 'Intimidate (Strength)', 'Everyone in the Ark knows you’re bad news. Often you don’t even need to hit anyone to make them back off. You know exactly which buttons to push to subdue them – or provoke them.', 54),
		(14, 2, 'Jury-Rig (Wits)', 'The Zone is your own personal promised land. Everywhere things from the Old Age lie about, things you can use to build something new. You constantly pick up odd bits of scrap, and at any point in time you can sit down for a few hours to Jury-Rig a working contraption.', 54),
		(15, 3, 'Find The Path (Agility)', 'Any fool can walk into the Zone. But if you don’t know what you’re doing you’ll soon end up a corpse, bones gnawed clean by the beasts of the wasteland. Stalkers are a special breed, loners who went into the Zone and came to know it even as kids. Other mutants in the Ark look at you sideways, fearing you will spread the Rot or just distrust you for being different. Roll for Find the Path when you go into a new sector of the Zone', 56),
		(16, 4, 'Make A Deal (Empathy)', 'Hunger, strife and conflict – your livelihood. Earlier, when there was plenty of grub and the Elder looked after you like you were his own children, you were a weak nobody. Now, you have found good use for your talent of seeing people’s needs and fulfilling them – for a price. You have dirt on almost everyone in the Ark, and there is hardly anything you can’t get your hands on', 57),
		(17, 5, 'Sic A Dog (Agility)', 'Your dog is worth more to you than any mutant in the Ark. The bond between you is almost telepathic. You instinctively know what the animal wants, and the dog can always read your state of mind and defends you against any threat.', 58),
		(18, 6, 'Inspire (Empathy)', 'Your mission in life is to witness and record the People’s fate in the dawnworld – but also to interfere when needed. When other mutants lose their resolve you can help them find their courage again – and when they stray from the right path, you can guide them back.', 59),
		(19, 7, 'Command (Wits)', 'As a Boss, you are never alone. You always have your gang of mutants nearby, ready to rush to your aid.', 60),
		(20, 8, 'Shake It Off (Strength)', 'It’s the Grunts’s fate in life to endure pain and suffering. As a Grunt you have learnt to shake off the abuse – whether physical or psychological. You can shut out the outside world and let the pain fade away.', 61); 
SET IDENTITY_INSERT [Skill] OFF

SET IDENTITY_INSERT [Talent] ON
INSERT INTO [Talent] ([Id], [RoleId], [Name], [Description])
VALUES (1, 1, 'Barge Through', '63'), (2, 1, 'Mean Streak', '63'), (3, 1, 'Sucker Punch', '63'), (4, 2, 'Inventor', '63'), (5, 2, 'Motorhead', '63'), (6, 2, 'Tinkerer', '64'), (7, 3, 'Monster Hunter', '64'),
	(8, 3, 'Rot Finder', '64'), (9, 3, 'Scavenger', '64'), (10, 4, 'Juicy Info', '64'), (11, 4, 'Juicy Info', '64'), (12, 4, 'Vicious Creep', '64'), (13, 4, 'Wheeler Dealer', '64'), (14, 5, 'Bloodhound', '64'),
	(15, 5, 'Fight Dog', '64'), (16, 5, 'Mutant’s Best Friend', '65'), (17, 6, 'Agitator', '65'), (18, 6, 'Bonesaw', '65'), (19, 6, 'Performer', '65'), (20, 7, 'Commander', '65'), (21, 7, 'Gunslingers', '65'),
	(22, 7, 'Racketeer', '65'), (23, 8, 'Cynic', '65'), (24, 8, 'Rebel', '65'), (25, 8, 'Resilient', '65'), (26, null, 'Admirer', '65'), (27, null, 'Archeologist', '65'), (28, null, 'Assassin', '65'), 
	(29, null, 'Bad Omens', '65'), (30, null, 'Bodyguard', '65'), (31, null, 'Butcher', '66'), (32, null, 'Combat Veteran', '66'), (33, null, 'Cool Head', '66'), (34, null, 'Counselor', '66'), 
	(35, null, 'Coward', '66'), (36, null, 'Fast Draw', '66'), (37, null, 'Flyweight', '66'), (38, null, 'Gadgeteer', '66'), (39, null, 'Good Footwork', '66'), (40, null, 'Hard Hitter', '66'), 
	(41, null, 'Jack Of All Trades', '66'), (42, null, 'Light Eater', '67'), (43, null, 'Loner', '67'), (44, null, 'Loner', '67'), (45, null, 'Never Surrender', '67'), (46, null, 'Pack Mule', '67'), 
	(47, null, 'Personal Arthmetic', '67'), (48, null, 'Sharpshooter', '67'), (49, null, 'Sleepless', '67'), (50, null, 'Stoic', '67'), (51, null, 'Therapist', '67'), (52, null, 'Weapon Specialist', '67'),
	(53, null, 'Workhorse', '66'), (54, null, 'Zone Cook', '67');
SET IDENTITY_INSERT [Talent] OFF

SET IDENTITY_INSERT [Mutation] ON
INSERT INTO [Mutation] ([Id], [Name], [Description])
VALUES (1, 'Acid Spit', '70'), (2, 'Amphibian', '71'), (3, 'Corpse-Eater', '71'), (4, 'Extreme Reflexes', '72'), (5, 'Flame Breather', '72'), (6, 'Four-Armed', '72'), (7, 'Frog Legs', '72'), 
	(8, 'Human Magnet', '73'), (9, 'Human Plant', '73'), (10, 'Insectoid', '73'), (11, 'Insect Wings', '73'), (12, 'Luminescence', '73'), (13, 'Manbeast', '74'), (14, 'Mind Terror', '74'), 
	(15, 'Puppeteer', '74'), (16, 'Parasite', '75'), (17, 'Pathokinesis', '75'), (18, 'Pyrokinesis', '75'), (19, 'Reptilian', '76'), (20, 'Rot-Eater', '76'), (21, 'Sonar', '76'), (22, 'Spores', '76'), (23, 'Sprinter', '77'), (24, 'Telepathy', '77'), (25, 'Tracker', '77');
SET IDENTITY_INSERT [Mutation] OFF

SET IDENTITY_INSERT [Character] ON
INSERT INTO [Character] ([Id], [UserProfileId], [Public], [RoleId], [Name], [FaceAppearance], [BodyAppearance], [ClothingAppearance], [Strength], [Agility], [Wits], [Empathy], [Damage], [Fatigue], [Confusion], [Doubt], [Starving], [Dehydrated], [Sleepless], [Hypothermic], [CriticalInjuries], [RotPoints], [MutationPoints], [Armor], [Gear], [TinyItems], [Weapons], [PcRelationship1], [PcRelationship2], [PcRelationship3], [PcRelationship4], [PcRelationship1Buddy], [PcRelationship2Buddy], [PcRelationship3Buddy], [PcRelationship4Buddy], [Hate], [Protect], [Dream], [DenDescription], [DenStash])
VALUES (1, 1, 0, 8, 'Erg', 'Expresionless and Hairless', 'Ape-like with long arms. Tall with an exaggerated slouch.', 'Bare foot with a dirty jumpsuit', 5, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, 0, 'scrap armor - rating 3', '3 rations of grub, 4 rations of water', 'a collection of wild flowers', 'baseball bat - +2 damage - 1', 'Cass has always taken care of me, and I have always done the heavy lifing for her', 'I don’t trust Jimbo. He is too slimy for me.', 'Eva makes me nervous. Get butterflies in my stomach. Her dog is cute too.', 'Nathan is odd, but helps us survive in the Zone', 1, 0, 0, 0, 'The Boss Johammed, he is always trying to shakedown Cass for better gear.', 'The Fixer Lula as they have helped Cass and me through tough times.', 'I dream of an Ark free from the tyranny of the Bosses', 'A small tent shared with Cass in the lower levels of the Ark', 'My collection of wild flowers, my savings of 6 bullets');
SET IDENTITY_INSERT [Character] OFF

SET IDENTITY_INSERT [CharacterMutation] ON
INSERT INTO [CharacterMutation] ([Id], [MutationId], [CharacterId])
VALUES (1, 11, 1), (2, 5, 1);
SET IDENTITY_INSERT [CharacterMutation] OFF

SET IDENTITY_INSERT [CharacterTalent] ON
INSERT INTO [CharacterTalent] ([Id], [TalentId], [CharacterId])
VALUES (1, 51, 1);
SET IDENTITY_INSERT [CharacterTalent] OFF

SET IDENTITY_INSERT [CharacterSkill] ON
INSERT INTO [CharacterSkill] ([Id], [SkillId], [CharacterId], [Value])
VALUES (1, 1, 1, 2), (2, 2, 1, 2), (3, 3, 1, 0), (4, 4, 1, 0), (5, 5, 1, 0), (6, 6, 1, 0), (7, 7, 1, 0), (8, 8, 1, 0), (9, 9, 1, 0), (10, 10, 1, 2), (11, 11, 1, 0), (12, 12, 1, 1), (13, 20, 1, 3);
SET IDENTITY_INSERT [CharacterSkill] OFF