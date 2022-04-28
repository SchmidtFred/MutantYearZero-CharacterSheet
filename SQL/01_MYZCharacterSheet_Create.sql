USE [master]
GO

IF db_id('MYZCharacterSheet') IS NULL
	CREATE DATABASE MYZCharacterSheet
GO

USE [MYZCharacterSheet]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Character];
DROP TABLE IF EXISTS [Role];
DROP TABLE IF EXISTS [CharacterSkill];
DROP TABLE IF EXISTS [Skill];
DROP TABLE IF EXISTS [CharacterTalent];
DROP TABLE IF EXISTS [Talent];
DROP TABLE IF EXISTS [CharacterMutation];
DROP TABLE IF EXISTS [Mutation];

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayName] varchar(25) NOT NULL,
  [Email] varchar(255) NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL
)
GO

CREATE TABLE [Character] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [Public] bit DEFAULT (0),
  [RoleId] int NOT NULL DEFAULT (0),
  [Name] varchar(55) NOT NULL,
  [FaceAppearance] nvarchar(255),
  [BodyAppearance] nvarchar(255),
  [ClothingAppearance] nvarchar(255),
  [Strength] int NOT NULL,
  [Agility] int NOT NULL,
  [Wits] int NOT NULL,
  [Empathy] int NOT NULL,
  [Damage] int NOT NULL DEFAULT (0),
  [Fatigue] int NOT NULL DEFAULT (0),
  [Confusion] int NOT NULL DEFAULT (0),
  [Doubt] int NOT NULL DEFAULT (0),
  [Starving] bit NOT NULL DEFAULT (0),
  [Dehydrated] bit NOT NULL DEFAULT (0),
  [Sleepless] bit NOT NULL DEFAULT (0),
  [Hypothermic] bit NOT NULL DEFAULT (0),
  [CriticalInjuries] nvarchar(255),
  [RotPoints] int NOT NULL DEFAULT (0),
  [MutationPoints] int NOT NULL DEFAULT (0),
  [Armor] nvarchar(255),
  [Gear] nvarchar(255),
  [TinyItems] nvarchar(255),
  [Weapons] nvarchar(255),
  [PcRelationship1] nvarchar(255),
  [PcRelationship2] nvarchar(255),
  [PcRelationship3] nvarchar(255),
  [PcRelationship4] nvarchar(255),
  [PcRelationship1Buddy] bit NOT NULL DEFAULT (0),
  [PcRelationship2Buddy] bit NOT NULL DEFAULT (0),
  [PcRelationship3Buddy] bit NOT NULL DEFAULT (0),
  [PcRelationship4Buddy] bit NOT NULL DEFAULT (0),
  [Hate] nvarchar(255),
  [Protect] nvarchar(255),
  [Dream] nvarchar(255),
  [DenDescription] nvarchar(255),
  [DenStash] nvarchar(255)
)
GO

CREATE TABLE [Role] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [KeyAttribute] nvarchar Not Null,
  [TypicalNames] nvarchar Not Null,
  [FaceSuggest] nvarchar Not Null,
  [BodySuggest] nvarchar Not Null,
  [ClothingSuggest] nvarchar Not Null,
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [CharacterSkill] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SkillId] int NOT NULL,
  [CharacterId] int NOT NULL,
  [Value] int NOT NULL DEFAULT (0)
)
GO

CREATE TABLE [Skill] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RoleId] int DEFAULT (null),
  [Name] nvarchar NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [PageReference] int NOT NULL
)
GO

CREATE TABLE [CharacterTalent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [TalentId] int NOT NULL,
  [CharacterId] int NOT NULL
)
GO

CREATE TABLE [Talent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RoleId] int DEFAULT (null),
  [Name] nvarchar NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [CharacterMutation] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [MutationId] int NOT NULL,
  [CharacterId] int NOT NULL
)
GO

CREATE TABLE [Mutation] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Character] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CharacterSkill] ADD FOREIGN KEY ([SkillId]) REFERENCES [Skill] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CharacterSkill] ADD FOREIGN KEY ([CharacterId]) REFERENCES [Character] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Character] ADD FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE SET DEFAULT
GO

ALTER TABLE [CharacterTalent] ADD FOREIGN KEY ([CharacterId]) REFERENCES [Character] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CharacterTalent] ADD FOREIGN KEY ([TalentId]) REFERENCES [Talent] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CharacterMutation] ADD FOREIGN KEY ([CharacterId]) REFERENCES [Character] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CharacterMutation] ADD FOREIGN KEY ([MutationId]) REFERENCES [Mutation] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Skill] ADD FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Talent] ADD FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE
GO
