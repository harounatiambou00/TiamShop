CREATE TABLE dbo.tblCities(
	CityId int IDENTITY(1,1) NOT NULL,
	CityName NVARCHAR(25) NOT NULL,

	CONSTRAINT PK_tblCities PRIMARY KEY (CityId),
	CONSTRAINT UQ_tblCities_CityName UNIQUE (CityName)
);

CREATE TABLE dbo.tblNeighborhoods(
	NeighborhoodId int IDENTITY(1,1) NOT NULL,
	NeighborhoodName NVARCHAR(25) NOT NULL,
	CityId int NOT NULL,

	CONSTRAINT PK_tblNeighborhoods PRIMARY KEY (NeighborhoodId),

	CONSTRAINT UQ_tblNeighborhoods_NeighborhoodName UNIQUE (NeighborhoodName),

	CONSTRAINT FK_tblNeighborhoods_tblCities FOREIGN KEY (CityId) REFERENCES dbo.tblCities(CityId),
);

CREATE TABLE dbo.tblUserTypes(
	UserTypeId int IDENTITY(1,1) NOT NULL,
	UserTypeName NVARCHAR(25) NOT NULL,

	CONSTRAINT PK_tblUserTypes PRIMARY KEY (UserTypeId),

	CONSTRAINT UQ_tblUserTypes_UserTypeName UNIQUE (UserTypeName)
);

CREATE TABLE dbo.tblUsers(
	UserId int NOT NULL IDENTITY(1, 1),
	UserGuid NCHAR(36) DEFAULT NULL,
	FirstName NVARCHAR(50) DEFAULT NULL,
	LastName NVARCHAR(50) DEFAULT NULL,
	Email NVARCHAR(50) NOT NULL,
	PhoneNumber NCHAR(8) NOT NULL,
	CompleteAddress NVARCHAR(100) DEFAULT NULL,
	BirthDate DATE DEFAULT NULL,
	CreatedAt DATETIME2(7) NOT NULL,
	VerificationToken NCHAR(128),
	VerifiedAt DATETIME2(7) DEFAULT NULL,
	HashedPassword NVARCHAR(MAX) NOT NULL,
	PasswordSalt NVARCHAR(MAX) NOT NULL,
	ResetPasswordToken NCHAR(128) DEFAULT NULL,
	ResetPasswordTokenExpiresAt DATETIME2(7) DEFAULT NULL,
	JobTitle NVARCHAR(25) DEFAULT NULL,
	JobDescription NVARCHAR(100) DEFAULT NULL,

	UserTypeId int NOT NULL,
	NeighborhoodId int NOT NULL,

	CONSTRAINT PK_tblUsers PRIMARY KEY (UserId),

	CONSTRAINT UQ_tblUsers_Email UNIQUE (Email),
	CONSTRAINT UQ_tblUsers_PhoneNumber UNIQUE (PhoneNumber),

	CONSTRAINT FK_tblUsers_tblUserTypes FOREIGN KEY (UserTypeId) REFERENCES dbo.tblUserTypes(UserTypeId),
	CONSTRAINT FK_tblUsers_tblNeighborhoods FOREIGN KEY (NeighborhoodId) REFERENCES dbo.tblNeighborhoods(NeighborhoodId),
);

