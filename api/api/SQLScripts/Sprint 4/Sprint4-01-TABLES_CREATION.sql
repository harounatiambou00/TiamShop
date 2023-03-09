CREATE TABLE dbo.tblDeliveries (
	DeliveryId BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	DeliveryReference CHAR(12) NOT NULL,
	DeliveryStatus NVARCHAR(100) NOT NULL DEFAULT 'TODO' CHECK(DeliveryStatus IN ('TODO', 'IN_PROGRESS', 'DONE')),
	DeliveredAt DATETIME2(7) DEFAULT NULL,

	AssignedTo INT NULL,

	CONSTRAINT FK_Deliveries_Users FOREIGN KEY(AssignedTo) REFERENCES dbo.tblUsers(UserId),
);
GO

CREATE TABLE dbo.tblOrders (
	OrderId BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	OrderReference CHAR(12) NOT NULL,
	OrderDate DATETIME2(7) NOT NULL,
	OrdererFirstName NVARCHAR(100) DEFAULT '',
	OrdererLastName NVARCHAR(100) DEFAULT '',
	OrdererEmail NVARCHAR(100) NOT NULL,
	OrdererPhoneNumber CHAR(8) NOT NULL,
	ValidatedAt DATETIME2(7) DEFAULT NULL,
	RejectedAt DATETIME2(7) DEFAULT NULL,
	DeliveredAt DATETIME2(7) DEFAULT NULL,

	NeighborhoodId INT NULL,
	ClientId INT NULL,
	AdminWhoValidatedItId INT NULL,
	AdminWhoRejectedItId INT NULL,
	DeliveryId BIGINT NULL,

	CONSTRAINT FK_Orders_Neighborhood FOREIGN KEY(NeighborhoodId) REFERENCES dbo.tblNeighborhoods(NeighborhoodId),
	CONSTRAINT FK_Orders_Client FOREIGN KEY(ClientId) REFERENCES dbo.tblUsers(UserId),
	CONSTRAINT FK_Orders_Delivery FOREIGN KEY(DeliveryId) REFERENCES dbo.tblDeliveries(DeliveryId),
	CONSTRAINT FK_Orders_AdminWhoValidated FOREIGN KEY(AdminWhoValidatedItId) REFERENCES dbo.tblUsers(UserId),
	CONSTRAINT FK_Orders_AdminWhoRejected FOREIGN KEY(AdminWhoRejectedItId) REFERENCES dbo.tblUsers(UserId),
);
GO

CREATE TABLE dbo.tblOrderLines (
	OrderLineId BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	Quantity INT NOT NULL DEFAULT 1,
	DiscountPercentage FLOAT DEFAULT 0,

	OrderId	BIGINT NOT NULL,
	ProductId UNIQUEIDENTIFIER NOT NULL,

	CONSTRAINT FK_OrderLines_Orders FOREIGN KEY(OrderId) REFERENCES dbo.tblOrders(OrderId),
	CONSTRAINT FK_OrderLines_Products FOREIGN KEY(ProductId) REFERENCES dbo.tblProducts(ProductId),
);
GO

